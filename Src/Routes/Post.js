const PostController = require('../Controllers/PostController')
const express = require('express')
const router = express.Router()
const authenticator = require('../Middleware/authenticator')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file , cb){
        cb(null,path.join(__dirname,'../Public/image'))
    },
    filename: function(req, file, cb) {
        const name = Date.now() + '-' + file.originalname
        cb(null, name)
    }
})

const upload = multer({ storage: storage })

router.get('/create', authenticator, PostController.createPostPage)
router.get('/:id', authenticator, PostController.getPost)
router.get('/edit/:id',authenticator, PostController.editPage)
router.get('/', authenticator, PostController.getAllPost)
router.post('/create',authenticator, upload.single('upload-file') , PostController.createPost)
router.patch('/edit/:id', authenticator, upload.single('upload-file'), PostController.updatePost)
router.delete('/:id', authenticator, PostController.deletePost)

module.exports = router