<script setup>
import { ref, onMounted, computed, watch, onUnmounted } from "vue";
import UserComponent from "@/components/UserComponent.vue";
import { userStrings } from "../stores/userStrings";
import ApiServices from "../services/ApiServices";

const searchString = userStrings();
const readyForRender = ref(false);
const haveMatch = ref(true);
const users = ref([]);
let fix_user;

const find_string = computed(() => searchString.user_find);


onMounted(() => {
  getUsers();
});

onUnmounted(() => {
  readyForRender.value = false;
});

async function getUsers() {
  ApiServices.getUsers().then((data) => {
    users.value = data;
    fix_user = data;
  });

  readyForRender.value = true;

}


watch(find_string, (newString) => {
  console.log(`search string is ${newString}`);
  console.log(fix_user);

  const results = fix_user.filter((user) => {
    return user.login == newString;
  });

  haveMatch.value = results.length == 0 && newString != "" ? false : true;

  console.log(results);
  if (newString == "") {
    users.value = fix_user;
  } else {
    users.value = results;
  }
});

const userList = computed({
  // getter
  get() {
    let find = searchString.user_find;
    console.log(find);
    console.log(fix_user);
    console.log(fix_user.lenght);

    return fix_user;
  },
});
</script>

<template>
  <main class="main" v-if="readyForRender">
    <div v-if="!haveMatch" class="not_found_msg">
      <p>Users not found</p>
    </div>

    <div class="users_chart_container">
      <div class="user_child" v-for="user in users" :key="user.login">
        <UserComponent
          :avatar="user.avatar_url"
          :username="user.login"
          :url="user.html_url"
        />
      </div>
    </div>
  </main>
</template>
