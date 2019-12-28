import ApiService from "../ApiService";

const registerService = {

  create(items) {
    return ApiService.post(`users/`, items);

  }
}

export default registerService;
