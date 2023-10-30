const subBodyJson = document.querySelector('.contenedorJson');
const elementoDeEspera = document.querySelector('.loadingConectionUsers');
const elementoDeEsperaPStatus = document.getElementById('statusConectionUsersP');
let pChatAcedorVeriVersion2 = document.querySelector('.statusConectionUsersDiv2');
let pChatAcedorVeriVersion2Status = document.getElementById('statusConectionUsers2')
const contenedorChatSpan2 = document.getElementById('spanNoti');
let subBody2 = document.querySelector('.subBody');
let loaderViajeHaciaElServidor2 = document.querySelector('.loadderViajeAlServer');
let avatarOnlineVariable;
let nameUserOnlineVariable;
let avatarLocalVariable;
let nameLocalVariable;
let serverConectionVersion;
function conectionUser(infoUsers,servidor){
nameLocalVariable = infoUsers.nameLocal;
avatarOnlineVariable = infoUsers.avatarOnline;
nameUserOnlineVariable = infoUsers.nameOnline;
avatarLocalVariable = infoUsers.avatarLocal;
serverConectionVersion = servidor;
let headers = { 
method : "post",
body : JSON.stringify({
"funcion" : "conectionUsers",
"name" : `${infoUsers.nameLocal}`,
"userConection" : `${infoUsers.nameLocal}`,
"chat" : `sobre`,
"avatar" : `${infoUsers.avatarLocal}`,
"request" : "false",
"respuestaRequest" : "ok",
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
if(respuestaJson.mensaje === "ok" ){
setTimeout(()=>{
viajerAlServer()
},1000)
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
let cuentaRegresiva2 = 3;
function viajerAlServer(){
cuentaRegresiva2--
contenedorChatSpanOne.style.display = "none"
pChatAcedorDiv.style.display = "block";
pChatAcedorVeriVersion2Status.style.display = "block"
pChatAcedorVeriVersion2.style.display = "block";
pChatAcedorVeriVersion2Status.innerHTML = `Preparando viaje al servidor nodeGames en ${cuentaRegresiva2}`;
if(cuentaRegresiva2 > 0 ) setTimeout(()=>{
viajerAlServer()
 },1000)
 if(cuentaRegresiva2 === 0){
contenedorChatSpan2.style.display ="none";
subBodyJson.style.display = "none"
subBody2.style.display = "none";
document.getElementById('introGamers').style.display = "block";
document.getElementById('cajaOne_intro_p_Class1').textContent = nameLocalVariable;
document.getElementById('cajaOne_Intro_Images').src = avatarLocalVariable;
document.getElementById('cajaTwo_Intro_Images').src = avatarOnlineVariable;
document.getElementById('cajaOne_intro_p_Class2').textContent = nameUserOnlineVariable;
setTimeout(()=>{startDataGamesXO({
nameUserLocal : nameLocalVariable,
nameUserOnline : nameUserOnlineVariable,
avatarLocal : avatarLocalVariable,
avatarOnline : avatarOnlineVariable,
status : "nook"
},false,false,serverConectionVersion)},5000)
}
}