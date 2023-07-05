<template>
  <div id="app">
    <div>
      <nav class="navbar navbar-expand navbar-dark bg-dark">
        <div class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/cliente" class="nav-link">Clientes</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/processo/processoFilter" class="nav-link">Processos</router-link>
          </li>
        </div>
      </nav>
    </div>
    <div class="container mt-3"><router-view /></div>
  </div>
</template>

<script>
//import Header from './components/common/Header.vue'
//import Footer from './components/common/Footer.vue'

export default {
  name: "app",
  components: {
    //Header,
    //Footer
  }
};
</script>
