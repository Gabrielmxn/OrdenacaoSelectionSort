let i, j, aux, menor;
var alunos = []
var tamanho;

/*const Storage ={
  get(){
    return JSON.parse(localStorage.getItem('section.sort:cadastro')) || [];
  },
  set(cadastro){
    localStorage.setItem("section.sort:cadastro", JSON.stringify(cadastro));
  }
}*/

const DOM = {
  //Colocar os valores dentro do array na tabela.
  verificarFila(){
    const table = document.querySelector("table tbody");
    table.innerHTML = "";
    console.log(alunos);
    alunos.forEach(aluno => {
        let tr = document.createElement("tr");
        const html = `
        <td>${aluno.numero_chamada}</td>
        <td>${aluno.nome.toUpperCase()}</td>
        <td>${aluno.notaA1}</td>
        <td>${aluno.notaA2}</td>
        <td>${aluno.media}</td>
        <td>${aluno.faltas}</td>
        <td>${aluno.disciplina.toUpperCase()}</td>`
        tr.innerHTML = html;
        table.appendChild(tr);
      
    })
  },
  //limpar o formulário
  limparFormulario(form){
    form.forEach(arvoreForm => {
      arvoreForm.value = ""
    })
  }
}
const ordenacao = {
  ordenarNumeroChamada(){
    for(i = 0; i < tamanho; i++){
      menor = i;
      for(j = i + 1; j < tamanho; j++){
        
        if(alunos[j].numero_chamada < alunos[menor].numero_chamada){
          menor = j;
        }
      }
      
      aux = alunos[i]
      alunos[i] = alunos[menor]
      alunos[menor] = aux;
    }
    DOM.verificarFila();
  },
  ordenarMedia(){
    console.log(tamanho)
    for(i = tamanho - 1; i >= 0 ; i--){
      menor = i;
      for(j = i - 1 ; j >= 0; j--){
        console.log()
        if(alunos[j].media < alunos[menor].media){
          menor = j;
        }
      }
      aux = alunos[i]
      alunos[i] = alunos[menor]
      alunos[menor] = aux;
    }
    DOM.verificarFila();
  },
  ordenarFaltas(){
    for(i = 0; i < tamanho; i++){
      menor = i;
      for(j = i + 1; j < tamanho; j++){
        if(alunos[j].faltas < alunos[menor].faltas){
          menor = j;
        }
      }
      aux = alunos[i]
      alunos[i] = alunos[menor]
      alunos[menor] = aux;
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
    //tamanho = alunos.length;
    //alunos.push([valoresForm[0], valoresForm[1]])
    let media = aluno.calcularMedia(valoresForm[2], valoresForm[3]);
    alunos.push({
      numero_chamada: valoresForm[0],
      nome: valoresForm[1],
      notaA1: valoresForm[2],
      notaA2: valoresForm[3],
      media:  media,
      faltas: valoresForm[4],
      disciplina: valoresForm[5]
    })
    tamanho = alunos.length;
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
//Escolher qual modo que tem que ordenar 
function chamarFuncao(){
  const select = document.querySelector("#opcao")
  
  if(select.value == "ordenarPorMedia") {
    console.log("media");
    ordenacao.ordenarMedia();
   }else if(select.value == "ordernarPorFalta"){
    console.log("faltas");
    ordenacao.ordenarFaltas();
   }else {
    console.log("chamada");
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



