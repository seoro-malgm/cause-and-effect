<template>
  <div class="wrapper">
    <!-- this is home -->
    <main-canvas @link-drawn="$emit('link-drawn', $event)" />
  </div>
</template>

<script>
import MainCanvas from "@/components/MainCanvas.vue";
export default {
  name: "HomeView",
  components: {
    MainCanvas,
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-self: stretch;
}
</style>
