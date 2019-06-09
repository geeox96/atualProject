<template>
  <v-dialog v-model="caixaEditarUsuario" flex max-width="800px">
    <v-icon color="#023788" medium class="mt-2" slot="activator">build</v-icon>

    <v-card>
      <v-card-title>
        <v-spacer></v-spacer>

        <span class="headline">Editar Usuario</span>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="fechar">Cencelar</v-btn>
        <v-btn @click="criar">Criar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  nome: "ComponenteEditarUsuario",
  data() {
    return {
      caixaEditarUsuario: false
    };
  },

  props: {},

  methods: {
    fechar() {
      this.caixaEditarUsuario = false;
      this.$emit("notificar('contaCriada')");
    },

    editarUsuario() {
      Vue.axios
        .post(apiUrl + "usuario", {
          nome: this.dadosUsuario.nome,
          email: this.dadosUsuario.email,
          senha: this.dadosUsuario.senha
        })
        .then(response => {
          this.notificar("contaCriada");
        });
    },

    

  }
};
</script>

<style>
</style>
