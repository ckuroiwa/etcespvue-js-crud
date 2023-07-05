import axios from "axios";


const mainAxios = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
      "Content-type": "application/json"
    }
});

/*const graphqlAxios = axios.create({
    baseURL: 'http://localhost:8180/',
    headers: {
      "Content-type": "application/json"
    }
});*/

export {
  mainAxios/*,
  graphqlAxios,*/
};
