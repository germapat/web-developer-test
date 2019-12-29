import ApiService from "../ApiService";

const taskService = {
  getTask(owner) {
    return ApiService.get(`tasks/all?owner=${owner}`);

  },
  create(data){
    return ApiService.post('tasks', data)
  },
  updateStatus(data){
    return ApiService.put(`tasks?_id=${data._id}`, data)
  },
  getTaskOvercome(owner){
    return ApiService.get(`tasks/overcome?owner=${owner}`)
  }

}

export default taskService;
