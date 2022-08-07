<script setup>
import { RouterView } from "vue-router";
import NavBar from "@/components/NavBar.vue";
import FooterBar from "@/components/FooterBar.vue";
</script>

<template>
  <section class="layout">
    <div class="header">
      <NavBar />
    </div>
    <div class="main">
      <RouterView />
    </div>
    <div class="footer">
      <FooterBar />
    </div>
  </section>
</template>


