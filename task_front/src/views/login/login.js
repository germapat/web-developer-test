import { mapState, mapActions } from 'vuex'
import i18n from '../../i18n/index'

export default {
  data () {
    return {
      valid: false,
      email: '',
      password: '',
      rules: {
        required: value => !!value || i18n.t('field-required'),
        emailRules: value => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || i18n.t('email-validate'),

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
        const { email, password } = this
        this.login({ email, password })
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
