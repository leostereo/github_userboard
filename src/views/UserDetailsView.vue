<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import ApiServices from "../services/ApiServices";
import { useRoute } from "vue-router";


const route = useRoute();
const userRepos = ref([]);
const userDetail = ref({});
const readyForRender = ref(false);

onMounted(() => {
  getUserDetails();
});

onUnmounted(() => {
  readyForRender.value = false;
});

async function getUserDetails() {
  ApiServices.getUserDetails(route.params.username).then((data) => {
    userDetail.value = data;
  });

  ApiServices.getUserRepos(route.params.username).then((data) => {
    userRepos.value = data;
  });

  readyForRender.value = true;
}
</script>

<template>
  <main class="main" v-if="readyForRender">
    <div class="user_container">
      <br />
      <div class="logo">
        <img class="avatar" v-bind:src="userDetail.avatar_url" />
        <span class="username_text" style="margin-left: 1em">
          {{userDetail.name}}
        </span>
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
              <a class="links" v-bind:href="repo.html_url">{{ repo.name }}</a>
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
