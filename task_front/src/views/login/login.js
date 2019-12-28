import { mapState, mapActions } from 'vuex'
import i18n from '../../i18n/index'

export default {
  data () {
    return {
      valid: false,
      username: '',
      password: '',
      rules: {
        required: value => !!value || i18n.t('field-required')
      }
    }
  },
  computed: {
    ...mapState('auth', ['status'])
  },
  methods: {
    ...mapActions('auth', ['login']),
    submit () {
      if (this.$refs.form.validate()) {
        const { username, password } = this
        this.login({ username, password })
          .then(user => {
            this.$router.push('/')
          })
          .catch(error => {
            if (error && error.response) {
              this.$notify({
                group: 'app',
                type: 'error',
                text: 'Usuario y/o contraseña incorrectos!'
              })
            }
          })
      }
    }
  }
}
