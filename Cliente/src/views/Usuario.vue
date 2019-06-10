<template>
  <v-app id="inspire">
    <v-layout row>
      <v-flex>
        <v-card>
          <v-alert
            dismissible
            :value="false"
            v-model="exibirNotificacao"
            type="success"
          >{{ msg.notificacao }}</v-alert>
          <v-toolbar color="#023788" dark>
            <v-toolbar-title>Usuarios</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-dialog v-model="caixaNovoUsuario" max-width="800px">
              <template v-slot:activator="{ on }">
                <v-icon v-on="on">add</v-icon>
              </template>
              <v-card>
                <v-card-title>
                  <v-spacer></v-spacer>

                  <span class="headline">Novo Usuario</span>
                  <v-spacer></v-spacer>
                </v-card-title>

                <v-form ref="form" v-model="validade" lazy-validation>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12>
                          <v-text-field
                            :rules="[validacao.obrigatorio]"
                            v-model="dadosUsuario.nome"
                            label="Nome Completo"
                            placeholder="João Mariano Freitas"
                          ></v-text-field>
                        </v-flex>

                        <v-flex xs12>
                          <v-text-field
                            :rules="[validacao.obrigatorio, validacao.email]"
                            v-model="dadosUsuario.email"
                            label="E-Mail"
                            placeholder="exemplo@servidor.com"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                          <v-text-field
                            :rules="[validacao.obrigatorio, validacao.min]"
                            :append-icon="mostrarSenha ? 'visibility' : 'visibility_off'"
                            :type="mostrarSenha ? 'text' : 'password'"
                            v-model="dadosUsuario.senha"
                            label="Senha"
                            @click:append="mostrarSenha = !mostrarSenha"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                          <v-text-field
                            :rules="[validacao.obrigatorio, validacao.min, validacao.senhaValidacao]"
                            :append-icon="mostrarSenha1 ? 'visibility' : 'visibility_off'"
                            :type="mostrarSenha1 ? 'text' : 'password'"
                            v-model="dadosUsuario.senhaConfirmacao"
                            label="Repita a senha"
                            @click:append="mostrarSenha1 = !mostrarSenha1"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-text>
                </v-form>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click="fechar">Cencelar</v-btn>
                  <v-btn :disabled="!validade" @click="criar">Criar</v-btn>
                  
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
          <v-data-table
            :headers="itens"
            :items="usuarios"
            class="elevation-5"
            ref="tableUsuarios"
          >
            <template v-slot:items="props">
              <td>{{ props.item.nome }}</td>
              <td class="text-right">{{ props.item.email }}</td>
              <td class="justify-center layout px-0">
                <editar-usuario 
                :uuid="props.item._id"
                :nomeUsuario="props.item.nome"
                 />
              </td>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
import { apiUrl } from "../config.js";
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import EditarUsuario from "../components/EditarUsuario";

export default {
  name: "Usuarios",
  data() {
    return {
      msg:{},
      mostrarSenha: false,
      mostrarSenha1: false,
      caixaNovoUsuario: false,
      exibirNotificacao: false,
      validade: false,
      usuarios: [],
      itens: [
        { text: "Nome", value: "nome" },
        { text: "E-mail", value: "email" },
        { text: "Opções", value: "name", sortable: false }
      ],
      dadosUsuario: {
        _id: "",
        nome: "",
        email: "",
        senha: "",
        senhaConfirmacao: ""
      },
      dadosLimpo: {
        nome: "",
        email: "",
        senha: "",
        senhaConfirmacao: ""
      },
      validacao: {
        obrigatorio: value => !!value || "Campo Obrigatorio",
        min: value => value.length >= 6 || "Campo deve ter no minimo 6 digitos",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "E-mail Invalido";
        },
        senhaValidacao: value =>
          value == this.dadosUsuario.senha || "As senhas não coincidem"
      }
    };
  },

  components: {
    EditarUsuario
  },

  methods: {
    obterUsuarios() {
      Vue.axios.get(apiUrl + "usuario").then(response => {
        this.usuarios = response.data;
      });
    },

    cadastrarUsuario() {
      Vue.axios
        .post(apiUrl + "usuario", {
          nome: this.dadosUsuario.nome,
          email: this.dadosUsuario.email,
          senha: this.dadosUsuario.senha
        })
        .then(response => {
          this.obterUsuarios()
        })
        .then(response => {
          this.notificar("contaCriada");
        });
    },

    fechar() {
      this.dadosUsuario = Object.assign({}, this.dadosLimpo);
      this.caixaNovoUsuario = false;
    },

    notificar(seletorDeNotificao) {
      if (seletorDeNotificao == "contaCriada") {
        this.msg.notificacao = "Conta criada com sucesso !!";
        this.exibirNotificacao = true;
        setTimeout(() => {
          this.exibirNotificacao = false;
        }, 5000);
      }
    },

    criar() {
      if (this.$refs.form.validate()) {
        this.cadastrarUsuario();
        this.dadosUsuario = Object.assign({}, this.dadosLimpo);
        this.fechar();
      }
    }
  },

  mounted() {
    this.obterUsuarios();
  }
};
</script>

<style>
</style>
