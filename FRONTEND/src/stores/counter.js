import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state() {
    return {
      cartQuantity: 0
    };
  },
  actions: {
    incrementCartQuantity() {
      this.cartQuantity++;
    },
   
  }
});