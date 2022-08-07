<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { userStrings } from "../stores/userStrings";
import UserComponent from "@/components/UserComponent.vue";

const searchString = userStrings();

let fix_user;
const haveMatch = ref(true);
const users = ref([]);

onMounted(() => {
  fetch("https://api.github.com/users?per_page=8")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      users.value = data;
      fix_user = data;
    });
});

const find_string = computed(() => searchString.user_find);

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
  <main class="main">

    <div v-if="!haveMatch" class="not_found_msg">
    <p>Users not found</p>
    </div>

    <div class="users_chart_container">
      <div class="user_child" v-for="user in users" :key="user.login">
        <UserComponent
          :avatar="user.avatar_url"
          :username="user.login"
          :url="user.url"
        />
      </div>
    </div>
  </main>
</template>
