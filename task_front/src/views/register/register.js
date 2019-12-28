import i18n from '../../i18n/index'
import registerService from '../../services/register/RegisterService'

export default {
    data() {
        return {
            errorValidationField:[],
            emailExist: '',
            documentTypeOption: [
                { text: "Cédula ciudania", value: "CC" },
                { text: "Cédula extranjeria", value: "CI" },
            ],
            loading: false,
            valid: false,
            email: '',
            identification: '',
            password: '',
            name: '',
            identificationType: '',
            confirmPassword: '',
            rules: {
                required: value => !!value || i18n.t('field-required'),
                emailRules: value => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || i18n.t('email-validate'),
                confirmPassword: value => value==this.password || i18n.t('password-match')
            }
        }
    },
    mounted(){
        this.registerConfirm()
    },
    methods: {
        registerConfirm(){
            if(this.$route.query.code!='' && this.$route.query.identification!=''){
                registerService.confirm(this.$route.query.code, this.$route.query.identification)
                .then(resp=>{
                    this.$notify({
                        group: "app",
                        type: 'success',
                        text: 'Registro completado con éxito',
                        showDuration: 5000
                      });
                      this.$router.push('/login')
                })
                .catch(error=>{

                })
            }
        },
        submit() {
            if (this.$refs.form.validate()) {
                const { email, password, identificationType, name, identification } = this
                registerService.create({ email, password, identificationType, name, identification})
                    .then(user => {
                        this.$notify({
                            group: "app",
                            type: 'success',
                            text: 'Usuario registrado con exito, por favor revise el correo ingresado para continuar',
                            showDuration: 5000
                          });
                        this.$router.push('/login')
                    })
                    .catch(error => {
                        if (error.response.data.statusCode==400) {
                            this.errorValidationField = error.response.data.message
                        }else if(error.response.data.statusCode==409){
                            this.emailExist = error.response.data.message
                        }
                    })
            }
        }
    }
}
