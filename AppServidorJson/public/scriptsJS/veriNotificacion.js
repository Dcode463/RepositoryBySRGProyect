const notificacionI = document.getElementById('Isolicitud');
let pChatAcedorVeriVersion = document.querySelector('.statusConectionUsersDiv2');
let pChatAcedorP = document.getElementById('statusConectionUsers2')
const contenedorChatSpan = document.getElementById('spanNoti');
let imglocal = document.getElementById('imgNavUsers')
let verificacionDerecursividad = true;
let users;
let serverlist;
function startVerificacionNotificacionForUsers(user,servidor){
serverlist = servidor;
users = user
const arrayNotifications = [];
let headers = {
method : "post",
body : JSON.stringify({
"name" : `${user}`,
"funcion" : "applicationCertification",
}),
headers:{"Content-Type" : "application/json"}
}
let buttonCancelarBusquedaNotificacion = document.querySelectorAll('.cancelarVerificacionForNotificacion');
buttonCancelarBusquedaNotificacion.forEach(e=>{
e.addEventListener("click",()=>{
verificacionDerecursividad = false;
pChatAcedorP.innerHTML = "<p>Vericacion cancelada</p>";
setTimeout(()=>{
pChatAcedorP.innerHTML = "<p>Esperando tu prompt</p>"
document.querySelector('.nav').style.opacity = "1";
let buttonsOPacity = document.querySelectorAll('.buttonsNav')
buttonsOPacity.forEach(e=>{
e.style.display = "inline-block"
verificacionDerecursividad = true
})
},1000) 
})
})
fetch(servidor,headers)
.then(respuestaServer => respuestaServer.json())
.then( async (respuestaJson) => { 
let respuestaModificadaJson = await JSON.parse(respuestaJson);
if (respuestaModificadaJson["Mensajes"].request === " " || respuestaModificadaJson["Mensajes"].request === "false" || respuestaModificadaJson["Mensajes"].request === undefined){
if(verificacionDerecursividad){
contenedorChatSpan.style.display = "none";
pChatAcedorVeriVersion.style.display = "inline-block";
setTimeout(()=>{startVerificacionNotificacionForUsers(user,servidor)},1000)
}
}
else if(respuestaModificadaJson["Mensajes"].request === "true"){
callChatConection({
chat : respuestaModificadaJson["Mensajes"].chat,
nameUserChat : respuestaModificadaJson["Mensajes"].userName,
avatarUserChat : respuestaModificadaJson["Mensajes"].avatar 
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
function callChatConection(invitacionInfo){
notificacionRequestChat.play()
const elementoAVerificar = document.querySelector('.chatSpan');
if (contenedorChatSpan.contains(elementoAVerificar)) contenedorChatSpan.removeChild(elementoAVerificar)
let fragmento = new DocumentFragment();
let div = document.createElement('DIV'); div.classList.add('chatSpan');
let img = document.createElement('IMG'); img.src = invitacionInfo.avatarUserChat;
let p1 = document.createElement('P'); p1.innerHTML = invitacionInfo.nameUserChat;
let p2 = document.createElement('P');p2.innerHTML = invitacionInfo.chat;
let buttonTrue  = document.createElement('BUTTON'); buttonTrue.textContent = "Vamos"; buttonTrue.setAttribute('id','buttonTrueId'); buttonTrue.style.margin ="5px"
let buttonFalse = document.createElement('BUTTON'); buttonFalse.textContent = "No, tengo miedo"; buttonFalse.setAttribute('id','buttonFalseId'); buttonFalse.style.margin = "5px"
div.appendChild(img);
div.appendChild(p1);
div.appendChild(p2);
div.appendChild(buttonTrue);
div.appendChild(buttonFalse);
fragmento.appendChild(div);
contenedorChatSpan.appendChild(fragmento) 
contenedorChatSpan.style.display = "inline-block";
pChatAcedorVeriVersion.style.display = "none"
const buttonTrueElement = document.getElementById('buttonTrueId')
const buttonFalseElement = document.getElementById('buttonFalseId')
if (buttonFalseElement === undefined || buttonTrueElement === undefined) alert("error al aceptar invitacion")
else if (buttonFalseElement != undefined || buttonTrueElement != undefined){
buttonFalseElement.addEventListener('click', ()=>{
let headers = { 
method : "post",
body : JSON.stringify({
"funcion" : "conectionUsers",
"name" : `${users}`,
"userConection" : `${users}`,
"chat" : `No, porque me gustan los unicornios :)`,
"avatar" : `${imglocal.src}`,
"request" : "false",
"respuestaRequest" : "false",
"Datagames":{
"status" : "esperando",
"data" : [
[" "," "," "],
[" "," "," "],
[" "," "," "]
]
}
}),
headers:{"Content-Type" : "application/json"}
}
fetch(servidor,headers)
.then(respuestaServer => respuestaServer.json())
.then(respuestaJson => {
if (respuestaJson.mensaje === "ok" ){
contenedorChatSpanOne.style.display = "none"
pChatAcedorDiv.style.display = "block";
pChatAcedorVeriVersion2Status.style.display = "block"
pChatAcedorVeriVersion2.style.display = "block";
pChatAcedorVeriVersion2Status.innerHTML = '<p>Le dije a tu amigo que le tienes miedo :)</p>';
setTimeout(()=>{
document.querySelector('.nav').style.opacity = "1";
let buttonsOPacity = document.querySelectorAll('.buttonsNav')
buttonsOPacity.forEach(e=>{
e.style.display = "inline-block"
verificacionDerecursividad = true
})
pChatAcedorVeriVersion2Status.innerHTML = "<p>Esperando tu prompt</p>"
},1500)
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
})
buttonTrueElement.addEventListener('click', ()=>{
buttonTrueElement.style.background = "green"
buttonTrueElement.style.color = "white"
conectionUser({ 
nameOnline : invitacionInfo.nameUserChat,
avatarOnline : invitacionInfo.avatarUserChat,
nameLocal : users,
avatarLocal : imglocal.src  
},serverlist)
})
}
}
