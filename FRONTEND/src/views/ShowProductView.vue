<template>
  <headerAdminVue></headerAdminVue>

  <h2 class="text-name-admin">Danh Sách Sản Phẩm</h2>
  <div class="back">
    <router-link to="/listCate" class=""
      ><i class="fa fa-arrow-left" aria-hidden="true"></i
    ></router-link>
  </div>
  <div class="text-center next-add mb-5">
    <RouterLink :to="'/listCate/' + this.categoryId + '/products'">Thêm sản phẩm</RouterLink>
  </div>

  <table class="table text-center table-bordered">
    <thead class="table-dark">
      <tr class="text-center">
        <th scope="col">STT</th>
        <th scope="col">Tên sản phẩm</th>
        <th scope="col">Hình Ảnh</th>
        <th scope="col">SizeS</th>
        <th scope="col">SizeM</th>
        <th scope="col">Thông tin sản phẩm</th>
        <th scope="col">Edit</th>
        <th scope="col">Removed</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(product, index) in products" :key="product._id">
        <td>{{ index + 1 }}</td>
        <td>{{ product.name }}</td>

        <td>
          <img
            v-for="image in product.images"
            :key="image._id"
            v-bind:src="'/public/img/products/' + image.name"
            alt=""
            width="100"
            height="100"
          />
        </td>
        <td>{{ product.sizeS }}</td>
        <td>{{ product.sizeM }}</td>
        <td>{{ product.details }}</td>

        <td v-if="product.status == true">
          <button class="btn-edit btn">
            <router-link :to="'/editProduct/' + product._id">
              <i class="fa fa-pencil" aria-hidden="true"></i>
            </router-link>
          </button>
        </td>
        <td v-if="product.status == true">
          <button
            type="button"
            class="btn-edit btn"
            data-bs-toggle="modal"
            :data-bs-target="'#' + product.name.replaceAll(' ','m')"
          >
            <i class="fa fa-trash" aria-hidden="true"></i>
          </button>
          <div
            class="modal fade"  
            :id=" product.name.replaceAll(' ','m')"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
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
                <div class="modal-body">
                  <div class="row align-items-center">
                    <div class="col-3">
                      <img src="/img/png/canh-bao.png" width="100" alt="" />
                    </div>
                    <div class="col-9">
                      <h4>Bạn có chắc là muốn xóa sản phẩm <span style="color: red;"> {{ product.name }}</span></h4>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <div class="" v-if="product.status == true">
                    <button
                      type="button"
                      @click="deleteProduct(product._id)"
                      class="btn-edit btn"
                      data-bs-dismiss="modal"
                    >
                      <i class="fa fa-trash" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </td>
        <td colspan="6" v-else>
          <p>Sản phẩm không tồn tại</p>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import headerAdminVue from '../components/HeaderAdmin.vue'
import axios from 'axios'
export default {
  data() {
    return {
      categories: [],
      products: []
    }
  },
  components: {
    headerAdminVue
  },
  created() {
    this.categoryId = this.$route.params.id // Lấy ID từ URL và gán cho biến categoryId
    this.fetchShowProduct()
    this.fetchShowImage()
  },
  methods: {
    async fetchShowProduct() {
      try {
        const productAll = {}
        axios
          .get('http://localhost:3000/product/home')
          .then((response) => {
            response.data.map((product) => {
              // console.log(product.category);
              if (product.category === this.categoryId) {
                // console.log(product);
                productAll[product._id] = product
              }
              this.products = Object.values(productAll)
              console.log('productAll', productAll)
            })
            this.fetchShowImage()
            // console.log(response.data);
          })
          .catch((error) => {
            console.log(error)
          })
      } catch (err) {
        console.log(err)
      }
    },
    async fetchShowImage() {
      try {
        const response = await axios.get('http://localhost:3000/product/img')
        const images = response.data
        console.log(' img.nameProduct', response.data)

        this.products.forEach((product) => {
          console.log(' product._id', product._id)
          const productImages = images.filter((img) => img.nameProduct === product._id)
          if (productImages) {
            console.log('productImages', productImages)
          }
          product.images = productImages
          // console.log(" product.images", product.images);
          // console.log(" img.nameProduct", img.nameProduct);
        })
      } catch (error) {
        console.log(error)
      }
    },
    async deleteProduct(productId) {
      console.log('id san pham ', productId)
      try {
        await axios.delete(`http://localhost:3000/product/${productId}`)
        // Xóa thành công, tải lại trang

        this.fetchShowProduct()
        this.fetchShowImage()
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>
.btn-edit {
  font-size: 25px;
  color: rgba(196, 59, 59, 0.734);
}
.btn-edit a {
  font-size: 25px;

  text-decoration: none;
  color: rgb(120, 204, 219);
  padding: 10px;
}
.btn-edit a:hover {
  color: black;
}
.next-add a {
  text-decoration: none;
  font-size: 17px;
  text-transform: uppercase;
  color: rgb(255, 255, 255);
  background-color: rgba(97, 185, 180, 0.853);
  padding: 10px;
  border: 5px solid rgba(53, 51, 51, 0.241);
  border-radius: 25px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.318);
}
</style>
