let verificadorNotification = true;
let verificacionRecursividad = true;
let nameConectionRepositori;
let server = `http://${location.hostname}:8070`
async function init_veri_notification(nameParametre){
if(verificacionRecursividad){
nameConectionRepositori = nameParametre
verificacionRecursividad = false;
init_wake_up_interval()
}
}
init_wake_up=async ()=>{
let containerExamenes = document.getElementById('contentByresultaados');
if(containerExamenes.style.display === 'none' && verificadorNotification){
 	async function init_request(){ 
let data = {
	funcion : 'requestNotificationStudent',
	name : nameConectionRepositori
}
let config = {
method : 'post',
body : JSON.stringify(data),
headers : {'Content-Type':'application/json'}
}
let fethcData = await fetch(server,config);
let response = await fethcData.json();
return JSON.parse(response)
} 
let responseVeri = await init_request();
let matriz = Object.keys(responseVeri);
let filterMatriz = matriz.filter(e=> e !=  'NOREMOVE');
console.log(responseVeri)
if(filterMatriz.length > 0){
let container = document.getElementById('alertChat');
let p = document.getElementById('infoAlert');
container.style.display = 'block';
container.style.right = '1%';
p.textContent = responseVeri['alert'].data;
setTimeout(()=>{
let data = {
funcion : 'deleteAlert',
name : nameConectionRepositori
}
let config = {
method : 'post',
body : JSON.stringify(data),
headers : {'Content-Type':'application/json'}
}
fetch(server,config)
},1000)
}
}
}
init_wake_up_interval=()=>{
setInterval(init_wake_up,5000)
}
