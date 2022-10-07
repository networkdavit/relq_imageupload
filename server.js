const express = require('express');
const multer = require('multer');

let id = 0
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + id   )
    }
  })
  
const upload = multer({ storage: storage })
const fs = require('fs');


const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.post('/upload', upload.single('photo'), (req, res) => {
    id ++
    if(req.file) {
        res.json(req.file);
    }
    else throw 'error';
});

app.get('/images/:id',(req,res)=>{
    const image_id = req.params.id
    fs.readFile(`./uploads/images/photo${image_id}`, function(err, data) {
        if (err) throw err;
          res.writeHead(200, {'Content-Type': 'image/jpeg'});
          res.end(data); 
      });
})

app.listen(PORT, () => {
    console.log('Listening at ' + PORT );
});