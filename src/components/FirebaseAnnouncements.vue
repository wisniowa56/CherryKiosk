<template>
  <h1>Firebase Announcements</h1>
</template>

<script>
export default {
  name: "FirebaseAnnouncements",
  mounted() {
    setTimeout(() => {
      console.log("switch components");
      let list = this.$store.getters.getAvailableComponents;
      let index = list.indexOf(this.$store.getters.getComponent);
      let newIndex = (index + 1) % list.length;
      this.$store.commit("switchComponent", list[newIndex]);
    }, 5000);
  },
};
</script>

<style>
</style>