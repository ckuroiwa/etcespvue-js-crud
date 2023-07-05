<template>
    <div id="cabecalho">
          <div>
            <a href="index.html" title="Página inicial do e-TCESP" id="logo" target="_top">Home</a>
          </div>
          <div>
            <a href="http://www.tce.sp.gov.br" target="_blank" title="Acessar o Portal do TCESP" id="logo_orgao">TCESP</a>
          </div>
          <div id="menu">
            <ul id="menu_lista">
              <li><a href="http://www.tce.sp.gov.br" target="_blank">&laquo; Acessar o Portal do TCESP</a></li>
              <li><a href="https://www.tce.sp.gov.br/etcesp/material-de-apoio" target="_blank">Material de Apoio</a></li>
              <li><a href="informacoesExtras/sobre.htm" target="mainFrame">Sobre</a></li>
              <li><a href="Logout" target="mainFrame">Sair</a></li>
            </ul>
          </div>
          
    </div>
    </template>
      
      <script>
         export default{
          name: "Header"
         }
      </script>
      
    <style>
    
    #cabecalho {
        position:left;
        background: none; 
        width: 100%; 
        height: 74px;
    }
    
    #logo {
        position:absolute;
        bottom:0;
        left:0;	
        display:block;
        width: 498px;
        height:74px;
        text-indent:-9999px;
        z-index:10;
        background-image: url(/public/img/cab_titulo.png);
        background-position: bottom left;
    }
    
    #logo_orgao {
        position:absolute;
        bottom:0;	
        right:0;
        display:block;	
        width: 312px;
        height:74px;
        text-indent:-9999px;	
        z-index:100;
        background-image: url(/public/img/cab_tcesp.png);
        background-position: bottom right;
    }
    
    #menu {
        position:absolute;
        bottom:0;
        left: 100px;
        width:100%;
        height:24px;
        line-height:24px;
        background:#000;
        font-family: Calibri, Arial, Helvetica, sans-serif;
        font-weight: bold;
        font-size: 14px;
        z-index: 50;
    }
    
    #menu ul { 
        margin: 0;
        padding: 0;
        list-style:inside square;
        color:#FFF;
    }
    #menu li {
        float:left;
        margin-right: 20px;
        white-space: nowrap;
    }
    
    #menu a {
        color:#CCC;
        text-decoration:none;
    }
    
    #menu a:hover {
        color:#FFF;
    }  
    </style>

