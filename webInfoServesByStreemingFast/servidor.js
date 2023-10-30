const express = require('express');
const app = express();
const fs = require('fs');
const open = require('opn');
let ip;
const port = '8050'
const filePath = '../../ip/ip.txt';
try{
	ip = fs.readFileSync(filePath, 'utf8').trim();
	console.log('Servidor streming fast activo')
} catch (error) {
  console.error('Error al leer el archivo ip.txt:',error);
}

app.use(express.static('public'));

app.listen(port, ip, ()=> {
         console.log(`Servidor cliente conectado en ${ip}:${port}`)
          open(`http://${ip}:${port}`);
})