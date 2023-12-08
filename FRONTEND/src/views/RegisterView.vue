<template>
  <headerVue></headerVue>
  <main class="main-regis">
    <div class="container use-full">
      <div class="row">
        <div class="col-md-8 offset-md-2 form-full-1">
          <div class="regis-name rounded-bottom">
            <p>REGISTER</p>
          </div>
          <div class="form-regis">
            <form @submit.prevent="registerUser">
              <div class="regis-detail">
                <div class="form-group row d-flex">
                  <div class="col-md-3 col-lg-3 col-sm-4 name-label">
                    <label for="name">Username:</label>
                  </div>
                  <div class="col-md-9 col-lg-9 col-sm-8">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Tên Tài Khoản"
                      id="name"
                      v-model="name"
                    />
                  </div>
                </div>
              </div>

              <div class="regis-detail">
                <div class="form-group row d-flex">
                  <div class="col-md-3 col-lg-3 col-sm-4 name-label">
                    <label for="phone">Phone:</label>
                  </div>
                  <div class="col-md-9 col-lg-9 col-sm-8">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Số Điện Thoại"
                      id="phone"
                      v-model="phone"
                    />
                  </div>
                </div>
              </div>

              <div class="regis-detail">
                <div class="form-group row d-flex">
                  <div class="col-md-3 col-lg-3 col-sm-4 name-label">
                    <label for="password">Password:</label>
                  </div>
                  <div class="col-md-9 col-lg-9 col-sm-8">
                    <input
                      type="password"
                      placeholder="Mật Khẩu"
                      class="form-control"
                      id="password"
                      v-model="password"
                    />
                  </div>
                </div>
              </div>
              <div class="btn-regis">
                <button type="submit" class="btn btn-sub">Đăng Ký</button>
              </div>
              <div v-if="showMessage" class="alert mt-3" style="background-color: aliceblue; color: rgb(255, 0, 0);" role="alert">
                {{ message }}
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  </main>
  <footerVue></footerVue>
</template>

<script>
import headerVue from '../components/header.vue'
import footerVue from '../components/footer.vue'
import axios from 'axios'

export default {
  data() {
    return {
      name: '',
      phone: '',
      password: '',
      message: '',
      error: '',
      showMessage: false
    }
  },
  methods: {
    async registerUser() {
      try {
        const formData = new FormData()
        formData.append('name', this.name)
        formData.append('phone', this.phone)
        formData.append('password', this.password)
        console.log(formData)
        const response = await axios.post('http://localhost:3000/reg/create', formData)
        this.message = response.data
        this.showMessage = true
        setTimeout(() => {
          this.showMessage = false
        }, 1000)
        this.name = ''
        this.phone = ''
        this.password = ''
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  },
  components: {
    headerVue,
    footerVue
  }
}
</script>

<style>
.main-regis {
  background-color: #f8f8f8;
}
.form-full-1 {
  padding: 0 100px;
  background-color: rgb(0, 0, 0);
  margin-top: 50px;
  margin-bottom: 50px;
  border-radius: 25px;
  box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.689);
}
.form-group {
  margin: 0;
}
.form-regis {
  background: url('/img/png/register.jpg') top center / cover no-repeat;
  margin-bottom: 50px;
  padding: 100px 50px;
  border-radius: 25px;
  /* opacity: 0.9; */
  filter: blur(0.2px);
  box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.271);
}
.regis-name {
  background-color: #ffffff;
  color: rgb(0, 0, 0);
  text-align: center;
  font-family: 'Courier New', Courier, monospace;
  font-weight: 700;
  font-size: 25px;
  border-top: 5px solid black;
}
.regis-detail {
  margin-top: 15px;
}
.name-label {
  background-color: rgb(255, 255, 255);
  text-align: center;
  border-radius: 25px;
  /* width: max-content; */
}
.name-label label {
  color: rgb(0, 0, 0);
  padding: 5px;
  width: fit-content;
}
.alert {
  color: rgb(255, 255, 255);
  text-align: center;
}
.btn-regis {
  margin-top: 25px;
  text-align: center;
}
.btn-sub {
  background-color: aliceblue;
}
.btn-sub:hover {
  background-color: rgb(108, 234, 219);
}
</style>
