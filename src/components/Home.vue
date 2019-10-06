<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout row align-left>
        <v-flex xs12 md4>
          <cartpage></cartpage>
          <v-card class="pa-2">
            <v-container>
              <div>
                <v-btn outlined color="white" large @click="numb = numb + '1'">1</v-btn>
                <v-btn outlined color="white" large @click="numb = numb + '2'">2</v-btn>
                <v-btn outlined color="white" large @click="numb = numb + '3'">3</v-btn>
              </div>
              <div class="size">
                <v-btn outlined color="white" large @click="numb = numb + '4'">4</v-btn>
                <v-btn outlined color="white" large @click="numb = numb + '5'">5</v-btn>
                <v-btn outlined color="white" large @click="numb = numb + '6'">6</v-btn>
              </div>
              <div class="size">
                <v-btn outlined color="white" large @click="numb = numb + '7'">7</v-btn>
                <v-btn outlined color="white" large @click="numb = numb + '8'">8</v-btn>
                <v-btn outlined color="white" large @click="numb = numb + '9'">9</v-btn>
              </div>
              <div class="size">
                <v-btn outlined color="white" large @click="setSelectedItemZero">C</v-btn>
                <v-btn outlined color="white" large @click="numb = numb + '0'">0</v-btn>
                <v-btn outlined color="white" large to="/checkout"><v-icon>chevron_right</v-icon></v-btn>
              </div>
            </v-container>
          </v-card>
        </v-flex>
        <v-flex xs12 md8>
          <productpage></productpage>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
import productpage from './home/Productpage'
import cartpage from './home/CartPage'
export default {
  created () {
    window.addEventListener('keyup', this.getFromKeyBoard)
  },
  components: { productpage, cartpage },
  data () {
    return {
      numb: ''
    }
  },
  computed: {
    ...mapGetters(['shoppingCart', 'subTotal', 'vat', 'total', 'getSelectedID'])
  },
  watch: {
    numb (val) {
      if (val !== '') {
        let qty = parseInt(val)
        this.$store.dispatch('updateCartQuantity', qty)
      }
    },
    getSelectedID (newVal) {
      if (newVal !== undefined && newVal !== null) {
        this.numb = ''
        console.log(newVal + ' new')
      }
      console.log(newVal + ' new')
    }
  },
  methods: {
    getFromKeyBoard (event) {
      var _key = (window.Event) ? event.which : event.keyCode
      if (_key > 95 && _key < 106) {
        this.numb += String.fromCharCode(event.keyCode - 48)
      } else if (_key > 46 && _key < 58) {
        this.numb += String.fromCharCode(event.keyCode)
      } else if ((_key === 8 || _key === 46) && this.numb.length > 0) {
        this.removeNumb()
      } else if (_key === 13 && this.total > 1) {
        this.$router.push('/checkout')
      } else {
        console.log('invalid action')
      }
    },
    removeNumb () {
      this.numb = this.numb.substring(0, this.numb.length - 1)
    },
    setSelectedItemZero () {
      this.$store.dispatch('setItemZero')
    }
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
