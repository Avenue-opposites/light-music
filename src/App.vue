<template>
  <div class="app">
    <Navigation />
    <div class="content">
      <Sidebar></Sidebar>
      <RouterView style="flex: 1;" />
    </div>
    <PlayerBar></PlayerBar>
  </div>
</template>

<script setup lang="ts">
import Navigation from "@/components/Navigation.vue";
import PlayerBar from "@/components/PlayerBar.vue";
import Sidebar from "@/components/Sidebar.vue";
</script>

<style lang="less" scoped>
.app {
  width: 100%;
  height: 100vh;

  .gobang {
    margin: 0 auto;
    width: 800px;
    height: 800px
  }

  .content {
    display: flex;
    width: 100%;
    height: calc(100% - calc(var(--navigation-h) + var(--player-bar-h)));
  }
}
</style>