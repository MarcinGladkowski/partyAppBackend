import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${__dirname}/../../public/${file.fieldname}`)
    },
    filename: (req, file, cb) => {
        cb(null,`${new Date().getTime()}-${file.originalname}`)
    }
  });

export default multer({storage: storage});