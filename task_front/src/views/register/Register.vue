<template>
  <div id="app">
    <v-app id="inspire">
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-toolbar dark color="primary" />
                <v-card-text>
                  <v-form ref="form" v-model="valid">
                    <v-text-field
                      v-model.trim="name"
                      :rules="[rules.required]"
                      prepend-icon="mdi-account"
                      name="login"
                      label="Nombre"
                      type="text"
                      @keyup.enter="submit"
                    />
                    <v-select
                      :rules="[rules.required]"
                      :items="documentTypeOption"
                      prepend-icon="mdi-account-card-details"
                      v-model.trim="identificationType"
                      label="Tipo Documento"
                    ></v-select>
                    <v-text-field
                      v-model.trim="identification"
                      :rules="[rules.required]"
                      prepend-icon="mdi-account-badge-outline"
                      name="identification"
                      label="Identificación"
                      type="text"
                      @keyup.enter="submit"
                    />
                    <v-text-field
                      v-model.trim="email"
                      :rules="[rules.emailRules]"
                      prepend-icon="mdi-email"
                      name="login"
                      label="Correo"
                      type="email"
                      @keyup.enter="submit"
                    />
                    <v-text-field
                      id="password"
                      v-model.trim="password"
                      :rules="[rules.required]"
                      prepend-icon="mdi-lock"
                      name="password"
                      label="Contraseña"
                      type="password"
                      @keyup.enter="submit"
                    />
                    <v-text-field
                      v-model.trim="confirmPassword"
                      :rules="[rules.confirmPassword]"
                      prepend-icon="mdi-lock"
                      name="password"
                      label="Confirmar contraseña"
                      type="password"
                      @keyup.enter="submit"
                    />
                      <div style="color:red;" v-for="(item, index) in errorValidationField" :key="index">
                        {{item.property}} : {{item.constraints.length}}
                      </div>
                      <div style="color:red;" v-if="emailExist">{{emailExist}}</div>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn :loading="loading" color="success" @click="submit">Guardar</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>
<script src='./register.js'></script>
<style src="./style.css">

</style>