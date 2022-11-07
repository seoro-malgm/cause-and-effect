<template>
  <div class="layout">
    <header id="gnb">
      <h1 v-if="!title || title === ''">인과율</h1>
      <h1 v-else>
        {{ title }}
      </h1>
    </header>
    <main id="main">
      <router-view @link-drawn="onLinkDrawn" />
    </main>
    <nav-words :disabled="disabled" />
  </div>
</template>

<script>
import NavWords from "@/components/Nav/NavWords.vue";
import data from "@/assets/words.json";
export default {
  components: {
    NavWords,
  },
  data() {
    return {
      title: "",
      disabled: false,
      linkWords: data.linkWords,
    };
  },
  computed: {},
  methods: {
    onLinkDrawn(e) {
      const text = {
        ...e,
        linkWord: this.linkWords[Math.floor(Math.random() * this.linkWords.length)],
      };
      const arr = `${text.fromText}. ${text.linkWord} ${text.toText}.`.split("");
      this.typing(arr);
    },
    typing(arr) {
      clearInterval(timer);
      this.disabled = true;
      this.title = "";
      let index = 0;

      var timer = setInterval(() => {
        if (index < arr.length) {
          this.title += arr[index];
        }
        index++;
        if (index > arr.length) {
          setTimeout(() => {
            index = 0;
            clearInterval(timer);
            this.disabled = false;
            this.title = "";
          }, 2000);
        }
      }, 150);
    },
  },
};
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-self: stretch;
  justify-content: space-between;
}
#gnb {
  background-color: #121212;
  padding: 1.5rem 1rem;
  min-height: 48px;
  h1 {
    text-align: center;
    font-size: 3rem;
    color: #ddd;
  }
}
#main {
  flex-grow: 1;
  background-color: #ddd;
  color: #121212;
  display: flex;
  flex-direction: column;
  align-self: stretch;
  height: 100%;
}

.typing-enter-active,
.typing-leave-active {
  transition: all 0.2s ease;
}
.typing-enter-from,
.typing-leave-to {
  opacity: 0;
}
</style>
