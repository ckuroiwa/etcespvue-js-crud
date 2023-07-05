<template>
  
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Id</label>
        <input
          type="text"
          class="form-control"
          id="id"
          required
          v-model="cliente.id"
          name="id"
        />
      </div>

      <div class="form-group">
        <label for="description">Nome</label>
        <input
          class="form-control"
          id="nome"
          required
          v-model="cliente.nome"
          name="nome"
        />
      </div>

      <div class="form-group">
        <label for="description">Cpf/Cnpj</label>
        <input
          class="form-control"
          id="cpfCpnj"
          required
          v-model="cliente.cpfCpnj"
          name="cpfCpnj"
        />
      </div>

      <div class="form-group">
        <label for="description">Data Nascimento</label>
        <input
          type="date"
          class="form-control"
          id="dataNascimento"
          required
          v-model="cliente.dataNascimento"
          name="dataNascimento"
        />
      </div>

      <div class="form-group">
        <label for="description">Email</label>
        <input
          class="form-control"
          id="email"
          required
          v-model="cliente.email"
          name="email"
        />
      </div>

      <div class="form-group">
        <label for="description">Telefone</label>
        <input
          class="form-control"
          id="telefone"
          required
          v-model="cliente.telefone"
          name="telefone" v-mask="'(##) #####-####'"
        />
      </div>

      <div class="form-group">
        <label for="description">Tipo Logradouro</label>
        <input
          class="form-control"
          id="tipoLogradouro"
          required
          v-model="cliente.tipoLogradouro"
          name="tipoLogradouro"
        />
      </div>

      <div class="form-group">
        <label for="description">Logradouro</label>
        <input
          class="form-control"
          id="logradouro"
          required
          v-model="cliente.logradouro"
          name="logradouro"
        />
      </div>

      <div class="form-group">
        <label for="description">Número</label>
        <input
          class="form-control"
          id="numero"
          required
          v-model="cliente.numero"
          name="numero"
        />
      </div>

      <div class="form-group">
        <label for="description">Complemento</label>
        <input
          class="form-control"
          id="complemento"
          required
          v-model="cliente.complemento"
          name="complemento"
        />
      </div>

      <div class="form-group">
        <label for="description">Cidade</label>
        <input
          class="form-control"
          id="cidade"
          required
          v-model="cliente.cidade"
          name="cidade"
        />
      </div>

      <div class="form-group">
        <label for="description">Estado</label>
        <input
          class="form-control"
          id="estado"
          required
          v-model="cliente.estado"
          name="estado"
        />
      </div>

      <div class="form-group">
        <label for="description">Cep</label>
        <input
          class="form-control"
          id="cep"
          required
          v-model="cliente.cep"
          name="cep"
          v-mask="'#####-###'"
        />
      </div>

      <button @click="saveCliente" class="btn btn-success">Submit</button>

      <br>
      <router-link to="/clientes">Voltar</router-link>

    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
    </div>
  </div>
</template>

<script>
import ClienteDataService from "../../services/EtcespDataService";

export default {
  name: "add-cliente",
  errors: [],
  data() {
    return {
      cliente: {
        id: null,
        nome: "",
        cpfCpnj: "",
        dataNascimento: "",
        email: "",
        telefone: "",
        tipoLogradouro: "",
        logradouro: "",
        numero: "",
        complemento: "",
        cidade : "",
        estado: "",
        cep: ""
      },
      submitted: false
    };
  },
  methods: {
    saveCliente() {
      var data = {
        id: this.cliente.id,
        nome: this.cliente.nome,
        cpfCpnj: this.cliente.cpfCpnj,
        dataNascimento: this.cliente.dataNascimento,
        email: this.cliente.email,
        telefone: this.cliente.telefone,
        tipoLogradouro: this.cliente.tipoLogradouro,
        logradouro: this.cliente.logradouro,
        numero: this.cliente.numero,
        complemento: this.cliente.complemento,
        cidade: this.cliente.cidade,
        estado: this.cliente.estado,
        cep: this.cliente.cep
      };

      ClienteDataService.createCliente(data)
        .then(response => {
          this.cliente.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newCliente() {
      this.submitted = false;
      this.cliente = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
