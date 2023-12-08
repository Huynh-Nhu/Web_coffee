<template>
  <div class="page">
    <div class="text-center">
      <img src="/img/png/404.png" style="width: 50%;" alt="">

    </div>
    <div class="text-center">
      <p class="tex-404">Không tìm thấy trang vui lòng vui lòng  </p>
      <p> </p>
      <p class="tex-404">
        <router-link to="/">|| Click vào đây ||</router-link>
      </p>
      <p class="tex-404">để về lại trang chủ</p>
    </div>
  </div>
</template>

<style>
.tex-404{
  font-size: 20px;
}
.tex-404 a{
  font-size: 15px;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
  font-weight: 800;
  
}
.tex-404 a:hover{
  color: rgb(255, 0, 0);
}
</style>
