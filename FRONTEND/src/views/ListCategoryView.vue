<script>
import headerAdminVue from '../components/HeaderAdmin.vue'

import axios from 'axios'
export default {
  data() {
    return {
      categories: []
    }
  },
  components: {
    headerAdminVue
  },
  created() {
    axios.get('http://localhost:3000/category/listCate').then((response) => {
      this.categories = response.data
    })
  }
}
</script>
<template>
  <headerAdminVue></headerAdminVue>

  <main>
    <h2 class="text-name-admin">Hiện Loại Sản Phẩm</h2>
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col card-show-cate" v-for="category in categories" :key="category._id" >
        <div class="card card-add " >
          <img v-bind:src="'/img/category/' + category.img" class="card-img-cate-add" alt="..." />
          <div class="card-body-add">
            <h5 class="card-title text-center">
              <RouterLink :to="'/listCate/' + category._id">{{ category.name }}</RouterLink>
            </h5>
         
          </div>
        </div>

      </div>

    </div>
  </main>
</template>

<style>
.card-show-cate{
  width: 25%;

}
.card-add{
  border-radius: 50px;

}
.card-body-add{
  background-color: rgb(161, 218, 224);
  padding: 20px;
  border-radius: 0px 0px 50px 50px; 
  border-bottom:5px solid black ;

  
}

.card-img-cate-add{
  background-color: rgba(255, 255, 255, 0.658);
  border-radius: 50px 50px 0px 0px; 

  

}
.card-img-cate-add{
  box-shadow: 0px 0px 10px rgba(70, 68, 68, 0.5);
  /* border-radius: 50px; */

}

.card-add a {
  text-decoration: none;
  color: black;
}
.card-add a:hover {
  /* background-color: aliceblue; */
  color: rgb(255, 255, 255);
}
</style>
