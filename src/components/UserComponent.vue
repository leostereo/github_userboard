<script setup>
const props = defineProps(["avatar", "username", "url"]);
</script>

<template>
  <div class="user_container">
    <img class="avatar" v-bind:src="props.avatar" />
    <router-link :to="`/${props.username}`"
      ><span class="username_text">{{ props.username }}</span></router-link
    >
    <a class="links" v-bind:href="props.url"
      ><i class="fa fa-link"></i>Github</a
    >
  </div>
</template>
