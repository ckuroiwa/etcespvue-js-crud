import http from "../http-common";

class ClienteDataService {
  getAll() {
    return http.get("/");
  }

  get(id) {
    return http.get(`${id}`);
  }

  create(data) {
    return http.post("/add", data);
  }

  update(id, data) {
    return http.put(`/update/${id}`, data);
  }

  delete(id) {
    return http.delete(`/delete/${id}`);
  }

  deleteAll() {
    return http.delete(`/clientes`);
  }

  findById(id) {
    return http.get(`/${id}`);
  }
}

export default new ClienteDataService();
