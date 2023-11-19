let dataAguardarDelservidor2;
let avatarOnlineScriptHostConection;
let avatarLocalScriptHostConection;
let nameOnlineScriptHostConection;
let nameLocalScriptHostConection;
let servidorScriptHostConection;
let verificacionDeturnoHostConection = true;
const imgActualHostConection = document.getElementById('infoAvatarActual');
const imgSiguenteHostConection = document.getElementById('infoAvatarSiguiente');
const pInfoUsernameLocalHostConection = document.getElementById('infoStatusUsername');
const pInfoGamesStatusHostConection = document.getElementById('infoStatusGame');
const pInfoGamesContandorHostConection = document.getElementById('infoStatusContador');
const buttonsHostConection = document.querySelectorAll('.buttonsXO');
let informacionForCallback;
async function scriptJugadorConection(info){
audioSuperMarioGalaxi2.play();
verificacionDeturnoHostConection = true
informacionForCallback = info;
avatarOnlineScriptHostConection = await info.avatarOnline;
avatarLocalScriptHostConection = await info.avatarLocal;
nameOnlineScriptHostConection = await info.nameOnline;
nameLocalScriptHostConection = await info.nameLocal;
servidorScriptHostConection = await info.servidor;
imgActualHostConection.src = avatarOnlineScriptHostConection;
imgSiguenteHostConection.src = avatarLocalScriptHostConection;
enableGameFunctionVercionConectHost()
}
enableGameFunctionVercionConectHost=()=>{
imgActualHostConection.style.width = "70px"
imgActualHostConection.style.height = "70px"
imgSiguenteHostConection.style.width = "30px"
imgSiguenteHostConection.style.height = "30px"
pInfoUsernameLocalHostConection.innerHTML = nameLocalScriptHostConection;
pInfoGamesStatusHostConection.innerHTML = `${nameOnlineScriptHostConection} esta eligiendo`
let headers = {
method : "post",
body : JSON.stringify({
"funcion" : "applicationCertification",
"name" : `${nameLocalScriptHostConection}`
}),
headers :{"Content-Type": "application/json"}
}
fetch(servidorScriptHostConection,headers)
.then(dataServerRequest => dataServerRequest.json())
.then(async (dataServerRequestJson) => {
let datajsonParse = await JSON.parse(dataServerRequestJson)
let arrayforDataGame = await datajsonParse.Mensajes.Datagame.data;
dataAguardarDelservidor2 = arrayforDataGame; 
let buttonNumber1 = document.getElementById('buttonsNumber1')
let buttonNumber2 = document.getElementById('buttonsNumber2')
let buttonNumber3 = document.getElementById('buttonsNumber3')
let buttonNumber4 = document.getElementById('buttonsNumber4')
let buttonNumber5 = document.getElementById('buttonsNumber5')
let buttonNumber6 = document.getElementById('buttonsNumber6')
let buttonNumber7 = document.getElementById('buttonsNumber7')
let buttonNumber8 = document.getElementById('buttonsNumber8')
let buttonNumber9 = document.getElementById('buttonsNumber9')
buttonNumber1.textContent = arrayforDataGame[0][0];
buttonNumber2.textContent = arrayforDataGame[0][1];
buttonNumber3.textContent = arrayforDataGame[0][2];
buttonNumber4.textContent = arrayforDataGame[1][0];
buttonNumber5.textContent = arrayforDataGame[1][1];
buttonNumber6.textContent = arrayforDataGame[1][2];
buttonNumber7.textContent = arrayforDataGame[2][0];
buttonNumber8.textContent = arrayforDataGame[2][1];
buttonNumber9.textContent = arrayforDataGame[2][2];
if (datajsonParse.Mensajes.Datagame.status === "eligiendo" || datajsonParse.Mensajes.Datagame.status === "listoOH" || datajsonParse.Mensajes.Datagame.status === "esperando") {
verificacionDeturnoHostConection = false;
verificacionWIN({
verificacionHost : true,
jugadorX : {
name : nameLocalScriptHostConection,
avatar : avatarLocalScriptHostConection
},
jugadorO : {
name : nameOnlineScriptHostConection,
avatar : avatarOnlineScriptHostConection
}
},informacionForCallback,nameLocalScriptHostConection,avatarLocalScriptHostConection)
if(document.querySelector('.contenedorQuestionPerdedor').style.display === "none" && document.querySelector('.contenedorQuestionGanador').style.display === "none" ){
setTimeout(()=>{enableGameFunctionVercionConectHost()},500)
}
}
else if(datajsonParse.Mensajes.Datagame.status === "listoLH"){
verificacionWIN({
verificacionHost : true,
jugadorX : {
name : nameLocalScriptHostConection,
avatar : avatarLocalScriptHostConection
},
jugadorO : {
name : nameOnlineScriptHostConection,
avatar : avatarOnlineScriptHostConection
}
},informacionForCallback,nameLocalScriptHostConection,avatarLocalScriptHostConection)
verificacionDeturnoHostConection = true
callInicializadorDeGames()
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
callInicializadorDeGames=()=>{
imgActualHostConection.style.width = "30px"
imgActualHostConection.style.height = "30px"
imgSiguenteHostConection.style.width = "70px"
imgSiguenteHostConection.style.height = "70px"
pInfoUsernameLocalHostConection.innerHTML = nameLocalScriptHostConection;
pInfoGamesStatusHostConection.innerHTML = `Tu turno ¡acabalo!`;
buttonsHostConection.forEach(button=>{
button.addEventListener('click', ()=>{
if(button.textContent === " " && verificacionDeturnoHostConection){
button.textContent = "O";
const promesaVerificarLugarDeButtonsVercionConectHost = new Promise(resolve => {
let id = button.getAttribute("id")
if(id === "buttonsNumber1") resolve([0,0]);
else if(id === "buttonsNumber2") resolve([0,1]);
else if(id === "buttonsNumber3") resolve([0,2]);
else if(id === "buttonsNumber4") resolve([1,0]);
else if(id === "buttonsNumber5") resolve([1,1]);
else if(id === "buttonsNumber6") resolve([1,2]);
else if(id === "buttonsNumber7") resolve([2,0]);
else if(id === "buttonsNumber8") resolve([2,1]);
else if(id === "buttonsNumber9") resolve([2,2]);
})
.then(dataPosition=>{
let dataEnvio = {
"funcion" : "conectionUsers",
"name" : `${nameLocalScriptHostConection}`,
"userConection" : `${nameLocalScriptHostConection}`,
"chat" : ` `,
"avatar" : " ",
"request" : "false",
"respuestaRequest" : "ok",
"Datagames":{
"status" : "listoOH",
"data" : [
[" "," "," "],
[" "," "," "],
[" "," "," "]
]
}
}
let ordenandorDelNuevoDato = dataAguardarDelservidor2[dataPosition[0]].splice(dataPosition[1],1,"O")
dataEnvio.Datagames.data = dataAguardarDelservidor2;
let headers = {
method : "post",
body : JSON.stringify(dataEnvio),
headers : {"Content-Type" : "application/json"}
}
fetch(servidorScriptHostConection,headers)
.then(dataServerRequests => dataServerRequests.json())
.then(request => {
if(request.mensaje === "ok"){
enableGameFunctionVercionConectHost()
verificacionDeturnoHostConection = false;
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
}else{
button.style.background = "red";
setTimeout(()=>{button.style.background = "black"},500)
}})})}