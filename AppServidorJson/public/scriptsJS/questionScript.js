////win contenedores
const contenedorQuestionWin = document.querySelector('.contenedorQuestionGanador');
const pinfoQuestionWin = document.querySelector('.userNameQuestionLuser');
const contenedorPadrePlus = document.querySelector('.usersContainer');
let todasLasPreguntas;
let nameHost;
let nameLuser;
let avatar;
let callback_infoGanador2; 
let callback_position2; 
let callback_ganador2;
let servidorForQuestion = servidor;
function peticionQuestionFor(info,server){
	callback_infoGanador2 = info.infoGanador;
callback_position2 = info.position;
callback_ganador2 = info.ganador;
if(info.ganador === "empate"){
inicializarGamesChat(callback_infoGanador2,callback_ganador2,callback_position2)
}else{let verficadorChild = true;
contenedorQuestionWin.style.display = "block";
document.querySelector('.gamesByDcode').style.display = "none";
nameHost = info.nameGanador;
nameLuser = info.namePerdedor;
avatar = info.infoGanador.jugadorX;
let headers = {
method : "post",
body : JSON.stringify({"funcion" : "question","name" : `${nameHost}`}),
headers : {"Content-Type" : "application/json"}  	
}
fetch(servidorForQuestion,headers)
.then(dataServer => dataServer.json())
.then(async (respuestaJson) => {
let jsonParse = await JSON.parse(respuestaJson);
let filter = await Object.keys(jsonParse);
let objetoArray = filter.filter(e=> e.pregunta != "testing")
todasLasPreguntas = await jsonParse;
funcionContenedorVirificador();
if(verficadorChild){
if(contenedorPadrePlus.childNodes.length < objetoArray.length ){
for(let i = 0; i < objetoArray.length; i++){
if(jsonParse[objetoArray[i]].pregunta === "testing") continue
let fragmento = new DocumentFragment();
let div = document.createElement('DIV'); div.classList.add('containerJSusers');
let pHidden = document.createElement('P'); pHidden.classList.add('hiddenP'); pHidden.textContent = jsonParse[objetoArray[i]].pregunta;
let pPregunta = document.createElement('P'); pPregunta.classList.add('nameUsers');pPregunta.textContent = jsonParse[objetoArray[i]].pregunta;
let pStatusPregunta = document.createElement('P');pStatusPregunta.classList.add('statusUsers');pStatusPregunta.textContent = jsonParse[objetoArray[i]].status;
let img = document.createElement('IMG'); img.src = jsonParse[objetoArray[i]].avatar;
div.appendChild(pHidden);
div.appendChild(pPregunta);
div.appendChild(pStatusPregunta);
div.appendChild(img);
fragmento.appendChild(div);
contenedorPadrePlus.appendChild(fragmento);
if(i < objetoArray.length-1){ 
verficadorChild = false;
}
}
}
}
})
//.catch(error=>{
// let buttnReiniciar = document.getElementById('reinicarApp_Error')
// let containerForError = document.getElementById('EroorFetch');
// setTimeout(()=>{
// containerForError.style.opacity = "0";
// containerForError.style.display = "block"
// setTimeout(()=>{
// containerForError.style.opacity = "1";
// document.getElementById('containerMax').style.display = "none";
// buttnReiniciar.addEventListener('click',()=>{
// location.reload()
// })
// },500)
// },1000)
// })
}
}
function funcionContenedorVirificador(){
const contenedoresPreguntas = document.querySelectorAll('.containerJSusers');
contenedoresPreguntas.forEach(e=>{
e.addEventListener('click',()=>{
let contenedorSiguienteHijo = e.firstElementChild;
let headers = { 
method : "post",
body : JSON.stringify({
"pregunta" : `${todasLasPreguntas[e.firstElementChild.textContent].pregunta}`,
"respuesta1" : `${todasLasPreguntas[e.firstElementChild.textContent].respuestas1}`,
"respuesta2" : `${todasLasPreguntas[e.firstElementChild.textContent].respuestas2}`,
"respuesta3" : `${todasLasPreguntas[e.firstElementChild.textContent].respuestas3}`,
"respuestaCorrecta" : `${todasLasPreguntas[e.firstElementChild.textContent].respuestaCorrecta}`,
"funcion" : "conectionQuestionUser",
"name" : `${nameHost}`,
"status" : `listo`,
"userConection" : `${nameLuser}`,
}),
headers : {"Content-Type" : "application/json"}
}
fetch(servidorForQuestion,headers)
.then(dataServer=> dataServer.json())
.then(async (jsonP) => {
let json = await jsonP;
if(json.mensaje === "ok"){ 
startVerificarRespuestaForluser()
contenedorPadrePlus.innerHTML = `<div class="loaderQuestionGanador"></div><label style="color:white;margin: 5px;">Espera a que responda</label>`;
}
})
// .catch(error=>{
// let buttnReiniciar = document.getElementById('reinicarApp_Error')
// let containerForError = document.getElementById('EroorFetch');
// setTimeout(()=>{
// containerForError.style.opacity = "0";
// containerForError.style.display = "block"
// setTimeout(()=>{
// containerForError.style.opacity = "1";
// document.getElementById('containerMax').style.display = "none";
// buttnReiniciar.addEventListener('click',()=>{
// location.reload()
// })
// },500)
// },1000)
// })
})})}
startVerificarRespuestaForluser=()=>{
let headers = {
method : "post",
body : JSON.stringify({
"funcion" : "verificacionServerQuestion",
"name" :`${nameLuser}`
}),
headers : {"Content-Type" : "application/json"}
}
fetch(servidorForQuestion,headers)
.then(servidorJson => servidorJson.json())
.then(async(json) =>{
let jsonParse = await JSON.parse(json)
if(jsonParse.Online.status === "respondiendo" || jsonParse.Online.status === "listo") setTimeout(()=>{startVerificarRespuestaForluser()},1000)
else if(jsonParse.Online.status === "gano"){
document.getElementById('statusQuestionWinP').textContent = "Perdiste! Te robaron la corona, porque te contestaron bien la pregunta ";
document.querySelector('.corona1').style.display = "none";
document.getElementById('animationCorrect1').style.display = "none";
document.querySelector('.contenedorQuestionGanador').style.display = "none"
document.querySelector('.contenedorQuestionGanador').style.display = "none"
document.querySelector('.intermedioViajeAlchat').style.display = "block";
setTimeout(()=>{
document.querySelector('.intermedioViajeAlchat').style.display = "none";
inicializarGamesChat(callback_infoGanador2,callback_ganador2,callback_position2)
},5000)
}
else if(jsonParse.Online.status === "perdio") {
document.getElementById('statusQuestionWinP').textContent = "Ganaste! la corona, porque no repondio la pregunta";
document.querySelector('.corona1').style.display = "block";
document.getElementById('animationCorrect1').style.display = "block";
document.querySelector('.contenedorQuestionGanador').style.display = "none"
document.querySelector('.contenedorQuestionGanador').style.display = "none"
document.querySelector('.intermedioViajeAlchat').style.display = "block";
setTimeout(()=>{
document.querySelector('.intermedioViajeAlchat').style.display = "none";
inicializarGamesChat(callback_infoGanador2,callback_ganador2,callback_position)
},5000)
}
})
//.catch(error=>{
// let buttnReiniciar = document.getElementById('reinicarApp_Error')
// let containerForError = document.getElementById('EroorFetch');
// setTimeout(()=>{
// containerForError.style.opacity = "0";
// containerForError.style.display = "block"
// setTimeout(()=>{
// containerForError.style.opacity = "1";
// document.getElementById('containerMax').style.display = "none";
// buttnReiniciar.addEventListener('click',()=>{
// location.reload()
// })
// },500)
// },1000)
// })
}
const contenedorQuestionLuser = document.querySelector('.contenedorQuestionPerdedor');
const infoPQuestionLuser = document.getElementById('userNameQuestionGanador');
let question = document.getElementById('question');
let questionOne = document.getElementById('questionOne');
let questionTwo = document.getElementById('questionTwo');
let questionTree = document.getElementById('questionTree');
let inputQuestion = document.getElementById('questionTreeInput')
let inputQuestion1 = document.getElementById('questionTreeInput1')
let inputQuestion2 = document.getElementById('questionTreeInput2')
let loadingQuestionLuser = document.querySelector('.loaderQuestionPerdedor');
let animationCorrect = document.getElementById('animationCorrect')
let callback_infoGanador;
let callback_ganador;
let callback_position;
let nameGanadorVercionLuser;
let namePerdedorVercionLuser;
let preguntaCorrecta;
let infoPreguntas;
peticionQuestionFor2=(info)=>{
	nameGanadorVercionLuser = info.nameGanador;
namePerdedorVercionLuser = info.namePerdedor;
callback_infoGanador = info.infoGanador;
callback_position = info.position;
callback_ganador = info.ganador;
avatar = info.infoGanador.avatarGanador;
	if(info.ganador === "empate"){
		inicializarGamesChat(callback_infoGanador,callback_ganador,callback_position)
	}
else{animationCorrect.style.display = "none"
document.querySelector('.gamesByDcode').style.display = "none";
loadingQuestionLuser.style.display = "block";
let headers = {
method : "post",
body : JSON.stringify({
"funcion" : "verificacionServerQuestion",
"name" : `${nameGanadorVercionLuser}`
}),
headers : {"Content-Type" : "application/json"}
}
fetch(servidorForQuestion,headers)
.then(dataserver => dataserver.json())
.then(async(dataJson) => {
let jsonParse = await JSON.parse(dataJson)
if(jsonParse.Online.pregunta === " "){
setTimeout(()=>{
peticionQuestionFor2(info)
},1000)}
else if(jsonParse.Online.pregunta != " " && jsonParse.Online.status === "listo"){
infoPreguntas = jsonParse.Online
preguntaCorrecta = jsonParse.Online.respuestaCorrecta; 
question.textContent   = jsonParse.Online.pregunta;
questionOne.textContent= jsonParse.Online.respuestas1;inputQuestion.checked = false;   inputQuestion.setAttribute('value',jsonParse.Online.respuestas1);
questionTwo.textContent= jsonParse.Online.respuestas2;inputQuestion1.checked = false;   inputQuestion1.setAttribute('value',jsonParse.Online.respuestas2);
questionTree.textContent= jsonParse.Online.respuestas3;inputQuestion2.checked = false;  inputQuestion2.setAttribute('value',jsonParse.Online.respuestas3);
loadingQuestionLuser.style.display = "none";
contenedorQuestionLuser.style.display = "block";
iniciarVerificacion();
let headers = { 
method : "post",
body : JSON.stringify({
"pregunta" : " ",
"respuestas1" : " ",  
"respuestas2" : " ",
"respuestas3" : " ",
"respuestaCorrecta" : " ",
"funcion" : "conectionQuestionUser",
"name" : `${nameGanadorVercionLuser}`,
"status" : `respondiendo`,
"userConection" : `${nameGanadorVercionLuser}`,
}),
"headers" : {"Content-Type" : "application/json"}
}
fetch(servidorForQuestion,headers)
.then(serverJson => serverJson.json())
.catch(error=>{
let buttnReiniciar = document.getElementById('reinicarApp_Error')
let containerForError = document.getElementById('EroorFetch');
setTimeout(()=>{
containerForError.style.opacity = "0";
containerForError.style.display = "block"
setTimeout(()=>{
containerForError.style.opacity = "1";
document.getElementById('containerMax').style.display = "none";
buttnReiniciar.addEventListener('click',()=>{
location.reload()
})
},500)
},1000)
})
}
})}
}
function iniciarVerificacion(){
let checkBox = document.querySelectorAll('.inputCheckbox')
checkBox.forEach(e=>{
e.addEventListener('change',()=>{
let status;
if(e.value === preguntaCorrecta){status = "gano"; 
document.getElementById('statusQuestionWinP').textContent = "Ganaste! la corona, porque respondiste bien la pregunta"
document.querySelector('.corona1').style.display = "block";
document.getElementById('animationCorrect1').style.display = "block";
animationCorrect.style.display = "block";correctoQuestion.play();}
else { status = "perdio";
document.getElementById('statusQuestionWinP').textContent = "Perdiste! Te robaron la corona, porque respondiste mal";
document.querySelector('.corona1').style.display = "none";
document.getElementById('animationCorrect1').style.display = "none";
animationCorrect.style.display = "none";}
let headers = { 
method : "post",
body : JSON.stringify({
"pregunta" : " ",
"respuestas1" : " ",  
"respuestas2" : " ",
"respuestas3" : " ",
"respuestaCorrecta" : " ",
"funcion" : "conectionQuestionUser",
"name" : `${nameGanadorVercionLuser}`,
"status" : `${status}`,
"userConection" : `${nameGanadorVercionLuser}`,
}),
"headers" : {"Content-Type" : "application/json"}
}
fetch(servidorForQuestion,headers)
.then(serverJson => serverJson.json())
.then(async(jsonP) => {
let json = await jsonP;
if(json.mensaje === "ok"){
setTimeout(()=>{
setTimeout(()=>{
contenedorQuestionLuser.style.display = "none";
document.querySelector('.intermedioViajeAlchat').style.display = "block";
setTimeout(()=>{
document.querySelector('.intermedioViajeAlchat').style.display = "none";
inicializarGamesChat(callback_infoGanador,callback_ganador,callback_position)
},5000)
})
},500)
}  
}).catch(error=>{
let buttnReiniciar = document.getElementById('reinicarApp_Error')
let containerForError = document.getElementById('EroorFetch');
setTimeout(()=>{
containerForError.style.opacity = "0";
containerForError.style.display = "block"
setTimeout(()=>{
containerForError.style.opacity = "1";
document.getElementById('containerMax').style.display = "none";
buttnReiniciar.addEventListener('click',()=>{
location.reload()
})
},500)
},1000)
})})})}