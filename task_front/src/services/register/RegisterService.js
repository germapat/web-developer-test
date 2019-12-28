import ApiService from "../ApiService";

const registerService = {

  create(items) {
    return ApiService.post(`users/`, items);

  },
  confirm(code, identification){
    return ApiService.get(`users/confirm-registration?code=${code}&identificationType=${identification}`);
  }
}

export default registerService;
