<template>
  <div id="Checkout">
    <v-layout row align-center>
        <v-flex sm2>
          <v-btn large to="/home">
            <v-icon>chevron_left</v-icon>Back
          </v-btn>
        </v-flex>
        <v-flex sm8> <h2 align="center">Payment</h2></v-flex>
        <v-flex sm2>
          <v-btn large v-if="total<=tend" @click="postData" color="success">
            Validate
            <v-icon>chevron_right</v-icon>
          </v-btn>
        </v-flex>
    </v-layout>
    <v-layout row align-center text-center>
      <v-flex xs4>
        <div class="mt-5">
          <v-btn large color="grey">Cash(BDT)</v-btn>
        </div>
      </v-flex>
      <v-flex sx8>
        <table style="width:100%;">
          <tr>
            <td><h3 aligh="center">Due</h3></td>
            <td><h3 aligh="center">Tendered</h3></td>
            <td><h3 aligh="center">Change</h3></td>
            <td><h3 aligh="center">Method</h3></td>
          </tr>
          <tr class="mt-5 pa-5" style="background: forestgreen; height: 60px;">
            <td style="background: forestgreen;">
              <h2 aligh="center" class="pa-1" style="color: white; margin: 0px 10px;">{{total}}.00</h2>
            </td>
            <td><h1 class="pa-2" style="color: forestgreen; background: white; margin: 0px 10px;">{{tend}}.00</h1></td>
            <td><h2 class="pa-1" style="color: white; margin: 0px 10px;">{{parseInt(tend)-total}}</h2></td>
            <td><h2 class="pa-1" style="color: white; margin: 0px 10px;">(Cash)</h2></td>
          </tr>
          <tr v-if="parseInt(tend) > 0" style="height: 55px;">
            <td style="background: gray"><h2 style="color: white; margin: 0px 10px;"> {{total-parseInt(tend)}} </h2></td>
            <td colspan="3"></td>
          </tr>

        </table>
        <v-card class="calc" light>
            <v-container>
              <div>
                <v-btn outlined color="white" large @click="tend = tend + '1'">1</v-btn>
                <v-btn outlined color="white" large @click="tend = tend +'2'">2</v-btn>
                <v-btn outlined color="white" large @click="tend = tend +'3'">3</v-btn>
                <v-btn outlined color="white" large @click="tend = parseInt(tend) + 10">+10</v-btn>
              </div>
              <div>
                <v-btn outlined color="white" large @click="tend = tend +'4'">4</v-btn>
                <v-btn outlined color="white" large @click="tend = tend +'5'">5</v-btn>
                <v-btn outlined color="white" large @click="tend = tend +'6'">6</v-btn>
                <v-btn outlined color="white" large @click="tend = parseInt(tend) + 20">+20</v-btn>
              </div>
              <div>
                <v-btn outlined color="white" large @click="tend = tend +'7'">7</v-btn>
                <v-btn outlined color="white" large @click="tend = tend +'8'">8</v-btn>
                <v-btn outlined color="white" large @click="tend = tend +'9'">9</v-btn>
                <v-btn outlined color="white" large @click="tend = parseInt(tend) + 50">+50</v-btn>
              </div>
              <div>
                <v-btn outlined color="white" large @click="tend = ''">C</v-btn>
                <v-btn outlined color="white" large @click="tend = tend +'0'">0</v-btn>
                <v-btn outlined color="white" large @click="tend = tend +'.'">.</v-btn>
                <v-btn outlined color="white" large @click="tend = tend.slice(0, -1)">
                  <v-icon>delete</v-icon>
                </v-btn>
              </div>
            </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
  created () {
    window.addEventListener('keyup', this.getFromKeyBoard)
  },
  data () {
    return {
      tend: ''
    }
  },
  computed: {
    ...mapGetters(['shoppingCart', 'subTotal', 'vat', 'total', 'user'])
  },
  methods: {
    getFromKeyBoard (event) {
      var _key = (window.Event) ? event.which : event.keyCode
      if (_key > 95 && _key < 106) {
        this.tend += String.fromCharCode(event.keyCode - 48)
      } else if (_key > 46 && _key < 58) {
        this.tend += String.fromCharCode(event.keyCode)
      } else if ((_key === 8 || _key === 46) && this.tend.length > 0) {
        this.removetend()
      }
    },
    removetend () {
      this.tend = this.tend.substring(0, this.tend.length - 1)
    },
    async postData () {
      let proUrl = 'http://localhost/pos/api/order'
      let userData = this.user
      let headerConfig = {
        headers: {
          'x-api-key': '123456',
          'Authorization': userData.token
        }
      }
      let cart = this.shoppingCart.map(sp => {
        return {
          id: sp.id,
          name: sp.name,
          qty: sp.qty
        }
      })
      let orderDetails = {
        total: this.total,
        vat: this.vat,
        cash: this.tend,
        change: parseInt(this.tend) - this.total,
        cart: cart
      }
      await axios.post(proUrl, orderDetails, headerConfig)
        .then(res => {
          let orderId = res.data.data
          this.$store.dispatch('clearCart')
          this.$router.push('/invoice/' + orderId)
        })
        .catch(err => {
          alert(err)
        })
    }
  }
}
</script>

<style>

</style>
