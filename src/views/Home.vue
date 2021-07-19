<template>
  <div class="home">
    <Suspense>
      <template #default>
        <Teams />
      </template>
      <template #feedback>
        <div>Loading ...</div>
      </template>
    </Suspense>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
export default {
  name: "Home",
  components: {
    Teams: defineAsyncComponent(() => import("@/components/Teams.vue")),
  },
};
</script>

<style>
.home {
  margin: 4rem 0;
}
</style>
