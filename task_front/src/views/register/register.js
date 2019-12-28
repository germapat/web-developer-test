import i18n from '../../i18n/index'
import registerService from '../../services/register/RegisterService'

export default {
    data() {
        return {
            loading: false,
            valid: false,
            username: '',
            password: '',
            confirmPassword: '',
            rules: {
                required: value => !!value || i18n.t('field-required')
            }
        }
    },
    methods: {
        submit () {
            if (this.$refs.form.validate()) {
                const { username, password } = this
                registerService.create({ username, password })
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
