const path = require('path');
const multer = require('multer');
const{LIMIT_PICTURE}= process.env;

const storage = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, path.join(global.__basepath, 'assets', 'uploads'));
  },
  filename: (req, file, cb)=>{
    const timestamp = new Date().getTime();
    const ext = file.mimetype.split('/')[1];
    if(!file){
      cb(null, null);
    }
    cb(null, `${timestamp}.${ext}`);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: parseInt(LIMIT_PICTURE) * 1024 * 1024
  },
  fileFilter: (req, file, cb)=>{
    const allowExt = ['image/png', 'image/jpg', 'image/webp'];
    if(allowExt.includes(file.mimetype)){
      cb(null, true);
    }else{
      const err = new Error('Extension not suported');
      cb(err, false);
    }
  }
});

module.exports = upload.single('picture');