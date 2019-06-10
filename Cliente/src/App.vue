<template>
 <div id="app">
  <v-app id="inspire" light>
    <v-navigation-drawer
      clipped
      fixed
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-tile @click="navigateTo('usuario')">
          <v-list-tile-action>
            <v-icon >fa-users</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            Usuarios
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="('movimentacao')">
          <v-list-tile-action>
            <v-icon>fa-money</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            Movimentação
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Painel</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <v-flex shrink>
          <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer app fixed>
      <span>Teste Geovânio Carnelosso =D </span>
      <v-spacer></v-spacer>
      <span> &copy;2019 </span>
    </v-footer>
  </v-app>
</div>
</template>

<script>
export default {
  data() {
    return {
      drawer: true
    }
  },
  methods: {
    navigateTo(go){
      this.$router.push({name: go})
    }
  },
}
</script>