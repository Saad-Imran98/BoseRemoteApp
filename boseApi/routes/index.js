var express = require('express');
var router = express.Router();
const parseString = require('xml2js').parseString;
const http = require('http');
const path = require('path');

function setBassLevel(bass){
  return new Promise((resolve, reject) => {
    const body = `<bass>${bass}</bass>`;
    const options = {
      hostname: Bose_Speaker_IP,
      port: 8090,
      path: '/bass',
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml',
        'Content-Length': Buffer.byteLength(body)
      }
    }

    const req = http.post(options, res => {
      console.log(`statusCode: ${res.statusCode}`)
      res.on('data', d => {
        parseString(d, function (err, result) {
          console.log("BASS:::::", result.bass);
          if (err){
            reject(err);
          } else {
            resolve(result.bass);
          }
        });
      });
    });

    req.on('error', error => {
      reject(error);
    });
    req.end();
  })
}

function getBass() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: Bose_Speaker_IP,
      port: 8090,
      path: '/bass',
      method: 'GET'
    }

    const req = http.get(options, res => {
      console.log(`statusCode: ${res.statusCode}`)

      res.on('data', d => {
        parseString(d, function (err, result) {
          console.log("BASS:::::",result.bass);
          if (err){
            reject(err);
          } else {
            resolve(result.bass);
          }
        });
      })
    })

    req.on('error', error => {
      reject(error);
    })
    req.end()
  })
}

function getVolume() {
  return new Promise((resolve, reject) => {

    const options = {
      hostname: Bose_Speaker_IP,
      port: 8090,
      path: '/volume',
      method: 'GET'
    }

    const req = http.get(options, res => {
      console.log(`statusCode: ${res.statusCode}`)

      res.on('data', d => {
        parseString(d, function (err, result) {
          console.log("VOLUME:::::",result.volume);
          if (err){
            reject(err);
          } else {
            resolve(result.volume);
          }
        });
      })
    })

    req.on('error', error => {
      reject(error);
    })
    req.end()
  })
}

function increaseVolume() {
  return new Promise((resolve, reject) => {
    getVolume().then((res) => {
      console.log(res);
      var volume = parseInt(res.targetvolume[0]);
      volume +=1;
      const body = `<volume>${volume}</volume>`;
      const options = {
        hostname: Bose_Speaker_IP,
        port: 8090,
        path: '/volume',
        method: 'POST',
        headers: {
          'Content-Type': 'text/xml',
          'Content-Length': Buffer.byteLength(body)
        }
      }

      const req = http.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)
        res.on('data', d => {
          getVolume().then((volume) => {
            console.log(d);
            resolve(volume);
          })
        })
      })

      req.on('error', error => {
        console.log(error);
        reject(error);
      })
      req.write(body);
      req.end()
    })

  })
}

function decreaseVolume() {
  return new Promise((resolve, reject) => {
    getVolume().then((res) => {
      console.log(res);
      var volume = parseInt(res.targetvolume[0]);
      volume -=1;
      const body = `<volume>${volume}</volume>`;
      const options = {
        hostname: Bose_Speaker_IP,
        port: 8090,
        path: '/volume',
        method: 'POST',
        headers: {
          'Content-Type': 'text/xml',
          'Content-Length': Buffer.byteLength(body)
        }
      }

      const req = http.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)
        res.on('data', d => {
          getVolume().then((volume) => {
            console.log(d);
            resolve(volume);
          })
        })
      })

      req.on('error', error => {
        console.log(error);
        reject(error);
      })

      req.write(body);
      req.end()

    })
  })
}

router.use(express.static(path.resolve(__dirname, '../../boseremote/build')));

router.get('/info',function(req,res){
  res.send({'info': "welcome to the bose api made by saad imran"})
})

router.get('/getVolume', function(req,res) {
  getVolume().then((volume) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.send(volume);
  }).catch((err) => res.send(err));
})

router.post('/increaseVolume', function(req,res) {
  increaseVolume().then((volume) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.json(volume);
  }).catch((err) => res.send(err));
})

router.post('/decreaseVolume', function(req,res) {
  console.log(req);
  decreaseVolume().then((volume) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.send(volume);
  }).catch((err) => res.send(err));
})

router.get('/bass', function(req, res) {
  console.log(req);
  getBass().then((bass) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.send(bass);
  }).catch((err) => res.send(err));
})

router.post('/bass', function(req, res) {
  setBassLevel(req.bass).then((bass) => {
    res.send(bass);
  }).catch((err) => res.send(err));
})

// All other GET requests not handled before will return our React app
router.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../boseremote/build', 'index.html'));
});

module.exports = router;
