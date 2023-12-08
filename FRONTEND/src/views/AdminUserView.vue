<script>
import headerAdminVue from '../components/HeaderAdmin.vue'
import axios from 'axios'

export default {
  data() {
    return {
      users: [],
    }
  },
  components: {
    headerAdminVue
  },
 created(){
    axios.get('http://localhost:3000/user/listUser').then((response) => {
      this.users = response.data.filter((user) => user.rule === false) 
    })
  }
}
</script>
<template>
    <headerAdminVue></headerAdminVue>

  <main class="">
    <h1 class="text-name-admin">User List</h1>
   
      <div class=" mt-3 user-main container" >
        <table class="table table-striped table-hover text-center">
          <thead class="col-table table-dark">
            <tr >
              <th  cope="col">STT</th>
              <th cope="col">Name</th>
              <th cope="col">Phone</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user,index in users" :key="user._id">
              <td>{{ index+1 }}</td>
              <td scope="row">{{ user.name }}</td>
              <td>{{ user.phone }}</td>
            </tr>
          </tbody>
        </table>

      </div>

   
  </main>
</template>

<style>
.user-main{
  /* border-top: 7px solid black;
  border-left: 7px solid black;

  border-right: 7px solid black; */
  /* outline-style: dashed; */
  border-radius: 25px 25px 0 0;
  padding: 10px;
}
.col-table tr{
  font-size: 20px;
}
</style>
