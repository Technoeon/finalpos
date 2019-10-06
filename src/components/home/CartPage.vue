<template>
  <div>
    <v-card height="360">
      <p><b>Orders</b></p>
      <v-card
        outlined
        height="280"
        value="1150"
        class="tvalue"
      >
      <v-divider></v-divider>
      <table>
        <tr>
          <th>Name</th>
          <th>Quantity</th>
          <th>Unit Price</th>
          <th>Price</th>
        </tr>
        <v-slide-y-transition class="py-0" group tag="tbody">
          <tr v-for="cartItem in shoppingCart" :key="cartItem.id" :class="{'trt': cartItem.selected}" @click="cartSelect(cartItem.id)">
            <td>{{cartItem.name}}</td>
            <td>{{cartItem.qty}}</td>
            <!-- <td v-else>{{cartItem.qty}}</td> -->
            <td>{{cartItem.price}}</td>
            <td>{{cartItem.subprice}}</td>
            <!-- <td v-else>{{cartItem.price}}</td> -->
          </tr>
        </v-slide-y-transition>
      </table>
      </v-card>
      <h3 v-if="shoppingCart.length > 0" class="flexy2"> Total: {{subTotal}}.00 + Vat ({{vat}}.00) = {{total}}.00 </h3>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['shoppingCart', 'subTotal', 'vat', 'total'])
  },
  methods: {
    cartSelect (id) {
      this.$store.dispatch('selectCart', id)
    },
    setSelectedItemZero () {
      this.$store.dispatch('setItemZero')
    }
  }
}
</script>

<style scoped>
.size {
   width:50;
   height:90;
 }
 .v-card--reveal {
   align-items: center;
   justify-content: center;
   opacity: 0.5;
   width: 100%;
 }
 .v-card h3.display-1 {
   font-size: 24px !important
 }
 .tvalue {
   font-size: 22px;
   size: 30px;
 }
 .flexy {
   float: right;
   margin-right: 20px;
 }
 .divid {
   margin-right: 20px;
 }
 table {
  font-size: 16px;
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

.trt {
  background-color: #dddddd;
}
.flexy2 {
  float: right;
  margin-right: 10px;
}
</style>