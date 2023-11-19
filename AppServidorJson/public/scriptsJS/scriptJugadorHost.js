let avatarOnlineScriptHost;
let avatarLocalScriptHost;
let nameOnlineScriptHost;
let nameLocalScriptHost;
let servidorScriptHost;
let dataAguardarDelservidor;
let verificacionDeturno = true;
const imgActual = document.getElementById('infoAvatarActual');
const imgSiguente = document.getElementById('infoAvatarSiguiente');
const pInfoUsernameLocal = document.getElementById('infoStatusUsername');
const pInfoGamesStatus = document.getElementById('infoStatusGame');
const pInfoGamesContandor = document.getElementById('infoStatusContador');
const buttons = document.querySelectorAll('.buttonsXO');
let inforForCallBackHost;
async function funcionJugadorHostRecopilacionDeDatos(info){
verificacionDeturno = true;
inforForCallBackHost = info;
avatarOnlineScriptHost = await info.avatarOnline;
avatarLocalScriptHost = await info.avatarLocal;
nameOnlineScriptHost = await info.nameOnline;
nameLocalScriptHost = await info.nameLocal;
servidorScriptHost = await info.servidor;
imgActual.src = avatarLocalScriptHost;
imgSiguente.src = avatarOnlineScriptHost;
if(avatarOnlineScriptHost != null && avatarLocalScriptHost != null &&  nameLocalScriptHost != null && nameOnlineScriptHost != null) inicializarGame()
}
inicializarGame=()=>{
audioSuperMarioGalaxi2.play();
let headers = {
method : "post",
body : JSON.stringify({
"funcion" : "applicationCertification",
"name" : `${nameOnlineScriptHost}`
}),
headers : {"Content-Type" : "application/json"}
}
fetch(servidorScriptHost,headers)
.then(serverdataVerificacionArray => serverdataVerificacionArray.json())
.then( async (severdataS) => {
let buttonNumber1 = document.getElementById('buttonsNumber1')
let buttonNumber2 = document.getElementById('buttonsNumber2')
let buttonNumber3 = document.getElementById('buttonsNumber3')
let buttonNumber4 = document.getElementById('buttonsNumber4')
let buttonNumber5 = document.getElementById('buttonsNumber5')
let buttonNumber6 = document.getElementById('buttonsNumber6')
let buttonNumber7 = document.getElementById('buttonsNumber7')
let buttonNumber8 = document.getElementById('buttonsNumber8')
let buttonNumber9 = document.getElementById('buttonsNumber9')
let severdata = await JSON.parse(severdataS) 
let arrayforDataGame = await severdata.Mensajes.Datagame.data;
dataAguardarDelservidor = arrayforDataGame;
buttonNumber1.textContent = arrayforDataGame[0][0];
buttonNumber2.textContent = arrayforDataGame[0][1];
buttonNumber3.textContent = arrayforDataGame[0][2];
buttonNumber4.textContent = arrayforDataGame[1][0];
buttonNumber5.textContent = arrayforDataGame[1][1];
buttonNumber6.textContent = arrayforDataGame[1][2];
buttonNumber7.textContent = arrayforDataGame[2][0];
buttonNumber8.textContent = arrayforDataGame[2][1];
buttonNumber9.textContent = arrayforDataGame[2][2];
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
imgActual.style.width = "70px"
imgActual.style.height = "70px"
imgSiguente.style.width = "30px"
imgSiguente.style.height = "30px"
pInfoUsernameLocal.textContent = nameLocalScriptHost;
pInfoGamesStatus.innerHTML = `Tu turno ¡acabalo!`;
buttons.forEach(button => {
button.addEventListener('click', ()=>{
if(button.textContent === " " && verificacionDeturno){
button.textContent = "X"
const promesaVerificarLugarDeButtons = new Promise(resolve => {
let id = button.getAttribute("id")
if(id === "buttonsNumber1") resolve([0,0])
else if(id === "buttonsNumber2") resolve([0,1])
else if(id === "buttonsNumber3") resolve([0,2])
else if(id === "buttonsNumber4") resolve([1,0])
else if(id === "buttonsNumber5") resolve([1,1])
else if(id === "buttonsNumber6") resolve([1,2])
else if(id === "buttonsNumber7") resolve([2,0])
else if(id === "buttonsNumber8") resolve([2,1])
else if(id === "buttonsNumber9") resolve([2,2])
})
.then(dataPosition => {
let dataEnvio = {
"funcion" : "conectionUsers",
"name" : `${nameOnlineScriptHost}`,
"userConection" : `${nameOnlineScriptHost}`,
"chat" : ` `,
"avatar" : " ",
"request" : "false",
"respuestaRequest" : " ",
"Datagames":{
"status" : "listoLH",
"data" : [
[" "," "," "],
[" "," "," "],
[" "," "," "]
]
}
}
let ordenandorDelNuevoDato = dataAguardarDelservidor[dataPosition[0]].splice(dataPosition[1],1,"X")
dataEnvio.Datagames.data = dataAguardarDelservidor;
let headers ={
method : "post",
body : JSON.stringify(dataEnvio),
headers : {"Content-Type" : "application/json"}
}
fetch(servidorScriptHost,headers)
.then(respuestaServerScriptHost => respuestaServerScriptHost.json())
.then(async(respuestaSeverJsonScriptHostP)=> { 
let respuestaSeverJsonScriptHost = await respuestaSeverJsonScriptHostP;
if(respuestaSeverJsonScriptHost.mensaje === "ok"){funcionEsperandoJugadorOnline(); verificacionDeturno = false}})
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
}else{  button.style.background = "red";
setTimeout(()=>{button.style.background = "black"},1000)}})
})
}
funcionEsperandoJugadorOnline=()=>{
let headers = { 
method : "post",
body : JSON.stringify({
"funcion" : "applicationCertification",
"name" : `${nameOnlineScriptHost}`
}),
headers : {"Content-Type" : "application/json"}
}
fetch(servidorScriptHost,headers)
.then(dataserver => dataserver.json())
.then(async (respuesta) => {
try{
let respuestaJSON = await JSON.parse(respuesta)
if (respuestaJSON.Mensajes.Datagame.status === "eligiendo" || respuestaJSON.Mensajes.Datagame.status === "listoLH"){
imgActual.style.width = "70px"
imgActual.style.height = "70px"
imgSiguente.style.width = "50px"
imgSiguente.style.height = "50px"
pInfoUsernameLocal.innerHTML = `${nameLocalScriptHost}`;
pInfoGamesStatus.innerHTML = `${nameOnlineScriptHost} esta eligiendo`;
verificacionWIN({
verificacionHost : false,
jugadorX : {
name : nameOnlineScriptHost,
avatar : avatarOnlineScriptHost
},
jugadorO : {
name : nameLocalScriptHost,
avatar : avatarLocalScriptHost
}
},inforForCallBackHost,nameLocalScriptHost,avatarLocalScriptHost)
if(document.querySelector('.contenedorQuestionPerdedor').style.display === "none" && document.querySelector('.contenedorQuestionGanador').style.display === "none" ){
setTimeout(()=> funcionEsperandoJugadorOnline(),500)
}
}
if(respuestaJSON.Mensajes.Datagame.status === "listoOH"){
verificacionWIN({
verificacionHost : false,
jugadorX : {
name : nameOnlineScriptHost,
avatar : avatarOnlineScriptHost
},
jugadorO : {
name : nameLocalScriptHost,
avatar : avatarLocalScriptHost
}
},inforForCallBackHost,nameLocalScriptHost,avatarLocalScriptHost)
verificacionDeturno = true
inicializarGame()
}
}
catch(e){
alert("Hay un error en tu sistema esto por lo general ocurre cuando tu telefono o tu internet es demasiado lento, vota eso y comprate algo bueno :)")
funcionEsperandoJugadorOnline()
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