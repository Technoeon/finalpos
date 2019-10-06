<template>
  <v-app>
    <v-navigation-drawer 
      v-show="user"
      fixed
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      app
    >
    <v-img v-if="user" :aspect-ratio="16/9" src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
      <v-layout pa-2 column fill-height class="lightbox white--text">
        <div class="title">{{title}}</div>
        <v-spacer></v-spacer>
        <v-flex shrink>
          <v-layout>
            <v-flex xs3>
              <v-avatar slot="activator" size="56px">
                <!-- <img :src="user.photo" alt="Avatar"> -->
              </v-avatar>
            </v-flex>
            <v-flex class="py-1">
              <div class="subheading">{{ user.name }}</div>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-img>
      <v-list class="mt-1">
        <v-list-tile 
          value="true"
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" ripple @click="goForRouth(item.path)"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app :clipped-left="clipped"  v-show="user" color="primary">
      <v-toolbar-side-icon dark v-show="user" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title" class="white--text"></v-toolbar-title>
      <v-spacer v-if="user"></v-spacer>
      <v-menu
        origin="center center"
        transition="slide-y-transition"
        bottom
        :close-on-content-click="false"
        v-show="user"
        :nudge-width="5"
        :nudge-bottom="37"
        v-model="menu">
            <v-btn icon v-show="user" slot="activator" dark>
              <v-icon>more_vert</v-icon>
            </v-btn> 
            <v-list flat v-show="user">
              <v-list-tile>
                  <v-list-tile-title class="text-xs-right">Profile Settings</v-list-tile-title>
              </v-list-tile>
              <v-list-tile @click="onLogout">
                  <v-list-tile-title class="text-xs-right">
                      Logout &nbsp; <i class="fa fa-sign-out"></i>
                  </v-list-tile-title>
              </v-list-tile>
            </v-list>               
        </v-menu>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <router-view></router-view>
        </v-slide-y-transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        menu: false,
        clipped: false,
        drawer: false,
        fixed: true,
        items: [],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Cafe Gloria'
      }
    },
    computed: {
      ...mapGetters(['user'])
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout')
        console.log(this.$store.getters.user)
        this.$router.push('/')
        location.reload()
      },
      goForRouth (path) {
        this.$router.push(path)
      }
    }
  }
</script>
