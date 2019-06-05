<template>
  <v-app id="inspire">
    <v-layout row>
      <v-flex >
        <v-card>
          <v-toolbar color="#023788" dark>
            <v-toolbar-side-icon></v-toolbar-side-icon>
  
            <v-toolbar-title class="text-xs-center">Usuarios</v-toolbar-title>
  
            <v-spacer></v-spacer>
  
            <v-btn icon>
              <v-icon>search</v-icon>
            </v-btn>
          </v-toolbar>
          <v-container v-layout align-center justify-space-around row fill-height>
            <v-subheader>Nome</v-subheader>
            <v-subheader>E-mail</v-subheader>
            <v-subheader>ID</v-subheader>
            <v-list-tile
              v-for="item in usuarios"
              :key="item.nome"
              avatar
              @click="editarUsuarioID(item.imdbID)"
            >
            
              <v-list>
                <v-list-title v-html="item.nome"></v-list-title>
                 <v-list-title v-html="item.email"></v-list-title>
              </v-list>
            </v-list-tile>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
import { apiUrl } from "../config.js";
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
 
Vue.use(VueAxios, axios)

export default {
  name: "Usuarios",
  data() {
    return {
      usuarios: []
    };
  },
  methods: {
    obterUsuarios() {
      Vue.axios.get(apiUrl+'usuario').then(response => {
        this.usuarios = response.data;
      });
    }
  },
    mounted() {
    this.obterUsuarios()
  }
};
</script>

<style>
</style>
