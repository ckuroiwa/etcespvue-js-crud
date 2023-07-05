import Vue from "vue";
import Router from "vue-router";
import Header from './components/common/Header';

Vue.use(Router);

export default new Router({
  mode: "history",
  component: Header, 
  routes: [
    {
      path: "/cliente/addCliente",
      name: "addCliente",
      component: () => import("./components/cliente/AddCliente")
    },
    {
      path: "/cliente",
      name: "cliente",
      component: () => import("./components/cliente/ClientesList")
    },
    {
      path: "/cliente/buscaCliente/:id",
      name: "buscaCliente",
      component: () => import("./components/cliente/Cliente")
    },
    {
      path: "/processo/buscaProcesso/:id",
      name: "buscaProcesso",
      component: () => import("./components/processo/Processo")
    },
    {
      path: "/",
      alias: "/processo/processoFilter",
      name: "processoFilter",
      component: () => import("./components/processo/ProcessosList")
    },
    {
      path: "/processo/buscaProcessoCad",
      name: "buscaProcessoCad",
      component: () => import("./components/processo/ProcessoCad")
    },
    {
      path: "/processo/buscaProcessoEditor",
      name: "buscaProcessoEditor",
      component: () => import("./components/processo/ProcessoCkEditor")
    },
  ]
});