<template>
  <nav id="nav-words">
    <!-- <template v-if="!navCollapsed"> -->
    <div class="wrapper">
      <div class="container">
        <h1
          :style="{
            textAlign: navCollapsed ? 'left' : 'center',
          }"
        >
          <template v-if="!navCollapsed"> 원인과 결과를 여기에서 드래그하여 사용하세요. </template>
          <button class="btn btn-toggler" @click="navCollapsed = !navCollapsed">
            {{ navCollapsed ? "단어장 열기" : "닫기" }}
          </button>
        </h1>
        <section class="section-words" v-if="!navCollapsed">
          <ul class="list-words">
            <li
              v-for="(item, i) in words"
              :key="i"
              class="list-item-word"
              :draggable="true"
              @dragstart="onDragStart($event, item)"
              @dragover.prevent
              @dragenter.prevent
              :class="{ disabled: disabled }"
            >
              <span>{{ item }}</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
    <!-- </template> -->
  </nav>
</template>

<script>
import data from "@/assets/words.json";
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      navCollapsed: false,
      words: data.words,
    };
  },
  methods: {
    onDragStart(e, item) {
      e.dataTransfer.clearData();
      e.dataTransfer.setData("text", item);
    },
  },
};
</script>

<style lang="scss" scoped>
#nav-words {
  position: fixed;
  bottom: 0;
  // bottom: 1rem;
  max-width: 370px;
  top: 96px;
  right: 0;
  z-index: 3000;
  .wrapper {
    background-color: #121212;
    width: calc(100% - 2rem);
    padding: 0 1rem;
    .container {
      width: 100%;
      padding: 1rem 0 1.5rem;
      color: #ddd;
      h1 {
        font-size: 14px;
      }
      .section-words {
        background-color: #ddd;
        margin-top: 0.75rem;
        overflow-y: auto;
        padding: 0.25rem 0.25rem 0.5rem;
        max-height: calc(100vh - 96px);
        color: #121212;
        .list-words {
          display: inline-flex;
          max-width: 100%;
          flex-wrap: wrap;
          .list-item-word {
            padding: 8px;
            background-color: #121212;
            color: #ddd;
            margin: 4px 8px;
            &:hover {
              cursor: grab;
            }
            &.disabled {
              pointer-events: none;
            }
          }
        }
      }
    }
  }
}

.btn-toggler {
  background-color: #ddd;
  border: 2px solid #121212;
  border-bottom-width: 0px;
}
</style>
