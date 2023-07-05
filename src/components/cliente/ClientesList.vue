<template>
   <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Procura por ID"
           v-model="idS"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchId"
          >
            Pesquisar
          </button>
        </div>
      </div>
    </div>

    <div class="col-md-6">
      <h5>Lista de Clientes ( id - Nome)</h5>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(cliente, index) in clientes" :key="index" @click="setActiveCliente(cliente, index)"
        >
        {{ cliente.id }} - {{ cliente.nome }}
        </li>
      </ul>
    </div>

    <div class="col-md-6">
      <div v-if="currentCliente">
        <h4>Cliente</h4>
        <div>
          <label><strong>id:</strong></label> {{ currentCliente.id }}
        </div>
        <div>
          <label><strong>Nome:</strong></label> {{ currentCliente.nome }}
        </div>
        <div>
          <label><strong>Cpf/Cnpj:</strong></label> {{ currentCliente.cpfCpnj }}
        </div>
        <div>
          <label><strong>Data Nascimento:</strong></label> {{ currentCliente.dataNascimento }}
        </div>
        <div>
          <label><strong>Email:</strong></label> {{ currentCliente.email }}
        </div>
        <div>
          <label><strong>Telefone:</strong></label> {{ currentCliente.telefone }}
        </div>
        <div>
          <label><strong>Tipo Logradouro:</strong></label> {{ currentCliente.tipoLogradouro }}
        </div>
        <div>
          <label><strong>Logradouro:</strong></label> {{ currentCliente.logradouro }}
        </div>
        <div>
          <label><strong>Número:</strong></label> {{ currentCliente.numero }}
        </div>
        <div>
          <label><strong>Complemento:</strong></label> {{ currentCliente.complemento }}
        </div>
        <div>
          <label><strong>Cidade:</strong></label> {{ currentCliente.cidade }}
        </div>
        <div>
          <label><strong>Estado:</strong></label> {{ currentCliente.estado }}
        </div>
        <div>
          <label><strong>Cep:</strong></label> {{ currentCliente.cep }}
        </div>
        <router-link :to="'/cliente/buscaCliente/' + currentCliente.id" >Editar</router-link>
      </div>
      <div v-else>
        <br />
        <p>Favor clicar em um Cliente...</p>
      </div>
      <div>
        <li class="nav-item">
          <router-link :to="'/cliente/addCliente'">Novo Cliente</router-link> 
        </li>
       </div>
    </div>
  </div>

  
</template>

<script>
import EtcespDataService from "../../services/EtcespDataService";


export default {
  name: "clientes-list",

  data() {
    return {
      clientes: [],
      currentCliente: null,
      currentIndex: -1,
      idS: "",
      pag: [], 
      total: 0
    };
  },
  methods: {
    retrieveClientes() {
      EtcespDataService.getClienteAll()
        .then(response => {
          this.clientes = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveClientes();
      this.currentCliente = null;
      this.currentIndex = -1;
    },

    setActiveCliente(cliente, index) {
      this.currentCliente = cliente;
      this.currentIndex = index;
    },

    searchId() {
      EtcespDataService.getCliente(this.idS)
        .then(response => {
          this.clientes= [];
          this.clientes.push(response.data);
          this.setActiveCliente(response.data, 1);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveClientes();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>