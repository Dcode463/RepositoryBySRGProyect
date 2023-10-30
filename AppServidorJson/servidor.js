// const cors= require('cors')
// const express = require('express');
// const app = express();
// const port = process.env.PORT  || "8090";

// app.use(cors())

// app.use((req, res, next)=>{
// 	res.header('Access-Control-Allow-Origin','*')
// 	res.header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE')
// 	res.header('Access-Control-Allow-Headers','Origin, X-Requested.With, Content-Type, Accept')
// 	next()
// })

// app.use(express.static('public'));

// app.listen(port)
// 	 console.log(`Servidor cliente conectado en ${port}`)
const cors= require('cors')
const express = require('express');
const app = express();
const fs = require('fs')
let ip;
const port = "8090";

const filePath = '../../ip/ip.txt';
try {
  ip = fs.readFileSync(filePath, 'utf8').trim();
  console.log('kipp : cambie el ip por ti :)');
} catch (error) {
  console.error('Error al leer el archivo ip.txt:',error);
}

app.use(cors())

app.use((req, res, next)=>{
        res.header('Access-Control-Allow-Origin','*')
        res.header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE')
        res.header('Access-Control-Allow-Headers','Origin, X-Requested.With, Content-Type, Accept')
        next()
})

app.use(express.static('public'));

app.listen(port, ip, ()=> {
         console.log(`Servidor cliente conectado en ${ip}:${port}`)
})