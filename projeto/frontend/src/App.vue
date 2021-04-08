<template>
  <div id="app">

    <div class="container">

      <b-button variant="md-raised md-accent pink lighten-4">Button</b-button>
<b-card no-body>
    <b-tabs card class="pink lighten-4">
      <b-tab title="Tab 1" active>
        <b-card-text>Tab contents 1</b-card-text>
      </b-tab>
      <b-tab title="Tab 2">
        <b-card-text>Tab contents 2</b-card-text>
      </b-tab>
    </b-tabs>
  </b-card>
       <nav>
        <div class="nav-wrapper pink darken-1">
          <div class="brand-logo center">Produtos</div>
        </div>
      </nav>
    
    <form @submit.prevent="salvar">

      <label>Nome</label><br>
      <input type="text" v-model="produto.nome" placeholder="Nome" required><br>
      <label>Quantidade</label><br>
      <input type="text" v-model="produto.quantidade" placeholder="Quantidade" required><br>
      <label>Valor</label><br>
      <input type="text" v-model="produto.valor" placeholder="Valor" required><br>
      <!--
      <p>
      <label>
        <input type="checkbox" v-model="produto.teste_covid"/>
        <span>Teste Covid</span>
      </label>
      </p>

      <p>
      <label>
        <input type="checkbox" v-model="produto.tomou_vacina"/>
        <span>Tomou Vacina</span>
      </label>
      </p>
      -->

      <button class="md-raised pink lighten-4 btn">Salvar <i class="material-icons right">save</i> </button>

    </form>

    <table>

      <thead>
        <tr>
          <th>ID</th>
          <th>NOME</th>
          <th>QUANTIDADE</th>
          <th>VALOR</th>
        </tr>

      </thead>

      <tbody>

        <tr v-for="produto of produtos" :key="produto.id">

          <td>{{ produto.id }}</td>
          <td>{{ produto.nome }}</td>
          <td>{{ produto.quantidade }}</td>
          <td>{{ produto.valor }}</td>
          <td>
            <button class="md-dense md-primary btn lime -1" @click="editar(produto)"> <i class="material-icons">mode_edit</i></button>
            <button class="md-dense md-primary btn orange -1" @click="remover(produto)"><i class="material-icons">delete</i></button>
          </td>

        </tr>

      </tbody>

    </table>
   
    </div>
  </div>
</template>

<script>

import Produtos from './services/produtos'

export default {
  name: 'App',
  components: {

  },

  data(){
    return {
      produto: {
        id: '',
        nome: '',
        quantidade: '',
        valor: 'R$',
      },
      produtos: []
    }
  },

  mounted(){
    this.listar()
  },

  methods: {
    salvar(){

      if(!this.produto.id){
        if (this.produto.valor < 1 || this.produto.quantidade < 1){
          alert('Valor ou quantidade não são aceitos!')
        }
        else{
          Produtos.salvar(this.produto).then(()=>{
            this.produto = {}
            this.listar()
            alert('Salvo com sucesso!')
            this.produto.valor = 'R$'
          }).catch(e => {
            console.log(e)
          })
        }

      }else{

        Produtos.atualizar(this.produto).then(()=>{
          this.produto = {}
          this.listar()
          alert('Atualizado com sucesso!')
        }).catch(e => {
          console.log(e)
        })

      }

    },
    listar(){

      Produtos.listar().then((resposta)=>{
        this.produtos = resposta.data
      }).catch(e => {
          console.log(e)
      })

    },

    editar(produto){

      this.produto = produto
      console.log(this.produto)

    },

    remover(produto){

      if(confirm(`Deseja realmente excluir ${produto.nome}?`)){

         Produtos.remover(produto).then(()=> {
            this.listar()
        }).catch(e => {
            console.log(e)
        })

      }

    }
  }
}
</script>

<style>

</style>
