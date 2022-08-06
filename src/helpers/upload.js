const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(global.__basepath, 'assets', 'uploads'));
  },
  filename: function (req, file, cb) {
    // const ext = file.mimetype.split('/')[1];
    // const originalName = file.originalname;
    // console.log(file);
    const timeStamp = new Date().getTime();
    const ext = file.mimetype.split('/')[1];
    cb(null, `${timeStamp}.${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1000 * 1000 },
  fileFilter: (req, file, cb) => {
    const allowExt = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'];
    if (allowExt.includes(file.mimetype)) {
      cb(null, true);
    } else {
      const err = new Error('Extension not supported');
      cb(err, false);
    }
  },
});

module.exports = upload;
