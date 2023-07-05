<template>
  <div class="container">
      <div class="py-2 text-center"><h3>Pesquisar Processos</h3></div>
      <div class="col-md-12 order-md-1" >
        <form class="needs-validation" novalidate>
          <div class="row row-striped">
                <div class="col-sm-3 sm-3">
                    <label for="numeroProcesso">Número Processo</label>
                </div>
                <div class="col-md-6 mb-0">
                    <input type="text" v-mask="'###############'" style="text-align: right;" class="b-form-control" id="numeroProcesso" placeholder="" v-model="searchProcesso">
                </div>
          </div>
          
          <div class="row row-striped" >
                <div class="col-sm-3 mb-0">
                    <label for="numeroProcessoReferenciado">Número Processo Referenciado</label>
                </div>
                <div class="col-md-6 mb-0">    
                    <input type="text" v-mask="'###############'" style="text-align: right;" class="b-form-control" id="numeroProcessoReferenciado" placeholder="" v-model="searchNumeroProcessoReferenciado" >
                </div>
          </div>

          <div class="row row-striped" >
                <div class="col-sm-3 mb-0">
                    <label for="copiade">Cópia de</label>
                </div>
                <div class="col-md-6 mb-0">    
                    <input type="text" v-mask="'###############'" style="text-align: right;" class="b-form-control" id="copiade" placeholder="" v-model="searchCopiaDe" >
                </div>
          </div>
          
          <div class="row row-striped" >
            <div class="col-sm-3 mb-0"> 
                  <label for="idTipo">Tipo</label>
            </div>
            <div class="col-sm-6 mb-0">
                  <select class="b-form-control" id="idTipo" v-model="searchTipoAcaoTipo">
                    <option value="">Selecione</option>
                    <option v-for="tipoAcaoTipo in tipoAcaoTipoList" 
                    :key="tipoAcaoTipo.id" 
                    :value="tipoAcaoTipo.id"                
                    >{{ tipoAcaoTipo.descricao }}</option>
                  </select>
            </div>
          </div>
          
          <div class="row row-striped" >
             <div class="col-sm-3 mb-0"> 
                  <label for="xxx">Processos com Recurso(s)/Ação(ões) de</label>
            </div>
            <div class="col-md-9 mb-0">
                <MultipleSelect ref="select" multiple :options="options" v-model="searchProcComRecTipoAcao" >
                  <option v-for="opt in tipoAcaoTipoRecursosList" 
                    :key="opt.codtipoacao" 
                    :value="opt.codtipoacao"                
                    >{{ opt.descricao }}</option>
                </MultipleSelect>
            </div>
          </div>

          <div class="row row-striped" >
            <div class="col-sm-3 mb-0"> 
                  <label for="exercicio">Exercício</label>
            </div>
            <div class="col-md-6 mb-0">    
                    <input type="text" v-mask="'####'" style="text-align: right;" class="b-form-control" id="exercicio" placeholder="aaaa" v-model="searchExercicio" >
            </div>
          </div>


          <div class="row row-striped" >
            <div class="col-sm-3 mb-0"> 
                  <label for="valorIni">Valor</label>
            </div>
            <div class="col-md-4 mb-0">
          
            <b-form-group
               label-for="valorAcaoIni"
               description=""
            >    
              <b-input-group prepend="Dê">
                <b-form-input
                style="text-align: right;"
                id="valorAcaoIni"
                v-model="searchValorAcaoIni"
                placeholder=""
                @keyup="onlyNumber($event)"
                @blur="numberFormat($event)"
              />
              </b-input-group>
            </b-form-group>
            </div>

            <div class="col-md-4 mb-0">
            <b-form-group
               label-for="valorAcaoFim"
               description=""
            >    
              <b-input-group prepend="Até">
                <b-form-input
                style="width: 20%; text-align: right;"
                id="valorAcaoFim"
                v-model="searchValorAcaoFim"
                placeholder=""
                @keyup="onlyNumber($event)"
                @blur="numberFormat($event)"
              />
              </b-input-group>
            </b-form-group>
            
            </div>
           
          </div>
          
          <div class="row row-striped" >
            <div class="col-sm-3 mb-0"> 
                  <label for="dataAutuacao">Data de Autuação</label>
            </div>
            <div class="col-md-4 mb-0"> 
            <b-form-datepicker 
                 id="searchDataAutuacaoIni" 
                 label-no-date-selected="dd/mm/aaaa" 
                 :date-format-options="{ day: 'numeric', month: 'numeric', year: 'numeric' }"
                 v-model="searchDataAutuacaoIni" class="mb-2">
            </b-form-datepicker>
            
             </div>
             <div class="col-md-4 mb-0"> 
            <b-form-datepicker 
            id="searchDataAutuacaoFim" 
                 label-no-date-selected="dd/mm/aaaa" 
                 :date-format-options="{ day: 'numeric', month: 'numeric', year: 'numeric' }"
                 v-model="searchDataAutuacaoFim" class="mb-2">
            </b-form-datepicker>
             </div>
          </div>

          <hr class="mb-4">
          <button class="btn btn-primary btn-sm btn-block" type="button" @click="page = 1; procuraProcessos();">Pesquisar</button>
          
        </form>
        
      </div>

      <div class="col-md-12">
          <div class="mb-0" align="right">
            Items por Página:
            <select v-model="pageSize" @change="handlePageSizeChange($event)">
              <option v-for="size in pageSizes" :key="size" :value="size">
                {{ size }}
              </option>
            </select>
          </div>
          <div class="col-md"><h5 align="center">Lista de Processos</h5></div>

          <b-pagination
            v-model="page"
            :total-rows="count"
            :per-page="pageSize"
            prev-text="Ant"
            next-text="Próx"
            @change="handlePageChange"
            align="center"
          ></b-pagination>
      </div>

      <p class="mt-3">Total de Resultado Encontrado: {{ count }} - Total de Páginas: {{ Math.round(count / pageSize)}}</p>  
       
      <b-table  sticky-header="450px" striped hover id="my-table" head-variant="dark"
          :items="processos" 
          :per-page="pageSize" 
          :fields="fields" 
          @change="currentPage = $event" small>  <!--sticky-header-->
        
        <template v-slot:cell(actions) = "{item}">
          <b-link :href="'/processo/buscaProcesso/'   + item.numeroProcesso">Editar </b-link>&nbsp;&nbsp;
          <b-link :href="'/processo/RemoverProcesso/' + item.numeroProcesso">Remover</b-link>&nbsp;&nbsp;
          <b-link :href="'/processo/buscaProcessoEditor/'">Editor</b-link>
          <!--<b-link :href="'/processo/buscaProcessoCad/'">ProcessoCad</b-link>-->
          <!--<b-button variant="primary" size="sm" class="mr-2" @click="editar(item.numeroProcesso)">Editar</b-button>
          <b-button variant="danger"  size="sm"              @click="remover(item.numeroProcesso)">Excluir</b-button>
          <button class="m-3 btn btn-sm btn-danger" @click="removeAllProcessos">-->
        </template>
      </b-table>

      <footer class="my-5 pt-5 text-muted text-center text-small">
      <p class="mb-1">&copy; 2023 TCESP</p>
      <ul class="list-inline">
        <li class="list-inline-item"><a href="#">Privacidade</a></li>
        <li class="list-inline-item"><a href="#">Termos</a></li>
        <li class="list-inline-item"><a href="#">Suporte</a></li>
      </ul>
      </footer>
    </div>

