const contenedorChatSpanVercionSendAndRecive = document.querySelector('.infoWin2');
const imgChatsSpanVercionSendAndRecive = document.getElementById('avatarPerdedorWin2');
const contenedorChats = document.getElementById('chatWin2');
const inputEnvioCHats = document.getElementById('inputpromptsEnvioChats');
const contenedorAVerificar = document.querySelector('.cajaGanador');
let promptsEnvioChats = document.querySelector('.promptsEnvioChats');
let videos = document.querySelectorAll('.videoReaccion')
let arrayRom = ["wwww"];
let nameConectionVersionSendAndRecive;
let nameGameXOVersionConection;
let avatarConectionVersionSendAndRecive;
let servidorVercionSendARev = servidor;
let button = document.getElementById('shareInputText')
let contenedorGestos = document.querySelector('.containerGestos')
let buttonGestos = document.getElementById('buttonGestos')
buttonGestos.addEventListener('click',()=>{
if(contenedorGestos.style.display === "block"){
promptsEnvioChats.appendChild(buttonGestos);
contenedorGestos.style.display = "none"
contenedorGestos.style.position = "absolute"
}else{
contenedorGestos.appendChild(buttonGestos);
videos.forEach(e=>{
e.addEventListener('mouseover',()=>{
videos.forEach(i=>{
if(i != e)  i.pause()
})
e.currentTime = 0; 
e.play();
})
})
contenedorGestos.style.display = "block"
contenedorGestos.style.position = "relative"
}
})
async function inicarChatSpan (infoCallback){
nameConectionVersionSendAndRecive = await infoCallback.nameConection;
nameGameXOVersionConection = await infoCallback.infoAvtar.name;
avatarConectionVersionSendAndRecive = await infoCallback.infoAvtar.avatar;
imgChatsSpanVercionSendAndRecive.src = avatarConectionVersionSendAndRecive;
if(nameGameXOVersionConection != null) {inicializar(); eventoEscuchaForButton()}
}
function inicializar(){
if (contenedorAVerificar.style.display === "block") {
let headers = {
method : "post",
body : JSON.stringify({
"funcion" : "applicationCertification",
"name" : `${nameConectionVersionSendAndRecive}`
}),
headers : {"Content-Type" : "application/json"}
}
fetch(servidorVercionSendARev,headers)
.then(dataserver => dataserver.json())
.then(async (dataJson) => {
let jsonParse = await JSON.parse(dataJson)
if(jsonParse.Mensajes.chat === " "){
setTimeout(()=>{
inicializar()
},2000)
}
else if(jsonParse.Mensajes.chat.funcion === "gesto"){
let datos = {
"funcion" : "conectionUsers",
"name" : `${nameConectionVersionSendAndRecive}`,
"userConection" : `${nameConectionVersionSendAndRecive}`,
"chat" : " ",
"avatar" : " ",
"request" : "false",
"respuestaRequest" : "ok",
"Datagames":{
"status" : "eligiendo",
"data" : jsonParse.Mensajes.Datagame.data
}
}
let headersRecive = {
method : "post",
body : JSON.stringify(datos),
headers: {"Content-Type" : "application/json"}
}
fetch(servidorVercionSendARev,headersRecive)
.then(dataserver2 => dataserver2.json())
.then(recibido => {
if(recibido.mensaje ==="ok"){
contenedorChatSpanVercionSendAndRecive.style.display = "block"
contenedorChats.innerHTML = `<video autoplay id="reaccionHost" src="${jsonParse.Mensajes.chat.video}"></video>`;
setTimeout(()=>{
inicializar()
},2000)
}
})
}
else{
if (contenedorChats.textContent != jsonParse.Mensajes.chat) {notificacionRequestChat.play();}
contenedorChatSpanVercionSendAndRecive.style.display = "block"
contenedorChats.textContent = jsonParse.Mensajes.chat;
setTimeout(()=>{
inicializar()
},2000)
}
})
// .catch(error=>{
// 	alert(error)
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
function eventoEscuchaForButton(){
if(contenedorAVerificar.style.display ==="block") {
button.addEventListener('click',()=>{
notificacionSend.play();
document.getElementById('chatWin').innerHTML = `Tu: ${inputEnvioCHats.value}`
let arrayRAM = [];
let headers = {
method : "post",
body : JSON.stringify({
"funcion" : "applicationCertification",
"name" : `${nameGameXOVersionConection}`
}),
headers : {"Content-Type" : "application/json"}
}
fetch(servidorVercionSendARev,headers)
.then(dataserver => dataserver.json())
.then(async (dataJson) => {
let jsonParse = JSON.parse(dataJson)
if (jsonParse.Mensajes.Datagame.data != undefined){
let arrayRAM = await jsonParse.Mensajes.Datagame.data;
let envioData = {
"funcion" : "conectionUsers",
"name" : `${nameGameXOVersionConection}`,
"userConection" : `${nameGameXOVersionConection}`,
"chat" : `${inputEnvioCHats.value}`,
"avatar" : " ",
"request" : "false",
"respuestaRequest" : "ok",
"Datagames":{
"status" : "eligiendo",
"data" : [
[" "," "," "],
[" "," "," "],
[" "," "," "]
]
}
}
envioData.Datagames.data = arrayRAM;
let headersSend = {
method : "post",
body : JSON.stringify(envioData),
headers : {"Content-Type" : "application/json"}
}
fetch(servidorVercionSendARev,headersSend)
.then(dataRequestServer => dataRequestServer.json())
.then( async (exito) => {
if (exito.mensaje ===  "ok"){
inputEnvioCHats.value = " "
button.style.display =  "none"
setTimeout(()=>{
button.style.display = "inline-block"
},2000)
}
})
}
})
// .catch(error=>{
// 	alert(error)
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
})
}
}
videos.forEach(e=>{
e.addEventListener('click',()=>{
enviarGesto(e.src)
})
})
enviarGesto=infoGesto=>{
videos.forEach(v=>{
v.pause()
})
promptsEnvioChats.appendChild(buttonGestos);
contenedorGestos.style.display = "none"
contenedorGestos.style.position = "absolute"
notificacionSend.play();
document.getElementById('chatWin').innerHTML = `Tu: <video autoplay id="reaccionHost" src="${infoGesto}"></video>`
let arrayRAM = [];
let headers = {
method : "post",
body : JSON.stringify({
"funcion" : "applicationCertification",
"name" : `${nameGameXOVersionConection}`
}),
headers : {"Content-Type" : "application/json"}
}
fetch(servidorVercionSendARev,headers)
.then(dataserver => dataserver.json())
.then(async (dataJson) => {
let jsonParse = JSON.parse(dataJson)
if (jsonParse.Mensajes.Datagame.data != undefined){
let arrayRAM = await jsonParse.Mensajes.Datagame.data;
let envioData = {
"funcion" : "conectionUsers",
"name" : `${nameGameXOVersionConection}`,
"userConection" : `${nameGameXOVersionConection}`,
"chat" : {
"funcion" : "gesto",
"video" : `${infoGesto}`
},
"avatar" : " ",
"request" : "false",
"respuestaRequest" : "ok",
"Datagames":{
"status" : "eligiendo",
"data" : [
[" "," "," "],
[" "," "," "],
[" "," "," "]
]
}
}
envioData.Datagames.data = arrayRAM;
let headersSend = {
method : "post",
body : JSON.stringify(envioData),
headers : {"Content-Type" : "application/json"}
}
fetch(servidorVercionSendARev,headersSend)
.then(dataRequestServer => dataRequestServer.json())
.then( async (exito) => {
if (exito.mensaje ===  "ok"){
inputEnvioCHats.value = " "
button.style.display =  "none"
setTimeout(()=>{
button.style.display = "inline-block"
},2000)
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