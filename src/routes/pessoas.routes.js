const router = require('express-promise-router')();
const pessoasController = require('../controllers/pessoas.controller');

var multer  = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/images');
    },
    filename: (req, file, cb) => {
      console.log(file);
      var filetype = '';
      if(file.mimetype === 'image/gif') {
        filetype = 'gif';
      }
      if(file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});
var upload = multer({storage: storage});

router.post('/pessoas',upload.single('file'), pessoasController.createPessoa);
router.get('/pessoas', pessoasController.listAllPessoas);
router.get('/pessoas/:id', pessoasController.findPessoaById);
router.put('/pessoas/:id',upload.single('file'), pessoasController.updatePessoaById);
router.delete('/pessoas/:id', pessoasController.deletePessoaById);

module.exports = router;