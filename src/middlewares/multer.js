import multer from 'multer';

const storage = multer.diskStorage({
    destination: '../partyApp/src/assets/icons',
    filename: (req, file, cb) => {
        cb(null,`${new Date().getTime()}-${file.originalname}`)
    }
  });

export default multer({storage: storage});