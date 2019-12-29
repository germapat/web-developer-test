<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout></v-layout>
    <v-layout>
      <v-flex>
        <material-card color="primary" :title="$t('task.task-show')">
          <v-layout>
            <v-flex>
              <v-btn @click="add()" color="success">{{$t('task.create-task')}}</v-btn>
            </v-flex>
          </v-layout>
          <v-flex>
            <TaskShow ref="TaskShow" @createSucess="createSucess" @edit="edit"/>
          </v-flex>
          <v-flex>
            <TaskCreate :owner="owner" ref="TaskCreate" @createSucess="createSucess"/>
            <TaskEdit :owner="owner"   ref="TaskEdit" @createSucess="createSucess" />
          </v-flex>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script src="./task.js"></script>
