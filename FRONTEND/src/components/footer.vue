<template>
  <footer>
    <div class="row row-footer">
      <div class="col-sm-4 col-md-4 col-lg-4 footer-left">
        <div class="local-footer-left">
          <p class="footer-name">Cafe-Home</p>
          <p class="footer-detail">
            Cám ơn bạn đã đồn hành cùng với chúng tôi.
            <br />
            Hãy truy cập vào đây để biết thêm về Cafe-Home nhe.
          </p>
          <div class="icon-bobam">
            <ul class="icon-con">
              <li>
                <a href="">
                  <i class="ti-facebook face-icon"></i></a>
              </li>
              <li>
                <a href=""><i class="ti-instagram ig-icon"></i></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-sm-4 col-md-4 col-lg-4 dis-footer">
        <div class="show-inf">
          <p class="footer-name">Mục Lục</p>
          <div class="inf-footer">
            <div class="inf-con">
              <router-link @click.native="scrollToTop" to="/" class="">HOME</router-link>
              <router-link @click.native="scrollToTop" to="/products" class="">product</router-link>
              <router-link @click.native="scrollToTop" to="/about">ABOUT</router-link>
              <router-link @click.native="scrollToTop" to="/" class="">Connect</router-link>
            </div>
          </div>
        </div>
        <div class="row-dows">
          <div class="accordion" id="accordionExample">
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button
                  class="accordion-button btn btn-outline-success footer-name-dow"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Cafe-Home
                </button>
              </h2>
              <div
                id="collapseOne"
                class="accordion-collapse collapse show"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body inf-footer-dow">
                  <router-link @click.native="scrollToTop" to="/" class="">HOME</router-link>
                  <router-link @click.native="scrollToTop" to="/products" class="">product</router-link>
                  <router-link @click.native="scrollToTop" to="/about">ABOUT</router-link>
                  <router-link @click.native="scrollToTop" to="/" class="">Connect</router-link>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button
                  class="accordion-button collapsed footer-name-dow"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  THÔNG TIN CỬA HÀNG
                </button>
              </h2>
              <div
                id="collapseTwo"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <ul class="local-ul">
                    <li>
                      <i class="ti-location-pin"></i>
                      <span>Đường 30/4,Hẻm 672,P.Hưng Lợi,Q.Ninh Kiều</span>
                    </li>
                    <li>
                      <i class="fa fa-phone"></i>
                      0846316361
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-4 col-md-4 col-lg-4 footer-right-dis">
        <div class="local-footer">
          <p class="footer-name">THÔNG TIN CỬA HÀNG</p>
          <div class="local-footer-cont">
            <ul class="local-ul">
              <li>
                <i class="ti-location-pin"></i>
                <span>Đường 30/4,Hẻm 672,P.Hưng Lợi,Q.Ninh Kiều</span>
              </li>
              <li>
                <i class="fa fa-phone"></i>
                0846316361
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

  </footer>
</template>
<script>
export default {
  name: 'footerVue',
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style>
.row-footer {
  display: flex;  background-image: linear-gradient(rgb(187, 153, 94), rgb(218, 199, 164));

  margin: 0;
}
.local-footer-left {
  margin-left: 30px;
}

.footer-name {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  font-family: 'Courier New', Courier, monospace;
  margin-bottom: 0;
}

.footer-name-dow {
  background-color: #668245;
}

.footer-detail {
  font-size: 15px;
  font-family: 'Times New Roman', Times, serif;
  margin: 0;
  text-align: center;
  font-weight: 100;
}

.icon-con {
  display: flex;
  padding-left: 0;
  justify-content: center;
  margin-top: 0;
}

.icon-con li {
  list-style: none;
  font-size: 23px;
  margin-right: 20px;
}

.icon-con li a {
  color: black;
  /* opacity: 0.5; */
  text-decoration: none;
}

.icon-con li:hover a {
  color: rgb(42, 234, 231);
  list-style: none;
  background-color: rgb(0, 0, 0);
  padding: 5px;
  border-radius: 60px;
}

.footer-name-1 {
  font-size: 20px;
  font-weight: bold;
  font-family: 'Courier New', Courier, monospace;
  margin-bottom: 0;
}

.inf-con {
  list-style: none;
  display: block;
  text-align: center;
}
.inf-con a {
  padding: 0;
  display: inline-block;
  margin-right: 20px;
  text-decoration: none;
  color: rgb(0, 0, 0);
  padding: 10px;
  text-decoration: none;
  text-transform: uppercase;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.inf-footer-dow a {
  display: block;
  text-decoration: none;
  text-transform: uppercase;
  color: #000000;
  text-align: center;
}

/* footer-right */
.local-ul li {
  list-style: none;
}

.local-ul li i {
  font-size: 20px;
  color: rgb(0, 0, 0);
}

@media screen and (min-width: 586px) {
  .row-dows {
    display: none;
  }
}

@media screen and (max-width: 586px) {
  .row-dows {
    display: block;
  }

  .show-inf {
    display: none;
  }

  .footer-right-dis {
    display: none;
  }
}
</style>
