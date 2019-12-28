<template>
  <v-app>
    <router-view/>
  </v-app>
</template>

<script>
import offline from 'v-offline'

export default {
  components: {
    offline
  },
  data () {
    return {
      firstTime: true
    }
  },
  methods: {
    handleConnectivityChange (status) {
      let message = 'Sin conexión 🙁'
      let type = 'error'
      if (status) {
        message = 'Conectado! 😃'
        type = 'success'
      }

      if (!this.firstTime) {
        this.$notify({
          group: 'app',
          type: type,
          text: message
        })
      }
      this.firstTime = false
    }
  }
}
</script>

<style lang='scss'>
@import '@/styles/index.scss';

/* Remove in 1.2 */
.v-datatable thead th.column.sortable i {
  vertical-align: unset
}

.v-menu__content.theme--light div.v-picker__body.theme--light button {
  color: black !important
}

.container {
  padding: 0 24px
}
</style>
