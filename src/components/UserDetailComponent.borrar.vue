<script setup>
const props = defineProps(["avatar", "username", "url"]);
</script>

<template>
  <div class="user_container">
    <img class="avatar" v-bind:src="props.avatar" />
    <router-link :to="`/${props.username}`">{{ props.username }}</router-link>
    <a v-bind:href="props.url">github</a>
  </div>
</template>
