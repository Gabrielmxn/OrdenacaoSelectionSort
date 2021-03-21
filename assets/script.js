let i, j, aux, menor;
var alunos = []

const Storage ={
  //recuperando os valores do localStorage
  get(){
    return JSON.parse(localStorage.getItem('section.sort:cadastro')) || [];
  },
  //setando os valores para o localStorage
  set(cadastro){
    localStorage.setItem("section.sort:cadastro", JSON.stringify(cadastro));
  }
}

const DOM = {
  //recuperando os valores do localstorege
  all: Storage.get(),
  //Colocar os valores dentro do array na tabela.
  verificarFila(){
    const table = document.querySelector("table tbody");
    table.innerHTML = "";
    if(DOM.all != []){
      DOM.all.forEach(aluno => {
        let tr = document.createElement("tr");
        const html = `
        <td>${aluno.numero_chamada}</td>
        <td>${aluno.nome}</td>
        <td>${aluno.notaA1}</td>
        <td>${aluno.notaA2}</td>
        <td>${aluno.media}</td>
        <td>${aluno.faltas}</td>
        <td>${aluno.disciplina}</td>`
        tr.innerHTML = html;
        table.appendChild(tr); 
      })
    }  
  },
  //limpar o formulário
  limparFormulario(){
    const formLimpar = document.querySelectorAll('input');
    formLimpar.forEach(formulario => {
      formulario.value = "";
    })
  }
}
const temporizador = {
  tempoOcorrido(inicio, fim){
    console.log(console.log("Inicio = " + inicio + ' fim ' + fim))
    console.log(`resultado ${fim - inicio}`)
  }
}
const ordenacao = {
  //tamanho do array
  tamanho: DOM.all.length,
  fim: '',
  //SELECTION SORT - Ordenar por número da chamada
  ordenarNumeroChamada(inicio){
    
    for(i = 0; i < ordenacao.tamanho; i++){
      menor = i;
      for(j = i + 1; j < ordenacao.tamanho; j++){
        if(DOM.all[j].numero_chamada < DOM.all[menor].numero_chamada){
          menor = j;
        }
      }
      aux = DOM.all[i]
      DOM.all[i] = DOM.all[menor]
      DOM.all[menor] = aux;
      
    }
    ordenacao.fim = new Date().getTime();
    temporizador.tempoOcorrido(inicio, ordenacao.fim);
    DOM.verificarFila();
  },
  //SELECTION SORT - Ordenar por media
  ordenarMedia(inicio){
    for(i = ordenacao.tamanho - 1; i >= 0 ; i--){
      menor = i;
      for(j = i - 1 ; j >= 0; j--){
        if(DOM.all[j].media < DOM.all[menor].media){
          menor = j;
        }
      }
      aux = DOM.all[i]
      DOM.all[i] = DOM.all[menor]
      DOM.all[menor] = aux;
    }
    ordenacao.fim = new Date().getTime();
    temporizador.tempoOcorrido(inicio, ordenacao.fim);
    DOM.verificarFila();
  },
  //SELECTION SORT - Ordenar por faltas
  ordenarFaltas(inicio){
    for(i = 0; i < ordenacao.tamanho; i++){
      menor = i;
      for(j = i + 1; j < ordenacao.tamanho; j++){
        if(DOM.all[j].faltas < DOM.all[menor].faltas){
          menor = j;
        }
      }
      aux = DOM.all[i]
      DOM.all[i] = DOM.all[menor]
      DOM.all[menor] = aux;
    }
    ordenacao.fim = new Date().getTime();
    temporizador.tempoOcorrido(inicio, ordenacao.fim);
    DOM.verificarFila();
  }
}


const aluno = {
  //calculando a média do aluno
  calcularMedia(nota1, nota2){
    let resultado = (parseFloat(nota1) + parseFloat(nota2)) / 2
    let arrendodamento = Math.round(resultado, -1)
    if(resultado > arrendodamento){
      if(resultado <= arrendodamento + 0.2){
        resultado = arrendodamento;
      }else {
        resultado = arrendodamento + 0.5;
      }
    }
    else {
      if(resultado >= arrendodamento - 0.2){
        resultado = arrendodamento;
      }else {
        resultado = arrendodamento - 0.5;
      }
    }
    return resultado;
  },
  //cadastrar o aluno dentro do array alunos.
  cadastrarAluno(form){
    //alunos.push([valoresForm[0], valoresForm[1]])
    let media = aluno.calcularMedia(form.notaA1.value, form.notaA2.value);
    DOM.all.push({
      numero_chamada: form.numero_chamada.value,
      nome: form.name.value,
      notaA1: parseFloat(form.notaA1.value),
      notaA2: parseFloat(form.notaA2.value),
      media,
      faltas: parseInt(form.faltas.value) ,
      disciplina: form.disciplina.value
    })

    Storage.set(
      DOM.all
    )
    ordenacao.tamanho = DOM.all.length;
    DOM.limparFormulario();
    chamarFuncao();
  }
} 
const verificarFormulario = {
  //verificar todo o preenchimento de notas
  verificarPreenchimentoDeNotas(event){
    let notas = event.target.value;
    let verificador;
    let p = document.querySelector('.aviso');
    if(notas >= 0 && notas <= 10){
      verificador = true;
      p.innerHTML = "";
    }else{
      event.target.value = "";
      p.innerHTML = "Digite um valor em notas entre 0 a 10";
    }
    return verificador;
  },
  verificarTodoPreenchimento(form){
    //verificando se o formulário foi todo preenchido.
    let verificador;
    for(i = 0; i <= form[0].length - 2; i++){
      if(form[0][i].value != ""){
        verificador = true;
      }else {
        verificador = false;
        break;
      }
    }
    return verificador;
  }
}

const App = {
  //iniciar o app;
  init(){
    chamarFuncao(); 
  },
}

//Escolher qual modo que tem que ordenar 
function chamarFuncao(){
  const select = document.querySelector("#opcao")
  let inicio;
  if(select.value == "ordenarPorMedia") {
    inicio = new Date().getTime();
    ordenacao.ordenarMedia(inicio);
   }else if(select.value == "ordernarPorFalta"){
    inicio = new Date().getTime();
    ordenacao.ordenarFaltas(inicio);
   }else {
    inicio = new Date().getTime();
    ordenacao.ordenarNumeroChamada(inicio);
   }
}
//colocando um evento 'input' no input de notas.
document.querySelectorAll(".nota").forEach(notas => {
  notas.addEventListener("input", (event) => {
    verificarFormulario.verificarPreenchimentoDeNotas(event);
  })
})
//colcoando um evento dentro do botão de clique.
document.querySelector("#formulario").addEventListener("submit", (event) => {
  event.preventDefault();
  const formul =  document.forms;
  const { numero_chamada, name, notaA1, notaA2, faltas, disciplina } = formul.formulario;
  let verificarPreenchimento = verificarFormulario.verificarTodoPreenchimento(formul);
  verificarPreenchimento  ? aluno.cadastrarAluno({ numero_chamada, name, notaA1, notaA2, faltas, disciplina }) : alert("Preencha tudo")
})


App.init();
