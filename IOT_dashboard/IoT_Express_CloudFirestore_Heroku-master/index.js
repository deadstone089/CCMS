const express = require('express')
const PORT = process.env.PORT || 5000
var app = express();
var fire = require('./fire')
var cors = require('cors');
var bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send(
    '<h1>Tes Express & Firebase Cloud Firestore</h1><ul><li><p><b>GET /data/esp8266</b></p></li><li><p><b>GET /data/esp32</b></p></li><li><p><b>GET /data/mkr1000</b></p></li><li><p><b>POST /data/esp8266</b>  => {brightness, moisture, analog}</p></li><li><p><b>POST /data/esp32</b>  => {brightness, moisture, analog}</p></li><li><p><b>POST /data/mkr1000</b>  => {brightness, moisture, analog}</p></li></ul>')
})

app.get('/data/esp8266', (req, res) => {
  const db = fire.firestore();
    
    var wholeData = []
	db.collection('ccms').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        wholeData.push(doc.data())
      });
      console.log(wholeData)
      res.send(wholeData)
    })
    .catch(error => {
      console.log('Error!', error);
  })
})

app.post('/data/esp8266', (req, res)=>{
  const db = fire.firestore();
	
    db.collection('ccms').doc('123').update({
      brightness: req.body.brightness,
      moisture: req.body.moisture,
      temp: req.body.temp
    });
    res.send({
      brightness: req.body.brightness,
      moisture: req.body.moisture,
      temp: req.body.temp,
      status: 'POST data success!'
  })
})


app.listen(PORT, () => {
  console.log(`Listening on ${ PORT }`)
})
