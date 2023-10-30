let  coronaPng = document.querySelector('.coronaPng')
let corona =  document.querySelector('.corona')
let avatarPerdedorWin2 = document.getElementById('imgPerdedor')
const contenedorWin = document.querySelector('.cajaGanador');
const contenedorNowin = document.querySelector('.cajaPerdedor')
const contenedorGameXO = document.querySelector('.gamesByDcode');
const severVerificacion = servidor;
const containerWIN = document.querySelector('.containerWIN');
const buttonVolverAjugar = document.getElementById('buttonVolverAjugarXO');
const imgGanador = document.getElementById('imgGanador');
const userWin = document.getElementById('userWin')
const userWin2 = document.getElementById('userWin2')
const buttonEnvioPromtsChats = document.getElementById('shareInputText');
const infoWin = document.querySelector('.infoWin')
const imgSpanNOtification = document.getElementById('imgSpanNOtification');
let rebootBydataGame = document.getElementById('rebootBydataGame');
rebootBydataGame.addEventListener('click',()=>{
location.reload();
})
let whatHOst;
let infoCallback;
let nameJugadorLocalVersionVerificacionWin;
let avatarJugadorLocalVersionVerificacionWin;
async function verificacionWIN(info,infoForCallback,jugadorLocal,avatarLocal){
nameJugadorLocalVersionVerificacionWin = jugadorLocal;
avatarJugadorLocalVersionVerificacionWin = avatarLocal;
infoCallback = infoForCallback;
let retornar;
let headers = {
"method" : "post",
"body" : JSON.stringify({
"funcion" : "applicationCertification",
"name" : `${info.jugadorX.name}` 
}),
"headers" : {"Content-Type" : "application/json"}
}
fetch(severVerificacion,headers)
.then(dataserver => dataserver.json())
.then( async (respuestJson) => {
let jsonParse = await JSON.parse(respuestJson);
let dataArray = await jsonParse.Mensajes.Datagame.data;
const promesaVerificacionWIN =  new Promise(resolve => {
////////////////////////////////////horizontal
if(dataArray[0][0] != " " && dataArray[0][0] === dataArray[0][1] && dataArray[0][1] === dataArray[0][2]) resolve({status : true, position : "Horizontal[0]",ganador : dataArray[0][0]})
else if(dataArray[1][0] != " " && dataArray[1][0] === dataArray[1][1] && dataArray[1][1] === dataArray[1][2]) resolve({status : true, position : "Horizontal[1]",ganador : dataArray[1][0]})
else if(dataArray[2][0] != " " && dataArray[2][0] === dataArray[2][1] && dataArray[2][1] === dataArray[2][2]) resolve({status : true, position : "Horizontal[2]",ganador : dataArray[2][0]})
/////////////////////////////////vertical
else if(dataArray[0][0] != " " && dataArray[0][0] === dataArray[1][0] && dataArray[1][0] === dataArray[2][0]) resolve({status : true, position : "vertical[0]",ganador : dataArray[0][0]})	
else if(dataArray[0][1] != " " && dataArray[0][1] === dataArray[1][1] && dataArray[1][1] === dataArray[2][1]) resolve({status : true, position : "vertical[1]",ganador : dataArray[0][1]})	
else if(dataArray[0][2] != " " && dataArray[0][2] === dataArray[1][2] && dataArray[1][2] === dataArray[2][2]) resolve({status : true, position : "vertical[2]",ganador : dataArray[0][2]})
///////////////////////////////diagonal
else if(dataArray[0][0] != " " && dataArray[0][0] === dataArray[1][1] && dataArray[1][1] === dataArray[2][2]) resolve({status : true, position : "diagonal[0]",ganador : dataArray[0][0]})	
else if(dataArray[0][2] != " " && dataArray[0][2] === dataArray[1][1] && dataArray[1][1]=== dataArray[2][0]) resolve({status : true, position : "diagonal[2]",ganador : dataArray[0][2]})	
else if(dataArray[0][0] != " " && dataArray[0][1] != " " && dataArray[0][2] != " " && 
        dataArray[1][0] != " " && dataArray[1][1] != " " && dataArray[1][2] != " " &&
        dataArray[2][0] != " " && dataArray[2][1] != " " && dataArray[2][2] != " "
){
resolve({status: true, position : "empate", ganador :"empate"})}
else {
resolve({
status : false
})
}
})
.then(resultado => {
if(resultado.status === true){
	if(resultado.ganador === "empate") inicializarGamesChat(info,resultado.ganador,resultado.position)
else iniciarContenedorWIN(info,resultado.ganador,resultado.position)
}
})
})
}
iniciarContenedorWIN=(infoGanador,ganador,position)=>{ 
whatHOst = infoGanador.verificacionHost;
if(ganador === "X"){
if (whatHOst) {
peticionQuestionFor2({
nameGanador : infoGanador.jugadorX.name,
avatarGanador : infoGanador.jugadorX.avatar,
namePerdedor : infoGanador.jugadorO.name,
avatarPerdedor : infoGanador.jugadorO.avatar,
infoGanador : infoGanador,
ganador : ganador,
position : position  
},severVerificacion)
}else{
peticionQuestionFor({
nameGanador : infoGanador.jugadorO.name,
avatarGanador : infoGanador.jugadorO.avatar,
namePerdedor : infoGanador.jugadorX.name,
avatarPerdedor : infoGanador.jugadorX.avatar,
infoGanador : infoGanador,
ganador : ganador,
position : position
},severVerificacion)
}
}else{
if (whatHOst) {
peticionQuestionFor({
nameGanador : infoGanador.jugadorX.name,
avatarGanador : infoGanador.jugadorX.avatar,
namePerdedor : infoGanador.jugadorO.name,
avatarPerdedor : infoGanador.jugadorO.avatar,
infoGanador : infoGanador,
ganador : ganador,
position : position  
},severVerificacion)
}else{
peticionQuestionFor2({
nameGanador : infoGanador.jugadorO.name,
avatarGanador : infoGanador.jugadorO.avatar,
namePerdedor : infoGanador.jugadorX.name,
avatarPerdedor : infoGanador.jugadorX.avatar,
infoGanador : infoGanador,
ganador : ganador,
position : position
},severVerificacion)
}
}
}
function inicializarGamesChat(infoGanador,ganador,position){
audioSuperMarioGalaxi2.pause()
whatHOst = infoGanador.verificacionHost;
const contenedorPadrePlus = document.querySelector('.usersContainer').innerHTML = " ";
if(ganador === "X"){
volverAjugar(infoGanador)
if (infoGanador.verificacionHost === false) buttonVolverAjugar.style.display = "none" 
contenedorGameXO.style.display = "none";
contenedorWin.style.display = "block"; //
contenedorNowin.style.display = "block";
if(whatHOst){
imgGanador.src = infoGanador.jugadorX.avatar;
avatarPerdedorWin2.src = infoGanador.jugadorO.avatar;
userWin2.textContent = infoGanador.jugadorO.name;
userWin.textContent = infoGanador.jugadorX.name;
corona.setAttribute("src","iconos/corona.png")
coronaPng.setAttribute("src","iconos/cacasion.png")
inicarChatSpan({
nameConection : infoGanador.jugadorX.name,
infoAvtar : {
name : infoGanador.jugadorO.name,
avatar : infoGanador.jugadorO.avatar
} 
})
}	
else { 
imgGanador.src = infoGanador.jugadorO.avatar;
avatarPerdedorWin2.src = infoGanador.jugadorX.avatar;
userWin2.textContent = infoGanador.jugadorX.name;
userWin.textContent = infoGanador.jugadorO.name;
coronaPng.setAttribute("src","iconos/corona.png")
corona.setAttribute("src","iconos/cacasion.png")
inicarChatSpan({
nameConection : infoGanador.jugadorO.name,
infoAvtar : {
name : infoGanador.jugadorX.name,
avatar : infoGanador.jugadorX.avatar
} 
})
}
setTimeout(()=>{
containerWIN.style.display  = "block"
},500)
}
else if(ganador === "O"){  
volverAjugar(infoGanador)
if (infoGanador.verificacionHost === false) buttonVolverAjugar.style.display = "none" 
contenedorGameXO.style.display = "none";
contenedorWin.style.display = "block";
contenedorNowin.style.display = "block";
if(whatHOst){
imgGanador.src = infoGanador.jugadorX.avatar;
avatarPerdedorWin2.src = infoGanador.jugadorO.avatar;
userWin2.textContent = infoGanador.jugadorO.name;
userWin.textContent = infoGanador.jugadorX.name;
corona.setAttribute("src","iconos/cacasion.png")
coronaPng.setAttribute("src","iconos/corona.png")
inicarChatSpan({
nameConection : infoGanador.jugadorX.name,
infoAvtar : {
name : infoGanador.jugadorO.name,
avatar : infoGanador.jugadorO.avatar
} 
})
}	
else {
imgGanador.src = infoGanador.jugadorO.avatar;
avatarPerdedorWin2.src = infoGanador.jugadorX.avatar;
userWin2.textContent = infoGanador.jugadorX.name;
userWin.textContent = infoGanador.jugadorO.name;
coronaPng.setAttribute("src","iconos/cacasion.png")
corona.setAttribute("src","iconos/corona.png")
inicarChatSpan({
nameConection : infoGanador.jugadorO.name,
infoAvtar : {
name : infoGanador.jugadorX.name,
avatar : infoGanador.jugadorX.avatar
} 
})
}
setTimeout(()=>{
containerWIN.style.display  = "block"
},500)
}
else if (ganador === "empate"){
volverAjugar(infoGanador)
if (infoGanador.verificacionHost === false) buttonVolverAjugar.style.display = "none" 
contenedorGameXO.style.display = "none";
contenedorWin.style.display = "block";
contenedorNowin.style.display = "block";
inicarChatSpan({
nameConection : infoGanador.jugadorX.name,
infoAvtar : {
name : infoGanador.jugadorX.name,
avatar : infoGanador.jugadorX.avatar
} 
})
setTimeout(()=>{
containerWIN.style.display  = "block"
},500)
	imgGanador.src = "mediaChatBot/acedor.gif";
	userWin.textContent = "Empate";
}
}
function volverAjugar(infoGanador){
if(whatHOst){
buttonVolverAjugar.addEventListener('click',()=>{
let headers = {
method : "post",
body : JSON.stringify(
{
"funcion" : "conectionUsers",
"name" : `${infoGanador.jugadorX.name}`,
"userConection" : `${infoGanador.jugadorX.name}`,
"chat" : ` `,
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
),
headers : {"Content-Type" : "application/json"}
}
fetch(severVerificacion,headers)
.then(dataserver => dataserver.json())
.then( async (dataRespuestaJsonP) => {
let dataRespuestaJson = await dataRespuestaJsonP;
if (dataRespuestaJson.mensaje === "error") {document.querySelector('.errorSever').style.display = "block"; contenedorGameXO.style.display = "none"}
else{
contenedorGameXO.style.display = "block";
scriptJugadorConection(infoCallback)
contenedorGameXO.style.opacity = "0";
contenedorWin.style.display = "none";
contenedorNowin.style.display = "none";
setTimeout(()=>{contenedorGameXO.style.opacity = "1"},1000)
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
else{
verificacionDeVolverAjugarForHots(infoGanador)
}
}
function verificacionDeVolverAjugarForHots(infoGanador){
let headers = {
method : "post",
body : JSON.stringify({
"funcion" : "applicationCertification",
"name" : `${infoGanador.jugadorX.name}`
}),
headers : {"Content-Type" : "application/json"}
}
fetch(severVerificacion, headers)
.then(respuestaServer => respuestaServer.json())
.then( async (respuestJson) => {
let respuestaParse = await JSON.parse(respuestJson)
let dataArrayModi = await respuestaParse.Mensajes.Datagame.data;
if(respuestJson.mensaje === "error"){
document.querySelector('.errorSever').style.display = "block"; contenedorGameXO.style.display = "none";
}
else if(dataArrayModi[0][0] === " " && dataArrayModi[0][1] === " " && dataArrayModi[0][2] === " " && 
dataArrayModi[1][0] === " " && dataArrayModi[1][1] === " " && dataArrayModi[1][2] === " " && 
dataArrayModi[2][0] === " " && dataArrayModi[2][1] === " " && dataArrayModi[2][2] === " " 
){
contenedorGameXO.style.display = "block";
contenedorGameXO.style.opacity = "0";
contenedorWin.style.display = "none";
contenedorNowin.style.display = "none";
funcionJugadorHostRecopilacionDeDatos(infoCallback)
setTimeout(()=>{contenedorGameXO.style.opacity = "1"},1000)	
}
else{
setTimeout(()=>{verificacionDeVolverAjugarForHots(infoGanador)},2000)
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