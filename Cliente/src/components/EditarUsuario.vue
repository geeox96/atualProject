<template>
  <v-dialog ref="editarUser" v-model="CaixaEditarUsuario" max-width="800px">
    <v-card>
      <v-card-title>
        <v-spacer></v-spacer>

        <span class="headline">Editar Usuario</span>
        <v-spacer></v-spacer>
      </v-card-title>

      <!-- <v-form ref="form" v-model="validade" lazy-validation>
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
      </v-card-actions> -->
    </v-card>
  </v-dialog>
</template>

<script>
import UsuariosHome from "../views/Usuario"

export default {
   nome:  'ComponenteEditarUsuario',
  data() {
    return {
        CaixaEditarUsuario: true,
    };
  },

  methods: {
      testeChamada(){
          console.log('TA AQUI NA PORRA DO EDITARUSUAIRO')
      }
  },

  mounted(){
      console.log('pegouEditarUsuario')
  }
};
</script>

<style>
</style>
