<template>
  <headerAdminVue></headerAdminVue>
  <hr>
  <main class="mt-3">
    <div v-for="(group, index) in groupedConnect" :key="index">
      <table class="table  table-bordered align-middle text-center">
        <thead class="text-center table-dark">
          <tr>
            <th colspan="6" class="table-date">{{ formatDate(group.date) }}</th>
  
          </tr>
  
        </thead>
        <thead class="table-secondary">
          <tr>
            <th>STT</th>
            <th scope="col" >Tên khách hàng</th>
            <th scope="col" >Số điện thoại</th>
            <th scope="col" >Comment</th>
            <th scope="col" >Images</th>
            <th scope="col" >Ngày comment</th>
          </tr>
        </thead>
        <tbody>
            
          <tr v-for="(userConnect,index) in group.connects" :key="userConnect._id">
            <td>{{ index+1 }}</td>
            <td scope="row">{{ userConnect.userName }}</td>
            <td>{{ userConnect.phoneUser }}</td>
            <td>{{ userConnect.comment }}</td>
            <td>
              <div v-if="userConnect.image == 'Không có ảnh được gửi lên'" class="">
                <p>Không có ảnh</p>
              </div>
              <div v-else class="">
                <div v-for="image in userConnect.image" :key="image._id">
                  <img
                    v-for="img in image"
                    :src="'/img/Comment/' + img"
                    :key="img"
                    class="image-comment mx-2"
                  />
                </div>
              </div>
            </td>
            <td>
              {{ userConnect.dayComment }}
            </td>
          </tr>
        </tbody>
      </table>
      <hr  v-if="index !== groupedConnect.length - 1" />
    </div>

  </main>
</template>

<script>
import headerAdminVue from '../components/HeaderAdmin.vue'

import axios from 'axios'
export default {
  data() {
    return {
      connect: [],
      groupedConnect: []
    }
  },
  components: {
    headerAdminVue
  },
  created() {
    this.getAllConnect()
    this.getOrder5s()
  },
  methods: {
    async getAllConnect() {
      await axios.get('http://localhost:3000/connect/show').then((response) => {
        this.connect = response.data
        .sort((a, b) => {
          if (a.dayComment > b.dayComment) {
            return -1
          } else if (a.dayComment < b.dayComment) {
            return 1
          }
          return 0
        })
        console.log(response.data)
      })
    },
    async getOrder5s() {
      while (true) {
        await this.getAllConnect()
        await this.groupByConnect()
        await new Promise((resolve) => setTimeout(resolve, 5000)) // Chờ 5 giây trước khi gọi lại fetchOrders
      }
    },
    async groupByConnect() {
      const groupedConnect = {}

      this.connect.forEach((userConnect) => {
        const connectDateParts = userConnect.dayComment.split('-') // lay phan tu - trong chuoi
        const day = parseInt(connectDateParts[0], 10)
        const month = parseInt(connectDateParts[1], 10) - 1 // tháng tu 0-11;
        const year = parseInt(connectDateParts[2], 10)

        const connectDate = new Date(year, month, day)

        const key = connectDate.toISOString() // Sử dụng định dạng chuẩn của ngày tháng để làm khóa

        console.log(connectDate)
        if (groupedConnect.hasOwnProperty(key)) {
          //hasOwnProperty kiểm tra thuộc tinh có ồn tại trog đối tượng đó hay không
          // Nếu đã tồn tại nhóm cho ngày này, thêm "connect" vào mảng connects của nhóm
          groupedConnect[key].connects.push(userConnect)
        } else {
          // Nếu chưa tồn tại nhóm cho ngày này, tạo một nhóm mới và thêm "connect" vào mảng connects
          groupedConnect[key] = {
            date: connectDate,
            connects: [userConnect]
          }
        }
      })
      // Chuyển đổi object thành mảng các nhóm
      this.groupedConnect = Object.values(groupedConnect).sort((a, b) => {
        if (a.date > b.date) {
          return -1 // Sắp xếp a trước b
        } else if (a.date < b.date) {
          return 1 // Sắp xếp a sau b
        }
        return 0 // Không thay đổi vị trí
      })
    },
    formatDate(date) {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear().toString();
      return `${day}-${month}-${year}`;
    }
  

  }
}
</script>

<style>
.image-comment {
  width: 100px;
  height: 150px;
}
</style>
