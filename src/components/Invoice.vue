<template>
  <div id="Invoice">
    <v-layout column align-center>
      <div>
        <div class="pa-2 ml-5">
            <div class="mx-auto ml-5">
              <v-btn class="ml-12" @click="printData">
                <v-icon>print</v-icon>Print Receipt
              </v-btn>
            
              <v-btn class="mx-auto" dark to="/home">
                New Order
                <v-icon>chevron_right</v-icon>
              </v-btn>
            </div>
        </div>
        <!-- {{detailOrder}} -->

        <div style="width:50%;margin:0px auto; background: #f0facd; padding: 10px;" >
          <div id="printTable">
            <table 
              style="width:100%;">
              <tr>
                <th colspan="5" style="text-align:center">
                  {{new Date().toLocaleString()}}, Order No:{{detailOrder.orderNumber}}
                </th>
              </tr>
              <tr>
                <th colspan="5" style="text-align:center;"><h1>Cafe Gloria</h1></th>
              </tr>
              <tr>
                <th colspan="5" style="text-align:center">
                  13-14,Zoo Road,Mollik Tower,Mirpur-1,Dhaka-1216, Phone:9007719,9007742
                </th>
              </tr>
              <tr>
                <th colspan="5" style="text-align:center">
                  Email: cafegloriabd@gmail.com
                </th>
              </tr>
              <tr>
                <td>Sl</td>
                <td>Items Description</td>
                <td>Rate</td>
                <td>Qty</td>
                <td style="text-align:right">Amount (BDT.)</td>
              </tr>
              <tr v-for="(order, index) in detailOrder.orderItem" :key="order.id">
                <td >{{index + 1}}</td>
                <td >{{order.product_name}}</td>
                <td>{{order.unit_price}}</td>
                <td>{{order.qty}}</td>
                <td style="text-align:right">{{order.unit_price * order.qty}}</td>
              </tr>
              
              <tr>
                <td colspan="4" style="text-align:right">Subtotal : </td>
                <td style="text-align:right">{{detailOrder.subtotal}}</td>
              </tr>
              <tr>
                <td colspan="4" style="text-align:right">& Vat (15%) : </td>
                <td style="text-align:right">({{detailOrder.vat}})</td>
              </tr>
              <tr>
                <td colspan="4" style="text-align:right">Total : </td>
                <td style="text-align:right">{{detailOrder.total}}</td>
              </tr>
              <tr>
                <td colspan="4" style="text-align:right">
                  Cash(BDT) : 
                </td>
                <td style="text-align:right">
                  {{detailOrder.cash}}
                </td>
              </tr>
              <tr>
                <td colspan="4" style="text-align:right">
                  Change : 
                </td>
                <td style="text-align:right">
                  {{detailOrder.change}}
                </td>
              </tr>
              <tr>
                <td colspan="5">
                  Price are inclusive of 15% VAT Expacted items
                </td>
              </tr>
            </table>
            <div style="page-break-before: always"></div>
            <p style="margin:10px 0px;">Kitchen Items:</p>
            <span v-for=" ki in detailOrder.kitchenItem" :key="ki.index">Item : {{ki.name}}, Qty : {{ki.qty}} <br></span>
            <div style="page-break-before: always"></div>
          </div>
          <!-- <iframe name="print_frame" width="0" height="0" frameborder="1" src="about:blank"></iframe> -->
        </div>
      </div>
    </v-layout>
  </div>
</template>

<script>
import { Printd } from 'printd'
import axios from 'axios'
import { mapGetters } from 'vuex'
const d = new Printd()
const cssText = `.crd { color:red; }`
export default {
  created () {
    this.fetchOrder(this.$route.params.id)
  },
  data: () => ({
    detailOrder: null,
    cssText: `.crd { color:red; }`
  }),
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    printData () {
      d.print(document.getElementById('printTable'), [cssText])
    },
    fetchOrder (id) {
      let proUrl = 'http://localhost/pos/api/order/' + id
      let userData = this.user
      let headerConfigProduct = {
        headers: {
          'x-api-key': '123456',
          'Authorization': userData.token
        }
      }
      axios.get(proUrl, headerConfigProduct)
        .then(res => {
          this.detailOrder = res.data.data
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
