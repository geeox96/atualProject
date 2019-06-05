<template>
  <v-app id="inspire">
    <v-layout row>
      <v-flex >
        <v-card>
          <v-toolbar color="#023788" dark>
  
            <v-toolbar-title class="text-xs-center">Usuarios</v-toolbar-title>
  
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>search</v-icon>
            </v-btn v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>add</v-icon>
            </v-btn>
          </v-toolbar>
<v-data-table 
      :headers="itens"
      :items="usuarios"
      class="elevation-5"
      filter="String"
      v-dialog
    >
    <template v-slot:items="props">
        <td>{{ props.item.nome }}</td>
        <td class="text-right">{{ props.item.email }}</td>
      </template>
     </v-data-table>
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
      usuarios: [],
      itens: [
        {text: 'Nome', value: 'nome', sortable: false},
        {text: 'E-mail', value: 'email', sortable: false}
      ]
    };
  },
  methods: {
    obterUsuarios() {
      Vue.axios.get(apiUrl+'usuario').then(response => {
        this.usuarios = response.data;
        this.carregando = false;
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
