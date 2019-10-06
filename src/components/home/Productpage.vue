<template>
    <v-tabs
      v-model="active"
      fixed-tabs
    >
      <v-tab
        v-for="n in products"
        :key="n.id"
        ripple
      >
        {{ n.title }}

      </v-tab>
      <v-tab-item
        v-for="n in products"
        :key="n.id"
      >
      <v-layout row wrap>
        <v-flex v-for="product in n.product" :key="product.id" xs12 sm6 md3>
          <v-card color="red" class="ma-1">
            <v-img
              class="white--text"
              height="150px"
              :src="product.img"
            >
              <v-container fill-height fluid>
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox>
                    <span class="headline">{{product.name}}</span>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-img>
            <v-card-title>
              <div>
                <span class="white--text">{{product.price}} TK.</span><br>
                <span class="white--text">{{product.name}}</span>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn large block color="orange" @click="addToCart(product)">Add to cart
                <v-icon dark x-large>shopping_cart</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
      </v-tab-item>
    </v-tabs>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      active: null
    }
  },
  computed: {
    ...mapGetters(['products'])
  },
  methods: {
    addToCart (prod) {
      let aproduct = {
        id: prod.id,
        name: prod.name,
        qty: parseInt(prod.qty),
        price: parseFloat(prod.price),
        vat: parseFloat(prod.vat_amount),
        subprice: parseFloat(prod.subprice),
        subvat: parseFloat(prod.subvat),
        selected: true
      }
      this.$store.dispatch('addToCart', aproduct)
    }
  }
}
</script>

<style>

</style>