</template>

<script>
import EtcespDataService from "../../services/EtcespDataService";
//import Header from "../common/Header.vue";
//import Footer from "../common/Footer.vue";



export default {
    name: "processos-list",
    props: {
        value: Array
    },
    
    data() {
        return {
            fields: [
                { key: "numeroProcesso", label: "Número Processo", sortable: true, formatter: "numeroProcesso" },
                { key: "numeroProcessoReferenciado", label: "Número Processo Referenciado", sortable: true },
                { key: "valorAcao", label: "Valor Acao", sortable: true, formatter: "valorAcao" },
                { key: "dataAtuacao", label:"Data Atuacao", sortable: true, formatter: "dataAutucao" },
                { key: "exercicio", label: "Exercício", sortable: false },
                { key: "copiaDe", label: "Copia De", sortable: false },
                { key: "codVara", label: "Código Vara", sortable: false },
                { key: "tipoAcao", label: "Tipo", sortable: true },
                { key: "actions", label: "Ações" }
            ],
            processos: [],
            currentProcesso: null,
            numero: null,
            currentIndex: -1,
            searchProcesso: null,
            searchNumeroProcessoReferenciado: null,
            searchCopiaDe: null,
            searchTipoAcaoTipo: "",
            searchProcComRecTipoAcao: [],
            searchExercicio: null,
            searchValorAcaoIni: "",
            searchValorAcaoFim: "",
            searchDataAutuacaoIni: null,
            searchDataAutuacaoFim: null,
            page: 1,
            count: 0,
            pageSize: 10,
            tipoAcaoTipoList: null,
            tipoAcaoTipoRecursosList: null,
            pageSizes: [10, 20, 50],
            processo: {
                numeroProcesso: null,
                numeroProcessoReferenciado: null,
                copiaDe: null,
                tipoAcao: "",
                procComRecTipoAcao: [],
                exercicio: null,
                valorAcaoIni: "",
                valorAcaoFim: "",
                dataAutuacaoIni: null,
                dataAutuacaoFim: null
            },
            options: {
                multiple: true,
                multipleWidth: 600,
                filter: true,
                placeholder: 'Processos',
                displayTitle: true
            },
        };
    },
    methods: {
        onlyNumber(event) {
          let val = event.target.value;
          // aceita somente números e virgula
          let d = val.replace(/[^0-9^,]/g, "");
          if (val.length != d.length) {
                return event.target.value = ",00";
          }
        },
        numberFormat(event) {
            let val = event.target.value;
            val = val.replaceAll(".", "");
            
            // procura se tem mais de 1 vírgula
            let pos = 0;
            count = 0;
            pos = val.indexOf(",");
            while (pos != -1) {
                count++;
                pos = val.indexOf(",", pos + 1);
            }
            if (count > 1) {
                return event.target.value = ",00";
            }

            if (count == 0) {
                val = val + ",00";
            }
            
            // aceita somente números e virgula
            let d = val.replace(/[^0-9^,]/g, "");
            if (val.length != d.length) {
                return event.target.value = ",00";
            }
            
            // depois da virgula formata 2 casas
            if (val.indexOf(",") < 0) {
                return event.target.value = event.target.value + ",00";
            }

            let myArray = val.split(",");
            let result = "";
            let lenParteInteira = myArray[0].length;
            let charac = null;
            let count = 1;

            for (let i = lenParteInteira; i > 0; i--) {
                charac = myArray[0].substr(i - 1, 1);
                if (count % 4 === 0) {
                    count = 1;
                    result = result + "." + charac;
                }
                else {
                    result = result + charac;
                }
                count++;
            }

            let result1 = "";
            for (let i = result.length; i > 0; i--) {
                charac = result.substr(i - 1, 1);
                result1 = result1 + charac;
            }
            myArray[0] = result1;
            if (myArray[1].length == 1) {
                return event.target.value = result1 + "," + myArray[1] + "0";
            }
            else if (myArray[1].length == 2) {
                return event.target.value = result1 + "," + myArray[1];
            }
            else if (myArray[1].length > 2) {
                myArray[1] = "," + myArray[1].substr(0, 2);
                return event.target.value = result1 + myArray[1];
            }
        },

        getTipoAcaoListarRecuros() {
            EtcespDataService.getTipoAcaoListarRecursos()
                .then(response => {
                this.tipoAcaoTipoRecursosList = response.data;
                console.log(response.data);
            })
                .catch(e => {
                console.log(e);
            });
        },
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
        getTipoAcaoGraphlql() {
            EtcespDataService.getTipoAcaoGraphql()
                .then(response => {
                this.tipoAcaoTipoRecursosList = response.data.data.findAllTipoAcaoQL;
                console.log(response.data.data.findAllTipoAcaoQL);
            })
                .catch(e => {
                console.log(e);
            });
        },
        getTipoAcaoTipo() {
            EtcespDataService.getDominioLista("TIPO.ACAO.TIPO")
                .then(response => {
                this.tipoAcaoTipoList = response.data;
                console.log(response.data);
            })
                .catch(e => {
                console.log(e);
            });
        },
        getRequestParams(page, pageSize) {
            let params = {};
            if (page) {
                params["page"] = page - 1;
            }
            if (pageSize) {
                params["size"] = pageSize;
            }
            return params;
        },
        procuraProcessos() {
            const params = this.getRequestParams(this.page, this.pageSize);
            var processo = {
                numeroProcesso: this.searchProcesso,
                numProcessoDependente: null,
                numeroProcessoReferenciado: this.searchNumeroProcessoReferenciado,
                tipoAcao: this.searchTipoAcaoTipo,
                copiaDe: this.searchCopiaDe,
                procComRecTipoAcao: ((this.searchProcComRecTipoAcao).toString()),
                valorAcaoIni: ((this.searchValorAcaoIni).toString().replaceAll(".", "").replaceAll(",", ".")),
                valorAcaoFim: ((this.searchValorAcaoFim).toString().replaceAll(".", "").replaceAll(",", ".")),
                dataAutuacaoIni: this.searchDataAutuacaoIni,
                dataAutuacaoFim: this.searchDataAutuacaoFim,
                exercicio: this.searchExercicio,
            };
            /*EtcespDataService.getProcessosPagination(params)
            .then((response) => {
              const { processos, totalItems } = response.data;
              this.processos = processos;
              this.count = totalItems;
              console.log(response.data);
            })
            .catch((e) => {
              console.log(e);
            });*/
            EtcespDataService.postProcessosPage(processo, params)
                .then((response) => {
                const { content, totalElements } = response.data;
                this.processos = content;
                this.count = totalElements;
            })
                .catch((e) => {
                console.log(e);
            });
        },
        handlePageChange(value) {
            this.page = value;
            this.procuraProcessos();
        },
        handlePageSizeChange(event) {
            this.pageSize = event.target.value;
            this.page = 1;
            this.procuraProcessos();
        },
        refreshList() {
            this.procuraProcessos();
            this.currentProcesso = null;
            this.currentIndex = -1;
        },
        setActiveProcesso(processo, index) {
            this.currentProcesso = processo;
            this.currentIndex = index;
        },
        /*removeAllProcessos() {
          ProcessoDataService.deleteAll()
            .then((response) => {
              console.log(response.data);
              this.refreshList();
            })
            .catch((e) => {
              console.log(e);
            });
        },*/
    },
    mounted() {
        //alert("!!!pare!!!");
        this.procuraProcessos();
        //this.getTipoAcaoGraphlql();
        this.getTipoAcaoListarRecuros();
        this.getTipoAcaoTipo();
    }
};


</script>

<style>

.row-striped:nth-of-type(odd){
  background-color: #f9f7f5 ;
}

.row-striped:nth-of-type(even){
  background-color: #ffffff;
}

.b-pagination {
  display: flex;
  justify-content: center;
}

.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}

/*.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 15px 30px;
    background: #f9f7f5;
  }*/

</style>