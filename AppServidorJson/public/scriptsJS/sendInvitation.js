let subBody = document.querySelector('.subBody');
let pChatAcedor = document.getElementById('statusConectionUsers2');
let pChatAcedorDiv = document.querySelector(".statusConectionUsersDiv2");
let contenedorChatSpanOne = document.getElementById('spanNoti');
let loaderViajeHaciaElServidor = document.querySelector('.loadderViajeAlServer');
let nameUser;
let nameConectionS;  
let servidorOne;
let avatarlocalSend;
let verificacionDerecursividad2 = true;
let avatarOnlineVariable2;
async function sendInvitation(nameConection,servidor,name,avatar){
verificacionDerecursividad2 = true;
avatarlocalSend = avatar
nameConectionS = await nameConection;
nameUser = await name;
servidorOne = await servidor;
let headers = {
method : "post",
body: JSON.stringify({
"funcion" : "conectionUsers",
"name" : `${name}`,
"userConection" : `${nameConection}`,
"chat" : `¿Vamos a jugar o miedo?`,
"avatar" : `${avatar}`,
"request" : "true",
"respuestaRequest" : " ",
"Datagames":{
"status" : "esperando",
"data" : [
[" "," "," "],
[" "," "," "],
[" "," "," "]
]
}
}),
headers : {"Content-Type" : "application/json"}
}
fetch(servidor, headers)
.then(respuestaServer => respuestaServer.json())
.then(async (respuestaJsonP) => {
let respuestaJson = await respuestaJsonP;
if (respuestaJson.mensaje === "error") pChatAcedor.innerHTML = `Ups hay un problema : <br> ${respuestaJson.typeError}`;
if(respuestaJson.mensaje === "nop"){
verificacionDerecursividad2 = false;
pChatAcedor.innerHTML = "Dise tu amigo que te tiene miedo, asi que no quiere jugar"
setTimeout(()=>{
pChatAcedor.innerHTML = "Esperando tu prompt"
},1500)
}
else if (respuestaJson.mensaje === "ok"){
pChatAcedor.innerHTML = `<p>Invitacion a tu amigo/a ${nameConection}</p> <br><br> <button id ="buttonCancelarSendInvitation" style = "float:rigth;">Cancelar</button>`
verificacionDerecursividad2Function()//call
document.getElementById('buttonCancelarSendInvitation').addEventListener('click', ()=>{//cancelacion
let buttonsOPacity = document.querySelectorAll('.buttonsNav')
document.querySelector('.nav').style.opacity = "1"
buttonsOPacity.forEach(e=>{
e.style.display = "inline-block"
})
cancelarEnvioDeInvitacion.play()
verificacionDerecursividad2 = false;
let headers = {
method : "post",
body: JSON.stringify({
"funcion" : "conectionUsers",
"name" : `${name}`,
"userConection" : `${nameConection}`,
"chat" : " ",
"avatar" : " ",
"request" : "false",
"respuestaRequest" : " ",
"Datagames":{
"status" : "esperando",
"data" : [
[" "," "," "],
[" "," "," "],
[" "," "," "]
]
}        
}),
headers : {"Content-Type" : "application/json"}}
fetch(servidor,headers)
.then(respuestaServer => respuestaServer.json())
.then(async (respuestaJsonP) => {
let respuestaJson = await respuestaJsonP;
if(respuestaJson.mensaje === "error") {pChatAcedor.innerHTML = "Lo siento mucho pero surgio un error <br> <br> REINICIANDO APP ..."; location.reload()}
else if (respuestaJson.mensaje === "ok"){pChatAcedor.innerHTML = "Ok invitacion cancelada"; setTimeout(()=>{pChatAcedor.innerHTML = "<p>Esperando tu prompt</p>"},2000)}
})
})
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
}
function verificacionDerecursividad2Function(){
if(verificacionDerecursividad2){
let headers = {
method : "post",
body : JSON.stringify({
"funcion" :  "applicationCertification",
"name" : `${nameConectionS}`
}),
headers : {"Content-Type" : "application/json"}
}
fetch(servidorOne,headers)
.then(respuestaServer => respuestaServer.json())
.then(async (respuestaJson) => {
let jsonParse = await JSON.parse(respuestaJson)
if (jsonParse.Mensajes.respuestaRequest === " " || jsonParse.Mensajes.respuestaRequest === undefined ) {
setTimeout(()=>{verificacionDerecursividad2Function()},1000)
}else if(jsonParse.Mensajes.respuestaRequest === "false"){
pChatAcedor.innerHTML = `${nameConectionS} no quiere jugar`;
verificacionDerecursividad2 = false;
avatarOnlineVariable2 = jsonParse.Mensajes.avatar;
pChatAcedor.innerHTML = `${nameConectionS}  acepto tu invitacion`; 
let elementoAVerificar = document.querySelector('.chatSpan');///
if (contenedorChatSpanOne.contains(elementoAVerificar)) contenedorChatSpanOne.removeChild(elementoAVerificar)
let fragmento = new DocumentFragment();
let div = document.createElement('DIV'); div.classList.add('chatSpan');
let img = document.createElement('IMG'); img.src = jsonParse.Mensajes.avatar;
let p1 = document.createElement('P'); p1.innerHTML = jsonParse.Mensajes.userName;
let p2 = document.createElement('P');p2.innerHTML = jsonParse.Mensajes.chat;
div.appendChild(img);
div.appendChild(p1); 
div.appendChild(p2);
fragmento.appendChild(div);
contenedorChatSpanOne.appendChild(fragmento) 
contenedorChatSpanOne.style.display = "block";
pChatAcedorDiv.style.display = "none";
setTimeout(()=>{
noIniciarViaje()
},4000)
}else if(jsonParse.Mensajes.respuestaRequest === "ok"){
verificacionDerecursividad2 = false;
avatarOnlineVariable2 = jsonParse.Mensajes.avatar;
pChatAcedor.innerHTML = `${nameConectionS}  acepto tu invitacion`; 
let elementoAVerificar = document.querySelector('.chatSpan');///
if (contenedorChatSpanOne.contains(elementoAVerificar)) contenedorChatSpanOne.removeChild(elementoAVerificar)
let fragmento = new DocumentFragment();
let div = document.createElement('DIV'); div.classList.add('chatSpan');
let img = document.createElement('IMG'); img.src = jsonParse.Mensajes.avatar;
let p1 = document.createElement('P'); p1.innerHTML = jsonParse.Mensajes.userName;
let p2 = document.createElement('P');p2.innerHTML = jsonParse.Mensajes.chat;
div.appendChild(img);
div.appendChild(p1);
div.appendChild(p2);
fragmento.appendChild(div);
contenedorChatSpanOne.appendChild(fragmento) 
contenedorChatSpanOne.style.display = "block";
pChatAcedorDiv.style.display = "none";
setTimeout(()=>{
iniciarViaje()
},1000)
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
}
}
let cuentaRegresiva = 3;
function iniciarViaje(){
cuentaRegresiva--
contenedorChatSpanOne.style.display = "none"
pChatAcedorDiv.style.display = "inline-block";
pChatAcedor.innerHTML = `Preparando viaje al servidor nodeGames en ${cuentaRegresiva}`;
if(cuentaRegresiva > 0) setTimeout(()=>{
iniciarViaje()
},1000)
if(cuentaRegresiva === 0){
document.querySelector('.contenedorJson').style.display = "none"
subBody.style.display = "none";
document.getElementById('introGamers').style.display = "block";
document.getElementById('cajaOne_intro_p_Class1').textContent = nameUser;
document.getElementById('cajaOne_Intro_Images').src = avatarlocalSend;
document.getElementById('cajaTwo_Intro_Images').src = avatarOnlineVariable2;
document.getElementById('cajaOne_intro_p_Class2').textContent = nameConectionS;
setTimeout(()=>{startDataGamesXO({
nameUserLocal : nameUser,
nameUserOnline : nameConectionS,
avatarLocal : avatarlocalSend,
avatarOnline : avatarOnlineVariable2,
status : "ok"
},true,false,servidorOne)},5000)
}
}
function noIniciarViaje(){
verificacionDerecursividad2 = false;
let buttonsOPacity = document.querySelectorAll('.buttonsNav')
document.querySelector('.nav').style.opacity = "1"
buttonsOPacity.forEach(e=>{
e.style.display = "inline-block"
})
cancelarEnvioDeInvitacion.play()
contenedorChatSpanOne.style.display = "none"
pChatAcedorDiv.style.display = "inline-block";
pChatAcedor.innerHTML = 'Esperando tu prompt';
}