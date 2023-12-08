<template>
  <headerVue></headerVue>

  <main class="order-main">
    <div v-if="count" class="order-count">
      <p style="font-size: 25px; outline-style: dashed;">Tổng kho đơn hàng có: {{ orders.length }} đơn</p>

      <div class="container">
        <div class="row">
          <div class="">
            <div v-for="order in orders" :key="order.order._id" class="card order-card my-3">
              <div class="card-header card-hd">
                <div class="row">
                  <div class="col-sm-6">
                    <h5 class="day-order">Ngày đặt đơn:  {{ order.order.dayOrder }}</h5>
                  </div>
                  <div class="col-sm-6">
                    <div class="btn-seen">
                      <button
                        type="button"
                        class="btn btn-btn"
                        data-bs-toggle="modal"
                        :data-bs-target="'#exampleModal' + order.order._id"
                      >
                        Xem Sản Phẩm
                      </button>

                      <ListOrderProduct
                        :orderDetail="order.orderDetail"
                        :modalId="'exampleModal' + order.order._id"
                      ></ListOrderProduct>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-3">
                    <p class="card-text mx-2">
                      Tổng số lượng: {{ calculateTotalQuantity(order.orderDetail) }}
                    </p>
                  </div>
                  <div class="col-sm-3">
                    <p class="card-text mx-2">
                      Tổng Hóa Đơn: {{ calculateTotalPrice(order.orderDetail) }}
                    </p>
                  </div>
                  <div class="col-sm-3">
                    <p class="card-text mx-2">
                      Địa Chỉ Giao Hàng: {{ getOrderAddress(order.orderDetail) }}
                    </p>
                  </div>
                  <div class="col-sm-3">
                    <p class="card-text mx-2">Trạng thái: {{ order.order.status }}</p>
                  </div>
                </div>
              </div>
              <div class="card-footer">
                <p class="card-text mx-2">Ngày giao hàng: {{ order.order.dayCurrent }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!count" class="empty-order">
      <p style="font-size: 25px">Chưa có hóa đơn nào tồn tại</p>
      <img src="/img/png/emty.png" alt="Empty Order" />
    </div>
  </main>
  <footerVue></footerVue>
</template>

<script>
import headerVue from '../components/header.vue'
import footerVue from '../components/footer.vue'
import axios from 'axios'
import ListOrderProduct from '../components/ProductOrder.vue'

export default {
  data() {
    return {
      orders: [],
      count: true
    }
  },
  components: {
    ListOrderProduct,
    headerVue,
    footerVue
  },
  created() {
    // this.calculateOrderCount()
  },

  mounted() {
    this.fetchOrders()
  },
  methods: {
    fetchOrders() {
      const userID = sessionStorage.getItem('id')
      axios
        .get('http://localhost:3000/order/show')
        .then((response) => {
          this.orders = response.data
            .filter((order) => order.order.idUser === userID)
            .filter((order) => order.order && order.order.dayOrder)
            .sort((a, b) => {
              //sắp hóa đơn có ngày giảm dần
              if (a.order.dayOrder > b.order.dayOrder) {
                return -1
              } else if (a.order.dayOrder < b.order.dayOrder) {
                return 1
              }
              return 0
            })
          const counts = this.orders.length
          console.log(counts)
          if (counts > 0) {
            this.count = true
          } else {
            this.count = false
          }
          // this.calculateOrderCount()
        })
        .catch((error) => {
          console.error(error)
        })
    },
    calculateTotalQuantity(orderDetail) {
      let totalQuantity = 0
      for (const detail of orderDetail) {
        totalQuantity += parseInt(detail.quantityProduct) //chuyen lieu dl tu string sang so de tinh;
      }
      return totalQuantity
    },
    calculateTotalPrice(orderDetail) {
      let totalPrice = 0
      for (const detail of orderDetail) {
        totalPrice += parseInt(detail.priceAll) // Giả sử giá tiền sản phẩm lưu trong thuộc tính 'price'
      }
      return totalPrice.toLocaleString('vi-VN', { minimumFractionDigits: 3 })
    },
    getOrderAddress(orderDetail) {
      for (const detail of orderDetail) {
        // console.log(detail.localUser)
        return detail.localUser
      }
    }
  }
}
</script>

<style>
.order-main {
  height: auto;
  border-top: 15px solid black;
}
.btn-seen {
  text-align: end;
}
.order-count {
  text-align: center;
  margin-top: 10px;
}

.order-card:hover {
  margin: -5px;
}
.card-text:hover {
  color: rgb(0, 0, 0);
}
.btn-btn {
  border: 2px solid rgb(255, 255, 255);
  box-shadow: 0px 0px 5px rgba(255, 255, 255, 0.5);

  background-color: #000000;
  color: #ffffff;
}
.btn-btn:hover {
  background-color: rgb(255, 255, 255);
  color: #1b1515;
}

.empty-order {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  text-align: center;
}

.empty-order img {
  width: 50%;
  margin-bottom: 10px;
}
</style>
