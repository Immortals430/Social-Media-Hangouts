import multer from "multer"



const avatar = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/avatar')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
  })

const post = multer.diskStorage({
    destination: function (req, file, cb) {     
      cb(null, './uploads/post')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.jpg')
     
    }
})

export const uploadDp = multer({storage: avatar})
export const uploadPost = multer({ storage: post})
