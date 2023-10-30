const cors = require('cors');
const express = require('express');
const app = express();
const port = '8060'
let ip;
const filePath = '../../ip/ip.txt';
const fs = require('fs')

try {
  ip = fs.readFileSync(filePath, 'utf8').trim();
  console.log(`Kipp: cambie el ip por ti :)`);

} catch (error) {
  console.error(`Kipp: lo siento amigo, paso algo :(`);
}

app.use(express.static('public'));

app.listen(port,ip, ()=>{
	console.log(`Eschool Server, listo en http://${ip}:${port}`)
})