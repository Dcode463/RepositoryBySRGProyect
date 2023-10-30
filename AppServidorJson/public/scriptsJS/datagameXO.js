const subViajeAlServidor = document.querySelector('.loadderViajeAlServer')
const gamescontainer = document.querySelector('.gamesByDcode');
const contenedorJson = document.querySelector('.contenedorJson');
const pChatBotJson = document.getElementById('statusConectionUsers2');
let userHost;
let gamerX;
let gamerO;
let userOnline;
let userLocal;
let userAvatarOnline;
let userAvatarLocal;
let servidorXO;
let whatWin;
function startDataGamesXO(infoGamesUsers,whatHost,error,server){
document.getElementById('introGamers').style.opacity = "0";
	setTimeout(()=>{
document.getElementById('introGamers').style.display = "none";
gamescontainer.style.display = "block";
gamescontainer.style.opacity = "1";
userLocal = infoGamesUsers.nameUserLocal;
userOnline = infoGamesUsers.nameUserOnline;
userAvatarLocal = infoGamesUsers.avatarLocal;
userAvatarOnline = infoGamesUsers.avatarOnline;
servidorXO = server;
if(infoGamesUsers.status === "error") {
gamescontainer.style.display = "none";
contenedorJson.style.display = "block";
pChatBotJson.innerHTML = `<p>Tu amigo se salio del juego</p>`;
}
else if(infoGamesUsers.status === "ok"){
funcionJugadorHostRecopilacionDeDatos({
nameLocal : infoGamesUsers.nameUserLocal,
avatarLocal : infoGamesUsers.avatarLocal,
nameOnline : infoGamesUsers.nameUserOnline,
avatarOnline : infoGamesUsers.avatarOnline,
servidor : servidorXO
})
}
else if (infoGamesUsers.status === "nook"){
scriptJugadorConection({
nameLocal :  infoGamesUsers.nameUserLocal,
avatarLocal : infoGamesUsers.avatarLocal,
nameOnline : infoGamesUsers.nameUserOnline,
avatarOnline : infoGamesUsers.avatarOnline,
servidor : servidorXO
})
}
{
}
	},1000)
}