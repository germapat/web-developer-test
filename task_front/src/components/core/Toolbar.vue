<template>
  <v-toolbar id="core-toolbar" flat prominent style="background: #eee;">
    <v-spacer/>
    <v-toolbar-items>
      <v-flex align-center layout py-2>
        <div class="v-toolbar-title">
          <v-toolbar-title class="primary--text font-weight-light">
            <v-btn color="primary" class="v-btn--simple" dark icon @click.stop="onClickBtn">
              <v-icon>mdi-view-list</v-icon>
            </v-btn>
          </v-toolbar-title>
        </div>
        <v-menu bottom left content-class="dropdown-menu" offset-y transition="slide-y-transition">
          <template v-ripple slot="activator" class="toolbar-items" to="#">
            <v-badge color="error" overlap>
              <template slot="badge">{{ notifications.length }}</template>
              <v-icon color="primary">mdi-bell</v-icon>
            </v-badge>
          </template>
          <v-card>
            <v-list dense>
              <v-list-tile
                v-for="notification in notifications"
                :key="notification.id"
                @click="onClick"
              >
                <v-list-tile-title
                  v-text="'Tarea por vencer: ' + notification.name"
                />
              </v-list-tile>
            </v-list>
          </v-card>
        </v-menu>

        <v-menu bottom left content-class="dropdown-menu" offset-y
        transition="slide-y-transition">
          <template v-slot:activator="{ on }">
            <v-btn dark icon v-on="on">
              <v-icon color="primary">mdi-account</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-list dense>
              <v-list-tile @click="goOut">
                <v-list-tile-title>{{ $t('logout') }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-menu>
      </v-flex>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import { StorageService } from '../../services/StorageService.js'
import taskService from '../../services/task/TaskService'

export default {
  data: () => ({
    notifications: [],
    title: null,
    responsive: false,
    responsiveInput: false
  }),

  watch: {
    $route (val) {
      this.title = val.name
    }
  },

  mounted () {
    this.getTaskOvercome();
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResponsiveInverted)
  },

  methods: {
    getTaskOvercome(){
      const user = JSON.parse(localStorage.getItem("user"));
      taskService.getTaskOvercome(user.id)
      .then(resp=>{
        this.notifications = resp.data
      })
      .catch(error=>{})
    },
    ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
    ...mapActions('auth', ['logout']),
    onClickBtn () {
      this.setDrawer(!this.$store.state.app.drawer)
    },
    onClick () {
      //
    },
    onResponsiveInverted () {
      if (window.innerWidth < 991) {
        this.responsive = true
        this.responsiveInput = false
      } else {
        this.responsive = false
        this.responsiveInput = true
      }
    },
    goOut () {
      this.logout().then(() => {
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style>
#core-toolbar a {
  text-decoration: none;
}
</style>
