import {mainAxios} from "../http-common";
//import {procAxios} from "../http-common";

class EtcespDataService {
  getClienteAll() {
    return mainAxios.get("/cliente");
  }

  getCliente(id) {
    return mainAxios.get(`/cliente/buscaCliente/${id}`);
  }

  createCliente(data) {
    return mainAxios.post("/cliente/add/", data);
  }

  updateCliente(id, data) {
    return mainAxios.put(`/cliente/update/${id}`, data);
  }

  deleteCliente(id) {
    return mainAxios.delete(`/cliente/delete/${id}`);
  }

  deleteClienteAll() {
    return mainAxios.delete(`/cliente/`);
  }

  findClienteById(id) {
    return mainAxios.get('/cliente/'`/${id}`);
  }

  getProcessosPagination(params){
  const result = mainAxios.get('/processo/processosFilter/', {params});
  return result;
  }

  postProcessosPage(processo, data){
  const myJSON = JSON.stringify(processo);

  const headers = { "content-type": "application/json" };
  
  const paramsPag = {  "page": data.page, "size": data.size, "processo": myJSON};
  
  const   result = mainAxios({
    url: '/processo/listAllProcessosPage', 
    method: 'post',
    headers: headers,
    params: paramsPag

  });
  
    return result;
  } 

  getProcesso(numeroProcesso) {
    const result = mainAxios.get(`/processo/buscaProcesso/${numeroProcesso}`); 
    return result;
  }

  getTipoAcao() {
    const result = mainAxios.get(`/tipoAcao`); 
    return result;
  }

  getTipoAcaoListarRecursos() {
    const result = mainAxios.get(`/tipoAcao/listarRecursos`);
    return result;
  }

  getDominioLista(rvDomain) {
    const result = mainAxios.get(`/cgrefcodes/findDomain/${rvDomain}`); 
    return result;
  }

  getTipoAcaoGraphql() {
    const headers = { "content-type": "application/json" };
    const graphqlQuery = {
        "query": ` query { findAllTipoAcaoQL { codtipoacao descricao } }`,
        "variables": {}
    };

    const   result = mainAxios({
          url: '/graphql',
          method: 'post',
          headers: headers,
          data: graphqlQuery
        });
    return result;
  }

}

export default new EtcespDataService ();