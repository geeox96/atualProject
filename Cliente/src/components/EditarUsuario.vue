<template>
  <v-dialog v-model="caixaEditarUsuario" flex max-width="550px">
    <v-icon color="#023788" medium class="mt-2" slot="activator">build</v-icon>
    <v-card>
      <v-toolbar color="#023788" dark>
        <v-spacer></v-spacer>
        <span class="headline">{{ nomeUsuario }}</span>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-container>
        <span class="title font-weight-light black--text">Editar nome</span>
        <v-divider></v-divider>
        <v-flex xs12 sm8>
          <v-text-field v-model="dadosUsuario.nome" placeholder="Novo nome"></v-text-field>
          <v-btn @click="editarNome(uuid)">Mudar Nome</v-btn>
        </v-flex>
      </v-container>
      <v-container>
        <span class="title font-weight-light black--text">Editar Senha</span>
        <v-divider></v-divider>
        <v-flex xs12 sm8>
          <v-text-field
            :rules="[validacao.obrigatorio, validacao.min]"
            :type="mostrarSenha ? 'text' : 'password'"
            :append-icon="mostrarSenha ? 'visibility' : 'visibility_off'"
            v-model="dadosUsuario.senhaAntiga"
            placeholder="Senha antiga"
            @click:append="mostrarSenha = !mostrarSenha"
          ></v-text-field>
          <v-text-field
            :rules="[validacao.obrigatorio, validacao.min]"
            :type="mostrarSenha1 ? 'text' : 'password'"
            :append-icon="mostrarSenha1 ? 'visibility' : 'visibility_off'"
            v-model="dadosUsuario.novaSenha"
            placeholder="Nova senha"
            @click:append="mostrarSenha1 = !mostrarSenha1"
          ></v-text-field>
          <v-text-field
            :rules="[validacao.obrigatorio, validacao.min, validacao.senhaValidacao]"
            :type="mostrarSenha2 ? 'text' : 'password'"
            :append-icon="mostrarSenha2 ? 'visibility' : 'visibility_off'"
            v-model="dadosUsuario.confirmacaoSenha"
            placeholder="Repita a nova senha"
            @click:append="mostrarSenha2 = !mostrarSenha2"
          ></v-text-field>
          <v-btn @click="confirmacaoExcluir">Mudar Senha</v-btn>
        </v-flex>
      </v-container>
      <v-card-actions>
        <v-btn @click="fechar">Pronto</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="red" dark @click="confirmacaoExcluir">Excluir</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { apiUrl } from "../config.js";
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import Swal from "sweetalert2";
import Usuario from "../views/Usuario.vue";
import UsuarioVue from '../views/Usuario.vue';

export default {
  nome: "ComponenteEditarUsuario",
  data() {
    return {
      mostrarSenha: false,
      mostrarSenha1: false,
      mostrarSenha2: false,
      caixaEditarUsuario: false,
      dadosUsuario: {
        nome: "",
        senhaAntiga: "",
        novaSenha: "",
        confirmacaoSenha: ""
      },
      validacao: {
        obrigatorio: value => !!value || "Campo Obrigatorio",
        min: value => value.length >= 6 || "Campo deve ter no minimo 6 digitos",
        senhaValidacao: value =>
          value == this.dadosUsuario.novaSenha || "As senhas não coincidem"
      }
    };
  },

  props: ["uuid", "nomeUsuario"],

  components: { Usuario },

  methods: {
    fechar() {
      UsuarioVue.$parent.refresh()
      this.caixaEditarUsuario = false;
    },

    editarNome(uuid) {
      Vue.axios.put(apiUrl + "usuario/" + uuid + "/nome", {
        nome: this.dadosUsuario.nome
      });
      this.fechar();
    },

    editarSenha(uuid) {
      Vue.axios.put(apiUrl + "usuario/" + uuid + "/senha", {
        senha: this.dadosUsuario.nome
      });
      this.fechar();
    },

    excluirUsuario(uuid) {
      Vue.axios.delete(apiUrl + "usuario/" + uuid);
      this.fechar();
    },

    confirmacaoExcluir() {
      Swal.fire({
        title: "Você desejá excluri este usuario ?",
        text: "isso irá apagar todas as movimentações feita por ele",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#FF0000",
        confirmButtonText: "Deletar",
        cancelButtonText: "Cancelar"
      }).then(result => {
        if (result.value) {
          this.excluirUsuario(this.uuid);
        }
      });
    }
  }
};
</script>

<style>
</style>
