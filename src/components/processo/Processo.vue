<template>
  
  <div border>
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">  
      <!--<b-form class="needs-validation" novalidate>-->

      
          
      <b-form-group id="input-group-1" label="Número Processo:" label-for="input-numeroProcesso" description="" >
        <b-form-input
          id="input-numeroProcesso"
          v-model="currentProcesso.numeroProcesso"
          placeholder=""
          required
        ></b-form-input>
        
      </b-form-group>
      
     
      

      
      
        <b-form-group id="input-group-1" label="Número Processo Dependente:" label-for="input-numProcessoDependente" description="">
        <b-form-input
          id="input-numProcessoDependente"
          v-model="currentProcesso.numProcessoDependente"
          placeholder=""
        ></b-form-input>
      </b-form-group>
      

     
      
      <b-form-group id="input-group-1" label="Email address:" label-for="input-email" description="">
        <b-form-input
          id="input-email"
          v-model="currentProcesso.email"
          placeholder=""
        ></b-form-input>
      </b-form-group>
      
      

      
      
            
              <label for="lastName">Tipo Ação</label>
              <b-form-input type="text" class="form-control" id="tipoAcao" placeholder="tipo Ação" required v-model="currentProcesso.tipoAcao"></b-form-input>
            
     
              

      
              
            
              <label>Tipo de Ação</label>
              <select id="idTipoAcao" v-model="tipoAcaoSelected">
                 <option value="">Selecione o tipo de Ação</option>
                 <option v-for="tipoAcao in tipoAcaoList" 
                 :key="tipoAcao.codTipoAcao" 
                 :value="tipoAcao.codTipoAcao"                
                 >{{ tipoAcao.codTipoAcao }} - {{ tipoAcao.descricao }}</option>
               </select>
            

               

       <!--<div class="form-row">
        <div class="form-group col-md-6">
            <label for="inputName">Nome</label>
            <input type="text" id="inputName" class="form-control" placeholder="John" required>
        </div>
        <div class="form-group col-md-6">
            <label for="inputSurname">Sobrenome</label>
            <input type="text" class="form-control" id="inputSurname" placeholder="Doe" required>
        </div>
        <div class="form-group col-md-6">
            <label for="inputEmail4">Email</label>
            <input type="email" class="form-control" id="inputEmail4" placeholder="doejohnn@email.com" required>
        </div>
        <div class="form-group col-md-6">
            <label for="inputPassword4">Senha</label>
            <input type="password" class="form-control" id="inputPassword4" placeholder="123@abc" required>
        </div>
    </div>-->

      <!--<div id="opcionais-container" class="input-container">
        <label id="opcionais-title" for="opcionais">Selecione os opcionais:</label>
        <div class="checkbox-container" v-for="opcional in opcionaisdata" :key="opcional.id">
          <input type="checkbox" name="opcionais" v-model="opcionais" :value="opcional.tipo">
          <span>{{ opcional.tipo }}</span>
        </div>
      </div>
      <div class="input-container">
        <input class="submit-btn" type="submit" value="Atualizar">
      </div>-->

          <!--<button class="btn btn-primary btn-lg btn-block" type="submit">Pesquisar</button>
          <button @click="saveCliente" class="btn btn-success">Submit</button>-->
          
      <b-button href="/">Voltar</b-button>&nbsp;
      <!--<b-button>Atualizar</b-button>-->

      <b-button type="submit" variant="primary">Atualizar</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>

      <br>
                                       
    </b-form>
    </div>	  
  

  </template>
  
  <script>
  import EtcespDataService from "../../services/EtcespDataService";
  
  export default {
    name: "Processo",
    data() {
      return {
        tipoAcaoList: null,
        idTipoAcao:"", 
        processo : [],
        tipo: '',
        errors: [],
        currentProcesso: [],
        message: '',
        tipoAcaoSelected: {},
        show: true
      };
  },
    
    methods:{
      //async 
      getTipoAcao() {
      EtcespDataService.getTipoAcao()
          .then(response => {
            this.tipoAcaoList = response.data;
            
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },

      onSubmit(event) {
        event.preventDefault()
        alert(JSON.stringify(this.currentProcesso))
      },

      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.currentProcesso.numeroProcesso = ''
        this.currentProcesso.numProcessoDependente = ''
        this.currentProcesso.email = ''
        this.currentProcesso.tipoAcao = ''
        this.tipoAcaoSelected = {}
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
    
      saveCliente() {
        var data = {
        tipo: this.tipo,
        tipoInteressado: this.interessado        
        }
        console.log(data.tipoInteressado);
        console.log(data.tipo);
      },

      getProcesso(numeroProcesso) {
        EtcespDataService.getProcesso(numeroProcesso)
          .then(response => {
            this.currentProcesso = response.data;
            this.tipoAcaoSelected = this.currentProcesso.tipoAcao;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
  
      /*updateCliente() {
        //if (this.checkForm()==false) return;
        EtcespDataService.update(this.currentCliente.id, this.currentCliente)
          .then(response => {
            console.log(response.data);
            this.message = 'Cliente atualizado com sucesso!';
          })
          .catch(e => {
            console.log(e);
          });
      },
      
      deleteCliente() {
        EtcespDataService.delete(this.currentProcesso.numeroProcesso)
          .then(response => {
            console.log(response.data);
            this.message = 'Processo excluído com sucesso!';
          })
          .catch(e => {
            console.log(e);
          });
      }*/
    },
    mounted() {
      this.getTipoAcao();
      this.processo = '';
      this.message = '';
      this.getProcesso(this.$route.params.id);
    },
  };
  </script>
  
<style>
h6 {
      color:red;
  }
  
#logo {
          width:50%;
          height:50%;
  }
  
.panel-heading{
      font-size:150%;
  }
</style>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
<!--
<style>
#processp-form {
  max-width: 200px;
  margin: 0 auto;
}

.input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

label {
  font-weight: bold;
  margin-bottom: 15px;
  color: #222;;
  padding: 5px 10px;
  border-left: 1px solid #fcba03;
}

input, select {
  padding: 5px 10px;
  width: 300px;
}

#opcionais-container {
  flex-direction: row;
  flex-wrap: wrap;
}

#opcionais-title {
  width: 100%;
}

.checkbox-container {
  display: flex;
  align-items: flex-start;
  width: 50%;
  margin-bottom: 20px;
}

.checkbox-container span,
.checkbox-container input {
  width: auto;
}

.checkbox-container span {
  margin-left: 6px;
  font-weight: bold;
}

.submit-btn {
  background-color: #222;
  color:#fcba03;
  font-weight: bold;
  border: 2px solid #222;
  padding: 10px;
  font-size: 16px;
  margin: 0 auto;
  cursor: pointer;
  transition: .5s;
}

.submit-btn:hover {
  background-color: transparent;
  color: #222;
}
</style>-->