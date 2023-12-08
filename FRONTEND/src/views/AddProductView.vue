<template>
  <headerAdminVue></headerAdminVue>

  <main class="add-admin">
    <h2 class="text-name-admin">Thêm Sản Phẩm</h2>
    <div class="back">
      <router-link :to="`/listCate/${categoryId}`">
        <i class="fa fa-arrow-left" aria-hidden="true"></i>
      </router-link>
    </div>
    <div class="container">
      <div class="row form-add-product-admin" :class="{ 'show-form': showForm }">
        <div class="col-md-6 offset-md-3 form-input">
          <form @submit.prevent="addProduct" enctype="multipart/form-data" class="">
            <div class="">
              <h1 class="text-center">{{ categoryName }}</h1>
            </div>
            <div>
              <label for="name">Tên sản phẩm:</label>
              <input
                class="form-control"
                type="text"
                id="name"
                v-model="name"
                required
                placeholder="Nhập tên cho sản phẩm"
              />
            </div>
            <div>
              <label for="image">Hình ảnh:</label>
              <input
                class="form-control"
                type="file"
                ref="fileInput"
                id="file"
                @change="handleFile"
                accept="*"
              />
              <div class="img text-center">
                <img v-if="newImage" :src="newImage" alt="" width="250" height="250" />
              </div>
            </div>
            <div>
              <label for="sizes">Kích thước và giá tiền:</label>
              <div id="sizes">
                <div class="size-input">
                  <input
                    class="form-control mb-3"
                    type="text"
                    v-model="sizeS"
                    placeholder="Size S"
                    required
                  />
                  <input
                    class="form-control"
                    type="text"
                    v-model="sizeM"
                    placeholder="Size M"
                    required
                  />
                </div>
              </div>
              <!-- {{!-- <button type="button" id="add-size">Thêm kích thước</button> --}} -->
            </div>
            <div>
              <label for=" details">Thông tin chi tiết:</label>
              <textarea
                class="form-control"
                placeholder="Thêm những thôg tin cho sản phẩm"
                id="details"
                v-model="details"
              ></textarea>
            </div>
            <div class="btn-add">
              <button class="btn btn-add-form" type="submit">Thêm Sản Phẩm Mới</button>
            </div>

            <div  v-if="showMessage" class="alert alert-secondary text-center mt-2  d-flex "  role="alert">
             
              <div style="color: black; text-align: center;">{{ message }}</div>
            </div>
           
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import headerAdminVue from '../components/HeaderAdmin.vue'

import axios from 'axios'
export default {
  data() {
    return {
      newImage: '',
      categoryName: '',
      categoryId: '',
      name: '',
      file: null,
      sizeS: '',
      sizeM: '',
      details: '',
      showForm: false,
      messages: '',
      showMessage: false
    }
  },
  components: {
    headerAdminVue
  },
  mounted() {
    setTimeout(() => {
      this.showForm = true
    }, 100)
  },

  created() {
    this.categoryId = this.$route.params.id // Lấy ID từ URL và gán cho biến categoryId
    this.fetchCategory()
  },
  methods: {
    fetchCategory() {
      axios
        .get(`http://localhost:3000/category/${this.categoryId}`)
        .then((response) => {
          this.categoryName = response.data.name
          console.log(response.data.name)
        })
        .catch((error) => {
          console.log(error)
          console.error('Error fetching category:', error)
        })
    },
    async handleFile(event) {
      this.file = this.$refs.fileInput.files[0]
      const file = event.target.files[0]

      const Read = new FileReader()
      Read.onload = async () => {
        this.newImage = await Read.result
      }
      Read.readAsDataURL(file)
    },
    async addProduct() {
      try {
        const formData = new FormData()
        formData.append('categoryId', this.categoryId)
        formData.append('name', this.name)
        formData.append('image', this.file)
        formData.append('sizeS', this.sizeS)
        formData.append('sizeM', this.sizeM)
        formData.append('details', this.details)
        console.log(this.file)
        console.log(formData)
        // const categoryId = this
        const response = await axios.post(
          `http://localhost:3000/category/${this.categoryId}/products`,
          formData
        )
        this.messages = ' Thêm sản phẩm thành công'
        this.showMessage = true
        setTimeout(() => {
          this.showMessage = false
        }, 1000)

        // Reset các giá trị form fields
        this.name = ''
        this.newImage = ''
        this.sizeS = ''
        this.sizeM = ''
        this.details = ''

        // Tạo một giá trị ngẫu nhiên cho ref input file
        this.$refs.fileInput.value = ''
        this.$refs.fileInput.dispatchEvent(new Event('input'))
        // Redirect đến trang danh sách sản phẩm
        this.$router.push(`/listCate/${this.categoryId}/products`)
        this.message = response.data
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style>
.back a {
  color: black;
  font-size: 2rem;
}
.add-admin {
  background-color: rgba(97, 185, 178, 0.853);
}
.form-add-product-admin {
  padding: 50px;
  border-radius: 25px;
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 1.5s ease,
    transform 1.2s ease;
}
.show-form {
  opacity: 1;
  transform: translateY(0);
}
.form-input {
  background-color: rgb(255, 255, 255);

  padding: 50px 30px;
  border-radius: 25px;
}
.btn-add {
  text-align: center;
}
.btn-add-form {
  margin-top: 25px;
  text-align: center;
  background-color: black;
  color: white;
}
.btn-add-form:hover {
  color: black;
  background-color: rgb(0, 255, 115);
}
</style>
