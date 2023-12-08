<script>
import headerVue from '../components/header.vue'
import footerVue from '../components/footer.vue'
import axios from 'axios'
export default {
  data() {
    return {
      products: []
    }
  },
  components: {
    headerVue,
    footerVue
  },
  methods: {
    // Hàm lấy ngẫu nhiên một số từ một khoảng giá trị
    getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min
    },
    // Hàm lấy ngẫu nhiên 3 sản phẩm từ danh sách sản phẩm
    getRandomProducts(products) {
      const randomizedProducts = []
      const numProducts = products.length

      // Kiểm tra nếu danh sách sản phẩm ít hơn 3 thì trả về toàn bộ danh sách
      if (numProducts <= 3) {
        return products
      }

      // Lấy ngẫu nhiên 3 chỉ số sản phẩm trong danh sách
      const randomIndexes = new Set()
      while (randomIndexes.size < 3) {
        randomIndexes.add(this.getRandomNumber(0, numProducts - 1))
      }

      // Lấy sản phẩm tương ứng với các chỉ số ngẫu nhiên
      randomIndexes.forEach((index) => {
        randomizedProducts.push(products[index])
      })

      return randomizedProducts
    },
    // Phương thức hiển thị danh sách sản phẩm
    async showAll() {
      try {
        // Lấy danh sách sản phẩm từ API
        const productsResponse = await axios.get('http://localhost:3000/product/home')
        const allProducts = productsResponse.data.filter((product) => product.status == true)

        // Lấy ngẫu nhiên 3 sản phẩm từ danh sách sản phẩm
        const randomProducts = this.getRandomProducts(allProducts)

        // Gán danh sách sản phẩm ngẫu nhiên vào biến products
        this.products = randomProducts

        // Lấy danh sách ảnh sản phẩm từ API
        const imagesResponse = await axios.get('http://localhost:3000/product/img')
        const images = imagesResponse.data

        // Gán danh sách ảnh sản phẩm cho từng sản phẩm
        this.products.forEach((product) => {
          const productImages = images.filter((img) => img.nameProduct === product._id)
          product.images = productImages
        })

        console.log(this.products)
      } catch (err) {
        console.log(err)
      }
    }
  },
  mounted() {
    this.showAll()
  }
}
</script>

<template>
  <headerVue></headerVue>

  <main class="col-main">
    <div class="container">
      <div class="carousel">
        <div id="carouselExampleIndicators" class="carousel slide">
          <div class="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              class="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div class="carousel-inner carousel-top">
            <div class="carousel-item active">
              <img
                src="public/img/carousel/1.png"
                class="d-block"
                alt="..."
                style="width: 100%; height: 100%"
              />
            </div>
            <div class="carousel-item">
              <img
                src="public/img/carousel/2.png"
                class="d-block"
                alt="..."
                style="width: 100%; height: 100%"
              />
            </div>
            <div class="carousel-item">
              <img
                src="public/img/carousel/3.png"
                class="d-block"
                alt="..."
                style="width: 100%; height: 100%"
              />
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>

    <p class="local-name">Cafe-Home</p>
    <div class="container">
      <div class="row d-flex product-1 align-items-center">
        <div class="col-md-6 col-lg-6 col-xl-6 col-xxl-6 img_p1">
          <img src="/img/product/PHIN_SUA_DA_5.1.png" alt="" />
        </div>
        <div class="col-md-6 col-xl-6 col-lg-6 col-xxl-6 text_p1">
          <p class="text_main1">
            Sự kết hợp hoàn hảo giữa hạt cà phê Robusta & Arabica thượng hạng được trồng trên những
            vùng cao nguyên Việt Nam màu mỡ, qua những bí quyết rang xay độc đáo, Highlands Coffee
            chúng tôi tự hào giới thiệu những dòng sản phẩm Cà phê mang hương vị đậm đà và tinh tế.
          </p>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row d-flex product-2 align-items-center">
        <div class="col text_p2">
          <p>
            Sảng khoái với thức uống đá xay phong cách Việt. Freeze là thức uống đá xay mát lạnh
            được pha chế từ những nguyên liệu thuần túy của Việt Nam
          </p>
        </div>
        <div class="col img_p1" style="text-align: end">
          <img src="/img/product/FREEZE-TRA-XANH-5.1.png" alt="" />
        </div>
      </div>
    </div>

    <div class="container">
      <div class="d-block row product_3">
        <div class="col-sm-8 offset-sm-2">
          <hr />
          <div class="border-text">
            <p class="text_p3">
              Hương vị tự nhiên, thơm ngon của Trà Việt với phong cách hiện đại tại Highlands Coffee
              sẽ giúp bạn gợi mở vị giác của bản thân và tận hưởng một cảm giác thật khoan khoái,
              tươi mới.
            </p>
          </div>
          <hr />
          <div class="img_p3 text-center">
            <img src="/img/product/TRA-SEN-VANG-CN-5.1.png" />
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row d-flex mt-4  align-items-center ">
        <div class="col-md-4 col-xl-4 col-xxl-4 img_p4">
          <img src="/img/product/sinh-to.png" style="width: 100%" alt="" />
        </div>
        <div class="col-md-8 col-xl-8 col-xxl-8">
          <p class="text_p4" style="text-align: center">
            Sinh tố trái cây cung cấp nhiều vitamin, chất chống oxy hóa và chất xơ cho cơ thể. Nó có thể được tận hưởng ngay trong ly hoặc thêm đá hoặc sữa để tạo thành các biến thể khác nhau. Sinh tố trái cây là một lựa chọn tuyệt vời để tăng cường sức khỏe và cung cấp năng lượng trong mùa hè nóng bức.</p>
        </div>
      </div>
    </div>

    <p class="local-name">Gợi Ý Một Vài Sản Phẩm</p>
    <div class="container">
      <div class="row">
        <div class="col" v-for="product in products" :key="product._id">
          <div class="row product-seller">
            <router-link :to="'/products/' + product._id">
              <img
                v-for="image in product.images"
                :key="image._id"
                :src="'/public/img/products/' + image.name"
                style="width: 100%; height: 100%"
                alt=""
              />
            </router-link>
            <p class="name-product-seller">{{ product.name }}</p>
          </div>
        </div>
      </div>
    </div>

    <p class="local-name">Local</p>

    <div class="container">
      <div class="home-content row d-flex">
        <div class="col-md-6 local-home">
          <div class="row d-block">
            <div class="col-md-12 mb-4">
              <img
                class="img-1"
                src="public/img/local/DD1.jpg"
                style="width: 100%; height: 100%"
                alt=""
              />
            </div>
            <div class="col-md-12">
              <img
                class="img-2"
                src="public/img/local/DD2.jpg"
                style="width: 100%; height: 100%"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="col-md-6 local-home">
          <div class="row d-block">
            <div class="col-md-12 mb-4">
              <img
                class="img-3"
                src="public/img/local/DD-3.jpg"
                style="width: 100%; height: 100%"
                alt=""
              />
            </div>
            <div class="col-md-12">
              <img
                class="img-4"
                src="public/img/local/DD4.jpg"
                style="width: 100%; height: 100%"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <footerVue></footerVue>
