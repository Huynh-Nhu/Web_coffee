import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from'../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import AdminView from '../views/AdminView.vue'
import AdminUserView from '../views/AdminUserView.vue'
import  CategoryView from '../views/CategoryView.vue'
import ListCategoryView from  '../views/ListCategoryView.vue'
import  AddProductView from '../views/AddProductView.vue'
import ShowProductView from '../views/ShowProductView.vue'
import EditProductView from '../views/EditProductView.vue'
import ProductView from '../views/ProductView.vue'
import DetailProduct from '../views/DetailProduct.vue'
import CartProduct from '../views/CartProduct.vue'
import ListOrderView  from '../views/ListOrderView.vue'
import  RegisterAdminView from '../views/RegisterAdminView.vue'
import NoteFoundView from  '../views/NoteFoundView.vue'
import OrderUserView from '../views/OrderUserView.vue'
import ConnectView from '../views/ConnectView.vue'
import AdminConnectView from '../views/AdminConnectView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:pathMatch(.*)*",
      name: "notfound",
      component: NoteFoundView
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },

    {
      path: '/admin',
      name: 'adminHome',
      component: AdminView
    },
    {
      
      path: '/caterogy',
      name: 'adminCaterogy',
      component: CategoryView
    },
   
    {
      path: '/listuser',
      name: 'adminUser',
      component: AdminUserView

    },
    {
      path: '/listCate',
      name: 'adminProducts',
      component: ListCategoryView


    },
    {
      path: '/listCate/:id',
      name: 'ShowProducts',
      component: ShowProductView


    },
    {
      path: '/listCate/:id/products',
      name: 'AddProducts',
      component: AddProductView


    },
    {
      path: '/editProduct/:id',
      name: 'EditProducts',
      component: EditProductView


    },
    {
      path: '/products',
      name: 'products',
      component: ProductView
      

    },
    {
      path: '/products/:id',
      name: 'DetailProduct',
      component: DetailProduct
      

    },
    {
      path: '/cart',
      name: 'cartProduct',
      component: CartProduct
      

    },

    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
   

  
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/registerAdmin',
      name: 'registerAdmin',
      component: RegisterAdminView
    },

    {
      path: '/listOrder',
      name: 'adminOrder',
      component: ListOrderView
    },
    {
      path:'/orderUser',
      name: 'OrderUser',
      component: OrderUserView
    },
    {
      path:'/connect',
      name: 'Connect',
      component:ConnectView
    },
    {
      path:'/adminConnect',
      name: 'AdminConnect',
      component:AdminConnectView
    },
  ]
})

export default router;
