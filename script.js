let i, j, aux, menor;
var alunos = []

const Storage ={
  get(){
    return JSON.parse(localStorage.getItem('section.sort:cadastro')) || [];
  },
  set(cadastro){
    localStorage.setItem("section.sort:cadastro", JSON.stringify(cadastro));
  }
}

const DOM = {
  //Colocar os valores dentro do array na tabela.
  all: Storage.get(),
  verificarFila(){
    const table = document.querySelector("table tbody");
    table.innerHTML = "";
    if(DOM.all != []){
      DOM.all.forEach(aluno => {
        console.log(aluno);
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
  limparFormulario(form){
    form.forEach(arvoreForm => {
      arvoreForm.value = ""
    })
  }
}

const ordenacao = {
  tamanho: DOM.all.length,
  ordenarNumeroChamada(){

    console.log('tamanho' + ordenacao.tamanho)
    for(i = 0; i < ordenacao.tamanho; i++){
      menor = i;
      for(j = i + 1; j < ordenacao.tamanho; j++){
        if(DOM.all[j].numero_chamada < DOM.all[menor].numero_chamada){
          menor = j;
        }
      }
      console.log("oi")
      aux = DOM.all[i]
      DOM.all[i] = DOM.all[menor]
      DOM.all[menor] = aux;
      
    }
    console.log("vetor aqui")
    console.log(DOM.all);
    DOM.verificarFila();
  },
  ordenarMedia(){
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
    DOM.verificarFila();
  },
  ordenarFaltas(){
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
    let valoresForm = []
    form.forEach(value => {
      valoresForm.push(value.value)  
    })
 
    //alunos.push([valoresForm[0], valoresForm[1]])
    let media = aluno.calcularMedia(valoresForm[2], valoresForm[3]);
    DOM.all.push({
      numero_chamada: valoresForm[0],
      nome: valoresForm[1],
      notaA1: valoresForm[2],
      notaA2: valoresForm[3],
      media:  media,
      faltas: valoresForm[4],
      disciplina: valoresForm[5]
    })

    Storage.set(
      DOM.all
    )
    ordenacao.tamanho = DOM.all.length;
    DOM.limparFormulario(form);
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
    for(i = 0; i <= form.length - 1; i++){
      if(form[i].value != ""){
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
  init(){
    chamarFuncao(); 
  },
}

//Escolher qual modo que tem que ordenar 
function chamarFuncao(){
  const select = document.querySelector("#opcao")
  
  if(select.value == "ordenarPorMedia") {
    ordenacao.ordenarMedia();
   }else if(select.value == "ordernarPorFalta"){
    ordenacao.ordenarFaltas();
   }else {
    ordenacao.ordenarNumeroChamada();
   }
}
//colocando um evento 'input' no input de notas.
document.querySelectorAll(".nota").forEach(notas => {
  notas.addEventListener("input", (event) => {
    verificarFormulario.verificarPreenchimentoDeNotas(event);
  })
})
//colcoando um evento dentro do botão de clique.
document.querySelector("#button").addEventListener("click", () => {
  const form = document.querySelectorAll("input")
  let verificarPreenchimento = verificarFormulario.verificarTodoPreenchimento(form);
  verificarPreenchimento  ? aluno.cadastrarAluno(form) : alert("Preencha tudo")
})


App.init();
