import TaskShow from '../../../components/task/TaskShow/TaskShow.vue'
import TaskCreate from '../../../components/task/taskCreate/TaskCreate.vue'
import TaskEdit from '../../../components/task/taskEdit/TaskEdit.vue'
export default {
    components: {
        TaskShow,
        TaskCreate,
        TaskEdit
    },
    data: () => ({
        owner: String,
        status: false
    }),
    methods: {
        add(){
            const user = JSON.parse(localStorage.getItem("user"))
            this.owner = user.id
            this.$refs.TaskCreate.showDialog(true)
        },
        edit(data){
            const user = JSON.parse(localStorage.getItem("user"))
            this.owner = user.id
            this.$refs.TaskEdit.showDialog(true, data)
        },
        createSucess(){
            this.$refs.TaskShow.getTask()
        }
    }
}