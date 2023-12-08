<template>
  <headerVue></headerVue>
  <main class="main-login">
    <div class="container">
      <div class="row login-content">
        <div class="col-md-8 offset-md-2 rounded login-main use-full">
          <div class="form-full">
            <form @submit="loginUser" class="form-content">
              <div class="login-top">
                <p class="login-name">LOGIN</p>
              </div>
              <div class="use-detail">
                <div class="mb-3">
                  <div class="form-group row">
                    <div class="col-md-3 col-sm-3 col-lg-3">
                      <label for="phone">Phone:</label>
                    </div>
                    <div class="col-md-9 col-sm-9 col-lg-9">
                      <input class="form-control" type="text" id="phone" v-model="phone" required />
                    </div>
                  </div>
                </div>
              </div>
              <div class="use-detail">
                <div class="mb-3">
                  <div class="">
                    <div class="form-group row">
                      <div class="col-md-3 col-sm-3 col-lg-3">
                        <label for="password">Password:</label>
                      </div>
                      <div class="col-md-9 col-sm-9 col-lg-9">
                        <input
                          class="form-control"
                          type="password"
                          id="password"
                          v-model="password"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="btn-login-full">
                <button class="btn login-btn" type="submit">Đăng Nhập</button>
              </div>

              <p class="text-center mt-4 " style="color: rgba(237, 167, 55, 0.982);" v-if="showMessage">{{ message }}</p>
              <div class="if-no-tk">
                <p class="if-no-tk-p">
                  Nếu bạn chưa có tài khoản hãy
                  <router-link v-if="!loginOn" to="/register" class="">Register</router-link>
                  để được nhiều ưu đãi
                </p>
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
      phone: '',
      password: '',
      message: '',
      showMessage: false
    }
  },
  methods: {
    async loginUser(event) {
      event.preventDefault()
      try {
        const formData = new FormData()
        formData.append('phone', this.phone)
        formData.append('password', this.password)
        console.log(formData)
        const response = await axios.post('http://localhost:3000/login/access', formData)
        console.log("user",response.data.user)
        if (response.data.user === undefined) {
          this.message = 'Số điện thoại hoặc mật khẩu không chính xác'
          this.showMessage = true
          setTimeout(() => {
            this.showMessage = false
          }, 1000)
          return
        }if (response.data.user === undefined) {
          this.message = 'Số điện thoại hoặc mật khẩu không chính xác'
          this.showMessage = true
          setTimeout(() => {
            this.showMessage = false
          }, 1000)
          return
        }
        sessionStorage.setItem('id', response.data.user._id)
        sessionStorage.setItem('name', response.data.user.name)
        sessionStorage.setItem('phone', response.data.user.phone)
        sessionStorage.setItem('rule', response.data.user.rule)

        if (response.data.user.rule === true) {
          window.location.href = '/admin'
          // Redirect to admin page
        } else if (response.data.user.rule === false) {
          // Redirect to user page
          window.location.href = '/'
        }
        // const user =response.data.user
        this.message = response.data.message
        this.showMessage = true
        setTimeout(() => {
          this.showMessage = false
        }, 1000)
      } catch (error) {
        console.log(error)
        // this.errorMessage = 'An error occurred while logging in'
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
.main-login {
  background-color: #ffffff;
}
.login-name {
  text-align: center;
  font-size: 25px;
  font-family: 'Courier New', Courier, monospace;
  font-weight: 600;
  color: #000000;
}
.form-full {
  padding: 100px;
  margin-top: 70px;
  margin-bottom: 70px;
  box-shadow: 0px 0px 50px rgba(10, 9, 9, 0.271);
  background: url('/img/png/register.jpg') top center / cover no-repeat;

  border-radius: 50px;
}
.form-content {
  box-shadow: 0px 0px 50px rgba(203, 197, 197, 0.271);
  background-color: #ffffffee;
  padding: 25px 40px;
  border-radius: 50px;
  opacity: 0.99;
  width: 100%;
}
.if-no-tk {
  margin-top: 10px;
  text-align: center;
}

.if-no-tk-p {
  margin-top: 10px;
  color: #000000;
  text-decoration: none;
}
.if-no-tk-p a {
  color: rgb(242, 163, 6);
  text-decoration: none;
  text-transform: uppercase;
}

.if-no-tk-p a:hover {
  color: rgb(0, 0, 0);
  text-decoration: none;
  background-color: rgb(79, 227, 202);
  border-radius: 60px;
  padding: 5px;
}

.use-detail label {
  color: #000000;
}

.login-btn {
  justify-content: center;
  background-color: #000000;
  color: #ffffff;
  /* opacity: 0.7; */
}

.login-btn:hover {
  background-color: rgb(48, 232, 201);
  opacity: 0.8;
}

.btn-login-full {
  text-align: center;
}
@media screen and (max-width: 374px) {
  .form-content {
    padding: 10px;
    width: fit-content;
  }
  /* .use-full{
    padding: 10px;
  } */
}
</style>
