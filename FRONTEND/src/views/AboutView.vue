<script>
import headerVue from '../components/header.vue'
import footerVue from '../components/footer.vue'
 export default {
  components:{
    headerVue, footerVue
  }
 }

</script>

<template>
    <headerVue></headerVue>
  <main>
    <div class="row about-full">
      <div
        id="simple-list-example"
        class="d-block block-column gap-2 simple-list-example-scrollspy text-center about-nav"
      >
        <a class="rounded" href="#simple-list-item-1">About us</a>
        <a class="rounded" href="#simple-list-item-2">Service</a>
        <a class="rounded" href="#simple-list-item-3">OUR CORE VALUE</a>
      </div>
      
      <div class="about-main">
        <div
          data-bs-spy="scroll"
          data-bs-target="#simple-list-example"
          data-bs-offset="0"
          data-bs-smooth-scroll="true"
          class="scrollspy-example"
          tabindex="0"
        >
          <h4 id="simple-list-item-1 " class="text-center-name">About us</h4>
          <div class="row about-top align-items-center">
            <div class="col-sm-6 col-md-6 col-lg-5 img-about-one">
              <img src="public/img/about/about-1.jpg" style="w5dth: 100%" class=" " alt="" />
            </div>
            <div class="col-sm-6 col-md-6 col-lg-7 text-about-us">
              <p class="text-about-one">
                Chào mừng bạn đến với Cafe-Home, nơi chúng tôi kết hợp sự hoàn hảo của các hương vị để
                mang đến cho bạn một trải nghiệm thú vị với trà. Đội ngũ barista tài năng của chúng
                tôi luôn tận tâm trong việc tạo ra những ly cafe hoàn hảo, đảm bảo mỗi đồ uống
                được chuẩn bị một cách tỉ mỉ và tinh tế. Với sự chú ý đến từng chi tiết và cam kết
                về sự xuất sắc, chúng tôi hướng đến việc mang đến cho bạn những ly cafe nổi bật
                mỗi khi ghé thăm. Bước vào không gian ấm áp của chúng tôi và thư giãn trong khu vực
                ngồi thoải mái. Hòa mình vào không gian dễ chịu và thư giãn trong bầu không khí êm
                dịu khi bạn thưởng thức những tác phẩm cafe ưa thích của mình.
              </p>
            </div>
          </div>
          <div class="about-top-dis">
            <div class="row align-items-center">
              <div class="col-md-8 offset-md-2">
                <p class="text-top-dis">
                  Chào mừng bạn đến với Cafe-Home, nơi chúng tôi kết hợp sự hoàn hảo của các hương vị
                  để mang đến cho bạn một trải nghiệm thú vị với trà. Đội ngũ barista tài năng của
                  chúng tôi luôn tận tâm trong việc tạo ra những ly cafe hoàn hảo, đảm bảo mỗi đồ
                  uống được chuẩn bị một cách tỉ mỉ và tinh tế. Với sự chú ý đến từng chi tiết và
                  cam kết về sự xuất sắc, chúng tôi hướng đến việc mang đến cho bạn những ly cafe
                  nổi bật mỗi khi ghé thăm. Bước vào không gian ấm áp của chúng tôi và thư giãn
                  trong khu vực ngồi thoải mái. Hòa mình vào không gian dễ chịu và thư giãn trong
                  bầu không khí êm dịu khi bạn thưởng thức những tác phẩm cafe ưa thích của mình.
                </p>
              </div>
            </div>
          </div>

          <h4 id="simple-list-item-2" class="text-center-name">Service</h4>
          <div class="row align-items-center">
            <div class="col-sm-5 col-md-6">
              <p>
                Chất lượng luôn được chú trọng tại quán cafe của chúng tôi. Chúng tôi tận dụng
                những nguyên liệu tươi ngon và tốt nhất để tạo ra những ly cafe thơm ngon, bổ
                dưỡng và đẹp mắt. Đồng thời, chúng tôi luôn đảm bảo vệ sinh và an toàn thực phẩm để
                chắc chắn rằng khách hàng của chúng tôi nhận được những sản phẩm tốt nhất. Không chỉ
                là nơi để thưởng thức cafe, quán cafe của chúng tôi cũng là không gian lý
                tưởng để bạn thư giãn cùng bạn bè và gia đình. Với thiết kế hiện đại và thoáng đãng,
                chúng tôi muốn khách hàng cảm thấy thoải mái và thảnh thơi khi ghé thăm.
              </p>
            </div>
            <div class="col-sm-7 col-md-6">
              <div class="row d-flex img-about-1" style="justify-content: center">
                <div class="col-md-6 col-lg-6">
                  <img src="public/img/about/bartender.jpg" alt="" />
                </div>
                <div class="col-md-6 col-lg-6 img-about-1">
                  <img cla src="public/img/about/cook-1.jpg " alt="" />
                </div>
              </div>
            </div>
          </div>
          <h4 id="simple-list-item-3" class="text-center-name">OUR CORE VALUE</h4>
          <div class="row d-flex">
            <div class="col-sm-4">
              <div class="row img-about-2">
                <div class="col-sm-3 img-icon">
                  <img src="public/img/about/icon1.png" alt="" />
                </div>
                <h2>1. CHẤT LƯỢNG HÀNG ĐẦU</h2>
                <p class="text-about-2">
                  An toàn, hợp vệ sinh và thơm ngon. Việc sử dụng nguyên liệu an toàn, tự nhiên và
                  hợp vệ sinh là ưu tiên hàng đầu của Cafe-Home. Hương vị hoàn hảo của đồ uống là mục
                  tiêu quan trọng tiếp theo mà chúng tôi muốn hướng tới.
                </p>
              </div>
            </div>
            <div class="col-sm-4">
              <div class="row img-about-2">
                <div class="col-sm-3 img-icon">
                  <img src="public/img/about/icon2.png" alt="" />
                </div>
                <h2>2. DỊCH VỤ CHUYÊN NGHIỆP</h2>
                <p  class="text-about-2">
                  Cafe-home luôn mong muốn làm hài lòng khách hàng bằng phong cách phục vụ chuyên
                  nghiệp, thân thiện cũng như lắng nghe những đóng góp của khách hàng nhằm nâng cao
                  chất lượng Cafe-home.
                </p>
              </div>
            </div>
            <div class="col-sm-4">
              <div class="row img-about-2">
                <div class="col-sm-3 img-icon">
                  <img src="public/img/about/icon3.png" alt="" />
                </div>
                <h2>3. THƯƠNG HIỆU TIN CẬY</h2>
                <p class="text-about-2">
                  Dựa trên hai nền tảng cốt lõi là Chất lượng và Dịch vụ, Cafe-Home luôn nỗ lực xây
                  dựng và duy trì hình ảnh thương hiệu đáng tin cậy trong mắt khách hàng.
                </p>
              </div>
            </div>
          </div>
          <p></p>
        </div>
      </div>
    </div>
  </main>
  <footerVue></footerVue>
