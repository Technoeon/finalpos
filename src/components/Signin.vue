<template>
  <div class="signin">
      <v-container>
    <v-layout row>
      <v-flex xs12 sm6>
        <!-- <app-alert @dismissed="onDismissed" :text="error.message"></app-alert> -->
      </v-flex>
    </v-layout>
    <v-layout column align-center>
      <v-flex xs12 sm4 offset-sm2>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="logIn"> 
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="Mail / Mobile No."
                      id="email"
                      type="email"
                      required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      type="password"
                      required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn type="submit" round color="primary" dark>Login</v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'signin',
  created () {
    if (this.$store.getters.user !== null) {
      this.$router.push('/home')
    }
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  watch: {
    user (value) {
      if (value) {
        this.$router.push('/home')
      }
    }
  },
  methods: {
    logIn (e) {
      const user = {
        user: e.target.email.value,
        password: e.target.password.value
      }
      this.$store.dispatch('signUserIn', user)
    }
  }
}
</script>

<style>
.google-icon {
  height: 18px;
  width: 18px;
  margin-right: 10px
}
.custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
