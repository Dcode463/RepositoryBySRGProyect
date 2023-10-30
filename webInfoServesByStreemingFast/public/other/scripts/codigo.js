const buttonIniciarSRG = document.getElementById('buttonSRG')
const buttonIniciarHSRG = document.getElementById('buttonHSRG')
const urlIPHost = document.getElementById('urlIPHost');
let urlIp
let rutaHSRG;
let rutaSRG;
rutaHSRG = `http://${location.hostname}:8060`;
rutaSRG = `http://${location.hostname}:8090`;
urlIPHost.innerHTML= rutaSRG
buttonIniciarSRG.addEventListener('click',()=>{
	window.open(rutaSRG)
})
buttonIniciarHSRG.addEventListener('click',()=>{
	window.open(rutaHSRG)
})


  var qrcode = new QRCode(document.getElementById("containerQR"), {
    text: rutaSRG,
    width: 128,
    height: 128,
  });

