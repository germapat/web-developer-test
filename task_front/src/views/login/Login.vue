<template>
  <div id="app">
    <v-app id="inspire">
      <v-content>
        <v-container
          fluid
          fill-height>
          <v-layout
            align-center
            justify-center>
            <v-flex
              xs12
              sm8
              md4>
              <v-card class="elevation-12">
                <v-toolbar
                  dark
                  color="primary"/>
                <v-card-text>
                  <v-form
                    ref="form"
                    v-model="valid">
                    <v-text-field
                      v-model.trim="email"
                      :rules="[rules.emailRules]"
                      prepend-icon="mdi-account"
                      name="login"
                      label="Correo"
                      type="text"
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
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer/>
                  <v-btn
                    color="primary"
                    @click="$router.push('/register')">Registro</v-btn>
                  <v-btn
                    :loading="status.loggingIn"
                    color="success"
                    @click="submit">Ingresar</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script src="./login.js"></script>
