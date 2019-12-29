import i18n from '../../../i18n/index'
import taskService from '../../../services/task/TaskService'

export default {
    data: () => ({
        valid: false,
        name: '',
        priority: '',
        dialog: false,
        menu: false,
        expirationDate: '',
        rules: {
            required: value => !!value || i18n.t('field-required')
        }
    }),
    props: {
        owner: ''
    },
    methods: {
        showDialog(show) {
            this.dialog = show
        },
        clearForm(){
            this.priority = ''
            this.name = ''
            this.expirationDate = ''

        },
        submit() {
            if (this.$refs.form.validate()) {
                const { expirationDate, priority, name, owner } = this
                taskService.create({ expirationDate, priority, name, owner})
                    .then(user => {
                        this.$notify({
                            group: "app",
                            type: 'success',
                            text: 'Tarea registrada con éxito',
                            showDuration: 5000
                          });
                          this.$emit('createSucess')
                          this.dialog = false
                          this.clearForm()
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