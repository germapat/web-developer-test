import taskService from '../../../services/task/TaskService';
export default {
    data: () => ({
        headers: [
            {
              text: "Nombre",
              sortable: false,
              value: ""
            },
            {
              text: "Prioridad",
              sortable: false,
              value: ""
            },
            {
              text: "Facha de expiración",
              sortable: false,
              value: ""
            },
            {
              text: "Estado",
              sortable: false,
              value: ""
            },
            {
              text: "Acciones",
              sortable: false,
              value: ""
            }

          ],
      itemsData: []
    }),
    methods: {
        getTask(){
            const user = JSON.parse(localStorage.getItem("user"));
            taskService.getTask(user.id)
            .then(resp=>{
                this.itemsData = resp.data
            }).catch(error=>{

            })
        },
        edit(data){
          this.$emit("edit", data)
        },
        changeStatus(item){          
          taskService.updateStatus(item)
          .then(_=>{
            this.$notify({
              group: "app",
              type: 'success',
              text: 'Estado de la tarea actualizado con éxito',
              showDuration: 5000
              
            });
            this.$emit('createSucess')
          }).catch(error=>{
            this.$notify({
              group: "app",
              type: 'warning',
              text: 'Se presento un error intente de nuevo',
              showDuration: 5000              
            });
            this.$emit('createSucess')

          })
        }
        
    },
    mounted(){
        this.getTask()
    }
}