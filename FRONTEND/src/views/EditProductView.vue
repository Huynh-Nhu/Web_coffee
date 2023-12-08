<template>
  <headerAdminVue></headerAdminVue>

  <div class="">
    <div>
      <h2 class="text-name-admin">Sửa thông tin của sản phẩm</h2>
    </div>
    <div class="back">
      <router-link :to="`/listCate/${products.category}`">
        <i class="fa fa-arrow-left" aria-hidden="true"></i>
      </router-link>
    </div>
    <div class="row form-update">
      <div class="form-content-update col-md-6 offset-md-3">
        <p class="name-edit-pr">
          Cập nhật thông tin của sản phẩm
          <br />
        </p>

        <div class="col-md-6 offset-md-3">
          <form
            @submit.prevent="updateProduct"
            enctype="multipart/form-data"
            class="form-update-children"
          >
            <div>
              <label for="name">Tên sản phẩm:</label>
              <input
                class="form-control mt-3"
                type="text"
                id="name"
                v-model="products.name"
                required
              />
            </div>
            <!-- <img   v-bind:src="'/public/img/products/' + images.name" alt="" width="100" height="100" /> -->

            <div>
              <label class="mt-3" for="image">Hình ảnh:</label>
              <input
                class="form-control mt-3"
                type="file"
                ref="fileInput"
                id="file"
                @change="handleFile"
                accept="*"
              />
              <img v-if="newImage" :src="newImage" alt="" width="100" height="100" />
            </div>
            <div>
              <label class="mt-3" for="sizes">Kích thước và giá tiền:</label>
              <div id="sizes">
                <div class="size-input">
                  <input
                    class="form-control mt-3"
                    type="text"
                    v-model="products.sizeS"
                    placeholder="Size S"
                    required
                  />
                  <input
                    class="form-control mt-3"
                    type="text"
                    v-model="products.sizeM"
                    placeholder="Size M"
                    required
                  />
                </div>
              </div>
            </div>
            <div>
              <label class="mt-3" for=" details">Thông tin chi tiết:</label>
              <textarea
                class="form-control mt-3"
                id="details"
                v-model="products.details"
              ></textarea>
            </div>
            <div class="btn-edit text-center mt-3">
              <button class="btn btn-dark" type="submit">Cập nhật sản phẩm</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <div class="modal" id="edit-success" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body my-5">
          <h5 class="text-center">Cập nhật sản phẩm thành công</h5>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import headerAdminVue from '../components/HeaderAdmin.vue'

import axios from 'axios'
export default {
  data() {
    return {
      products: [],
      file: null,
      newImage: ''
    }
  },
  components: {
    headerAdminVue
  },
  created() {
    this.productId = this.$route.params.id // Lấy ID từ URL và gán cho biến categoryId
    this.fetchGetProduct()
  },
  methods: {
    async fetchGetProduct() {
      axios.get(`http://localhost:3000/product/${this.productId}`).then((response) => {
        this.products = response.data

        console.log('Cateory', this.products.category)
      })
    },

    async updateProduct() {
      try {
        // Tạo một FormData object để gửi dữ liệu sản phẩm và tệp ảnh đến máy chủ
        if (this.products.category) {
          const formData = new FormData()
          formData.append('name', this.products.name)
          formData.append('sizeS', this.products.sizeS)
          formData.append('sizeM', this.products.sizeM)
          formData.append('details', this.products.details)
          axios
            .put(`http://localhost:3000/product/${this.productId}/edit`, this.products)
            .then((response) => {
              this.products = response.data
              console.log(response)
              $('#edit-success').modal('show')
              setTimeout(() => {
                $('#edit-success').modal('hide')
              }, 1000)
              this.fetchGetProduct()
            })
            .catch((error) => {
              console.log(error)
            })

          if (this.file) {
            formData.append('image', this.file) // Thêm tệp ảnh vào FormData
          }
          if (this.file) {
            const formDataImage = new FormData()
            formDataImage.append('image', this.file)
            await axios
              .put(`http://localhost:3000/product/${this.productId}/upimg`, formDataImage)
              .then((response) => {
                this.file = response.data
                console.log(this.file)
                console.log(response.data)
              })
              .catch((err) => {
                console.log(err)
              })
          }
        }
      } catch (err) {
        console.log(err)
      }
    },

    async handleFile(event) {
      this.file = this.$refs.fileInput.files[0]
      const file = event.target.files[0]
      const Read = new FileReader()
      Read.onload = async () => {
        this.newImage = await Read.result
      }
      Read.readAsDataURL(file)
    }
  }
}
</script>

<style>
.name-edit-pr {
  text-align: center;
  font-size: 45px;
  color: cadetblue;
  font-weight: 800;
}
.name-update {
  color: black;
  font-size: 20px;
}
.form-update-children label {
  font-size: 20px;
}
.form-update {
  position: relative;
}
.form-update::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('/img/png/edit-1.jpg') center center;
  filter: blur(0.8px); /* Điều chỉnh mức độ mờ tại đây */
  z-index: -1;
}
.form-content-update {
  background-color: rgb(255, 255, 255);
  padding: 50px;
  border-radius: 25px;
  margin-top: 30px;
  box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.897);
  margin-bottom: 50px;
}
</style>
