<template>
  <headerVue></headerVue>
  <div class="img-connect row align-items-center w-100 m-0 ">
    <div class="col-sm-9 p-5 ">
      <h1>Liên hệ</h1>
      <h3>Vui lòng điền vào biểu mẫu để gửi phản hồi của bạn tới Cafe-Home</h3>
    </div>
    <div class="col-sm-3">
      <img src="/img/png/connect-img.png" alt="" style="width: 100%" />
    </div>
  </div>
  <hr>
  <p class="text-connect p-5">
    Cafe-Home luôn mong muốn nhận được nhưng phản hồi quý giá của quý khách hàng để có cơ hội hoàn
    thiện sản phẩm, dịch vụ hơn nữa. Những đóng góp của quý khách hàng luôn là tài sản vô giá đối
    với chúng tôi
    <hr />
  </p>

  <div class="row connect-user">
    <div class="col-md-6 offset-md-3">
      <h1 class="text-center mb-5">FEEDBACK</h1>

      <div class="row text-center mb-3">
        <div class="col-sm-6" style="outline-style: dashed; padding: 5px">
          <p >
            Tên Khách hàng:
            <span style="font-size: 19px; color: cadetblue">
              {{ nameUser }}
            </span>
          </p>
        </div>
        <div class="col-sm-6" style="outline-style: dashed; padding: 5px">
          <p >
            SĐT khách hàng :
            <span style="font-size: 19px; color: cadetblue">
              {{ phoneNumber }}
            </span>
          </p>
        </div>
      </div>
      <form @submit="submitForm" class="form-connect">
        <div class="">
          <label class="mb-3" for="comment">Comment:</label>
          <textarea class="form-control" id="comment" v-model="comment" required></textarea>
        </div>
        <div class="">
          <label class="my-3" for="image">Image:</label>
          <input
            class="form-control"
            multiple
            type="file"
            ref="fileInput"
            id="image"
            accept="*"
            @change="handleImageUpload"
          />
          <div class="">
            <img
              v-for="image in newImage"
              :key="image"
              style="outline-style: dashed; padding: 10px"
              class="mt-3"
              :src="image"
              alt=""
              width="250"
              height="250"
            />
          </div>
        </div>
        <div class="text-center mt-3">
          <button class="btn btn-outline-success" type="submit">Gửi</button>
        </div>
      </form>
    </div>
  </div>
  <footerVue></footerVue>
</template>

<script>
import headerVue from '../components/header.vue'
import footerVue from '../components/footer.vue'
import moment from 'moment'
import axios from 'axios'
export default {
  data() {
    return {
      comment: '',
      file: [],
      newImage:[],
      nameUser: '',
      phoneNumber: ''
    }
  },
  components: {
    headerVue,
    footerVue
  },
 
  mounted() {
    this.nameUser = sessionStorage.getItem('name')
    this.phoneNumber = sessionStorage.getItem('phone')
  },
  computed: {
    loginOn() {
      const phone = this.phoneNumber
      return phone
    }
  },
  methods: {
    handleImageUpload(event) {
      this.file = Array.from(event.target.files)
      const filePromises = this.file.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result)
          reader.onerror = reject
          reader.readAsDataURL(file)
        })
      })

      Promise.all(filePromises)
        .then((results) => {
          this.newImage = results
        })
        .catch((error) => {
          console.error('An error occurred:', error)
        })
    },
    async submitForm(event) {
      if (this.loginOn) {
        const idUser = sessionStorage.getItem('id')
        event.preventDefault()

        const dayComments = moment().format('DD-MM-YYYY HH:mm:ss')


        const formData = new FormData()
        formData.append('idUser', idUser)
        formData.append('dayComment', dayComments)
        formData.append('comment', this.comment)
        for (let i = 0; i < this.file.length; i++) {
          formData.append('image[]', this.file[i])
        }
        console.log(formData);
        try {
          const response = await axios.post('http://localhost:3000/connect/comment', formData)
        } catch (error) {
          console.error('An error occurred:', error)
        }
        alert('Gửi đánh giá thành công')
        this.comment='';
        this.file = [];
        this.newImage = [];

      } else {
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style>
.connect-user {
  margin: 50px 0;
}
.img-connect {
  border-top:15px solid black;
}

.text-connect{
  font-size: 18px;
  background-color: black;
  color: aliceblue;
  padding: 20px;
}
</style>
