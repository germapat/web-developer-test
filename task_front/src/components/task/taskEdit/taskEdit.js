import i18n from '../../../i18n/index'
import taskService from '../../../services/task/TaskService'

export default {
    data: () => ({
        min: '',
        valid: false,
        name: '',
        priority: '',
        _id: '',
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
        showDialog(show, data) {
            this.dialog = show
            this.name = data.name
            this.priority = data.priority
            const date = new Date(data.expirationDate)
            this.expirationDate = date.getFullYear() + '-'  + (date.getUTCMonth() + 1)  + '-' + date.getDate()
            this._id = data._id
            const now = new Date()
            this.min = now.getFullYear() + '-'  + (now.getUTCMonth() + 1)  + '-' + now.getDate()
            

        },
        clearForm(){
            this.priority = ''
            this.name = ''
            this.expirationDate = ''

        },
        submit() {
            if (this.$refs.form.validate()) {
                const { expirationDate, priority, name, owner, _id } = this
                taskService.updateStatus({ expirationDate, priority, name, owner, _id})
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