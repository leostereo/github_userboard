export default {
  async getUsers() {
    let response = await fetch("https://api.github.com/users?per_page=8");
    let data = await response.json();
    return data;
  },
  async getUserDetails(user) {
    let response = await fetch(`https://api.github.com/users/${user}`);
    let data = await response.json();
    return data;
  },
  async getUserRepos(user) {
    let response = await fetch(`https://api.github.com/users/${user}/repos`);
    let data = await response.json();
    return data;
  },  
};
