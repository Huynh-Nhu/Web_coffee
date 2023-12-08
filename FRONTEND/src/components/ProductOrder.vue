<template>
  <div
    class="modal fade "
    :id="modalId"
    tabindex="-1"
    :aria-labelledby="'exampleModalLabel' + modalId"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Thông tin sản phẩm đã đặt</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div v-for="product in productOrder" :key="product._id" class="">
            <div class="row">
              <h5 style="text-align: start;">{{ product.name }}</h5>
              <div class="col-sm-6">
                <img
                  :src="`/public/img/products/${product.imageData}`"
                  alt=""
                  width="150"
                  height="150"
                />

              </div>
              <div class="col-sm-6 ">
                <p>Số Lượng Đã Đặt: {{ product.quantity }}</p>
                <p>Đơn Giá: {{ product.price }}</p>

              </div>
            </div>

          </div>
        </div>
        <!-- <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ListOrderProduct',
  props: ['orderDetail', 'modalId'],
  data() {
    return {
      productOrder: []
    }
  },
  mounted() {
    this.fetchProductOrders()
  },
  methods: {
    fetchProductOrders() {
      for (const detail of this.orderDetail) {
        console.log(detail)
        axios.get(`http://localhost:3000/order/product/${detail.idProduct}`).then((response) => {
          const productWithPrice = { ...response.data, price: detail.priceAll, quantity: detail.quantityProduct }
          this.productOrder.push(productWithPrice)
          // console.log(response.data);
        })
      }
      // console.log(this.orderDetail)
    }
  }
}
</script>
