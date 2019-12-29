<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{$t('task.update-task')}}</span>
        </v-card-title>
        <v-form ref="form" v-model="valid">
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md12>
                  <v-text-field v-model.trim="name" :label="$t('task.name')" :rules="[rules.required]"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md12>
                  <v-text-field v-model.trim="priority" :label="$t('task.priority')" :rules="[rules.required]"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md12>
                  <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                      :rules="[rules.required]"
                        v-model="expirationDate"
                        readonly
                        v-on="on"
                        :label="$t('task.expiration-date')"
                      ></v-text-field>
                    </template>
                    <v-date-picker :min="min"  color="primary" :rules="[rules.required]" v-model.trim="expirationDate" @input="menu = false"></v-date-picker>
                  </v-menu>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-form>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">{{$t('cancel')}}</v-btn>
          <v-btn color="blue darken-1" flat @click.native="submit">{{$t('update-button-label')}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script src="./taskEdit.js"></script>