</template>

<style>
.about-full {
  /* margin-top: 30px; */
  margin-right: 0;
}
.about-top {
  margin: 0;
}

.about-nav {
  border-top:15px solid black;
  background-color: #ffffff;
}
.text-center-name{
  text-align: center;
  text-transform: uppercase;
  font-size: 35px;
  background-color: black;
  color: white;
}
.about-nav a {
  padding: 0px;
  text-transform: uppercase;
  text-decoration: none;
  color: #000000;
  font-size: 30px;
  font-family: 'Courier New', Courier, monospace;
  font-weight: 600;
  margin: 20px;
}
.about-nav a:hover{
  background-color: #b1dc83;
  padding: 5px;
}
.img-about-one img {
  width: 100%;
  border-radius: 25px;
  padding: 5px;
  background-color: #c4c89f;
}
.text-about-us {
  border-radius: 25px;
  padding: 25px;
  outline-style:double;
  outline-width: 15px;
}
.text-about-one {
  background-color: #b9c5ac;
  padding: 25px;
  border-radius: 25px;
  text-align: center;
}

.img-about-1 img {
  width: 100%;
  border-radius: 25px;
  margin-bottom: 5px;
  padding: 10px;
  background-color: #253216;
}
.img-about-2 {
  width: 100%;
  height: fit-content;

}
.img-icon {
  text-align: center;
}

.text-about-2{
  margin-top: 25px;
  height: fit-content;
}
@media screen and (min-width: 1001px) {
  .about-top-dis {
    display: none;
  }
  .img-about-one {
    /* margin-top: 50px; */
  }
}

@media screen and (max-width: 1000px) {
  .about-top {
    display: none;
  }
  .about-top-dis {
    height: auto;
    width: auto;
    background: url('/public/img/about/about-dis.jpg') top center / cover no-repeat;
  }
  .text-top-dis {
    background-color: #ffffff;
    margin: 25px;
    color: rgb(95, 131, 59);
    padding-top: 10px;
    font-family: 'Courier New', Courier, monospace;
    border-radius: 45px;
    padding: 25px;
    text-align: center;
  }
}
</style>