</template>

<style>
.col-main {
  border-top: 15px solid black;
}

.row-3 {
  display: flex;
  padding-bottom: 15px;
}
.row-4 {
  height: auto;
}
.row-5 {
  height: auto;
}
/* carousel */

/* local */
.product-1 {
  background-color: rgb(128, 117, 80);
  border-radius: 25px;
}
.local-name {
  margin-top: 5px;
  background-color: rgb(19, 25, 35);
  color: rgb(255, 255, 255);
  text-align: center;
  padding: 25px;
  font-size: 35px;
  font-weight: 100;
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
  border: #ffffff solid;
}

.img-local {
  background-color: rgb(0, 0, 0);
  border-radius: 10px;
}

/* product introduce */
.img_p1 img {
  width: 75%;
}

.text_main1 {
  background-color: #000000;
  /* background-color: rgb(46, 150, 108); */
  color: #ffffff;
  outline-style: dashed;
  outline-color: #ffffff;
  padding: 50px;
  text-align: center;
  border-radius: 10px 50px 50px 10px;
  font-size: 1.2rem;
}
@media screen and (max-width: 768px) {
  .img_p1 {
    width: 100%;
  }
  .text_main1 {
    margin-top: -25px;
  }
}
.product-2 {
  outline-style: dashed;
  margin: 25px 0;
  box-shadow: 0px 0px 30px rgba(66, 64, 64, 0.5);
  border-radius: 25px;
}
.text_p2 {
  background-color: #567951;
  color: #ffffff;
  margin-left: 25px;
  padding: 50px;
  text-align: center;
  border-radius: 50px 5px 5px 50px;
  font-size: 1.2rem;
  
}
.product_3 {
  border: rgba(0, 0, 0, 0.521) solid 5px;
  border-radius: 25px;
  background-color: #d5c49ec9;
  margin: 25px 0;
}

.img_p3 img {
  padding: 0;
  width: 50%;
}
.text_p3 {
  margin-top: 25px;
  background-color: rgba(92, 71, 41, 0.801);

  color: #ffffff;
  padding: 20px;
  border-radius: 25px;
}
@media screen and (max-width: 768px) {
  .img_p3 {
    margin-top: -50px;
    width: 100%;
  }
  .text_p3 {
    margin-top: 25px;
  }
}
.img_p4 {
  background-color: #000000c1;
  border-radius: 50px;
}
.text_p4 {
  color: #000000; 
}
@media screen and (max-width: 768px) {
  .img_p4 {
    width: 100%;
  }
  .text_p4 {
    margin-top: 25px;
  }
}

/* product best seller */
.name-product-seller {
  text-align: center;
  color: #000000;
  text-transform: uppercase;
  font-size: 20px;
}
.product-seller img:hover {
  margin: -5px;
}
.local-home img {
  border-radius: 25px;
  margin-bottom: 25px;
}
.local-home img:hover {
  content: 'shadyu';

  background: #000;
  padding: 5px;
}
</style>
