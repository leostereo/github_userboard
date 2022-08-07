<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted, computed, watch } from "vue";

const route = useRoute();
const userDetail = ref({});
const userRepos = ref([]);
const readyForRender = ref(false);

onMounted(() => {
  fetch(`https://api.github.com/users/${route.params.username}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      userDetail.value = data;
    })
    .then(
      fetch(`https://api.github.com/users/${route.params.username}/repos`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          userRepos.value = data;
          readyForRender.value = true;
        })
    );
});
</script>
<template>
  <main class="main" v-if="readyForRender">
    <div class="user_container">
      <br />
      <div class="logo">
        <img class="avatar" v-bind:src="userDetail.avatar_url" />
        <span class="header_text" style="margin-left: 1em">{{
          userDetail.name
        }}</span>
      </div>

      <table class="paleBlueRows">
        <thead>
          <tr>
            <th class="tg-0pky">Repo name</th>
            <th class="tg-0pky">forks</th>
            <th class="tg-0pky">watchers</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="repo in userRepos" :key="repo.id">
            <td>
              <a v-bind:href="repo.html_url">{{ repo.name }}</a>
            </td>
            <td>{{ repo.forks }}</td>
            <td>{{ repo.watchers }}</td>
          </tr>
        </tbody>
      </table>
      <br />
      <router-link to="/"><button to="/">Back</button> </router-link>
      <br />
    </div>
  </main>
</template>
