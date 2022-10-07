const express = require('express');
const multer = require('multer');
const fs = require('fs');
const app = express();
const PORT = 3000;


app.use(express.static('public'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './images')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
const upload = multer({ storage: storage })

app.post('/upload', upload.single('photo'), (req, res) => {
    if(req.file) {
        res.json(req.file);
    }
    else throw 'error';
});

app.get('/images/:name',(req,res)=>{
    const image_name = req.params.name
    fs.readFile(`./images/${image_name}`, function(err, data) {
        if (err) throw err;
          res.writeHead(200, {'Content-Type': 'image/jpeg'});
          res.end(data); 
      });
})

app.listen(PORT, () => {
    console.log('Listening at ' + PORT );
});