<template>
  <div v-if="currentCliente" class="edit-form">
    <h4>Cliente</h4>
    <p v-if="errors.length">
    <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
    <ul>
      <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
    </ul>
    </p>
    <form>
      <div class="form-group">
        <label for="id">Id</label>
        <input type="text" class="form-control" id="id"
          v-model="currentCliente.id"
        />
      </div>
      <div class="form-group">
        <label for="nome">Nome</label>
        <input type="text" class="form-control" id="nome"
          v-model="currentCliente.nome"
        />
      </div>
      <div class="form-group">
        <label for="nome">CpfCnpj</label>
        <input type="text" class="form-control" id="cpfCpnj"
          v-model="currentCliente.cpfCpnj"
        />
      </div>
      <div class="form-group">
        <label for="nome">Data Nascimento</label>
        <input type="date" class="form-control" id="dataNascimento"
          v-model="currentCliente.dataNascimento" 
        />
      </div>
      <div class="form-group">
        <label for="nome">Email</label>
        <input type="text" class="form-control" id="email"
          v-model="currentCliente.email"
        />
      </div>
      <div class="form-group">
        <label for="nome">Telefone</label>
        <input type="text" class="form-control" id="telefone"
          v-model="currentCliente.telefone" v-mask="'(##) #####-####'"
        />
      </div>
      <div class="form-group">
        <label for="nome">Tipo Logradouro</label>
        <input type="text" class="form-control" id="tipoLogradouro"
          v-model="currentCliente.tipoLogradouro"
        />
      </div>
      <div class="form-group">
        <label for="nome">Logradouro</label>
        <input type="text" class="form-control" id="logradouro"
          v-model="currentCliente.logradouro"
        />
      </div>
      <div class="form-group">
        <label for="nome">Número</label>
        <input type="text" class="form-control" id="numero"
          v-model="currentCliente.numero"
        />
      </div>
      <div class="form-group">
        <label for="nome">Complemento</label>
        <input type="text" class="form-control" id="complemento"
          v-model="currentCliente.complemento"
        />
      </div>
      <div class="form-group">
        <label for="nome">Cidade</label>
        <input type="text" class="form-control" id="cidade"
          v-model="currentCliente.cidade"
        />
      </div>
      <div class="form-group">
        <label for="nome">Estado</label>
        <input type="text" class="form-control" id="estado"
          v-model="currentCliente.estado" 
        />
      </div>
      <div class="form-group">
        <label for="nome">Cep</label>
        <input type="text" class="form-control" id="cep"
          v-model="currentCliente.cep" v-mask="'#####-###'"
        />
      </div>

    </form>

    <button class="badge badge-danger mr-2"
      @click="deleteCliente"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateCliente"
    >
      Update
    </button>
    <br>
    <router-link to="/cliente">Voltar</router-link>

    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Favor clicar em um Cliente.</p>
  </div>
</template>

<script>
import EtcespDataService from "../../services/EtcespDataService";
//import { useVuelidate } from '@vuelidate/core';
//import { required } from '@vuelidate/validators';


export default {
  name: "Cliente",
  //setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      errors: [],
      currentCliente: null,
      message: ''
    };
  },
  
  //validations () {
  //  return {
  //    currentCliente: { required },
  //  }
  //},
  methods: {

/*    checkForm: function (e) {
      this.errors = [];

      if (this.currentCliente.name=="") {
        this.errors.push('O nome é obrigatório.');
      }
      if (this.currentCliente.email=="") {
        this.errors.push('O e-mail é obrigatório.');
      } else if (!this.validEmail(this.currentCliente.email)) {
        this.errors.push('Utilize um e-mail válido.');
      }

      if (this.errors.length>0) {
        return true;
      }

      e.preventDefault();
      return false;
    },*/

    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },

    getCliente(id) {
      EtcespDataService.getCliente(id)
        .then(response => {
          this.currentCliente = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateCliente() {
      //if (this.checkForm()==false) return;
      EtcespDataService.updateCliente(this.currentCliente.id, this.currentCliente)
        .then(response => {
          console.log(response.data);
          this.message = 'Cliente atualizado com sucesso!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteCliente() {
      EtcespDataService.deleteCliente(this.currentCliente.id)
        .then(response => {
          console.log(response.data);
          this.message = 'Cliente excluído com sucesso!';
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getCliente(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>