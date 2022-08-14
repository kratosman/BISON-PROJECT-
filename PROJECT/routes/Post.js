const express = require('express'),
router = express.Router(),
PostModel = require('../model/PostModel'),
path = require('path'),
UserMode = require('../model/UserMode'),
Comment = require('../model/Comments'),
multer = require('multer'),
storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'))
    }, 
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
}),
upload = multer({ storage: storage})


router.route('/post').post(upload.single("image"), (req, res) => {
    // const { id } = mongoose.Types.ObjectId 
    const newPost = new PostModel({
        address: req.body.address,
        post: req.body.post,
        name:req.body.name,
        image: req.file.originalname
    })
    newPost.save((err, post) =>{
        if(err) {
            return res.status(401).send("Error")
        }
        if(!post) {
            return res.status(401).send("Failed to post")
        }
        
        return res.redirect('/')
    })
})
router.route('/post').get(async(req,res) => {
    const getIdPerson = await PostModel.find({}).exec()
    res.status(201).json(getIdPerson)
})
router.route('/post/:id').get(async(req,res) => {
    const { id } = req.params
    const getIdPerson = await PostModel.findById(id)
    res.status(201).json(getIdPerson)
})
router.route('/post/:id').delete(async(req,res) => {
    const { id } = req.params
    const getIdPerson = await PostModel.findByIdAndRemove({_id: id})
    res.status(201).json(getIdPerson)
})

//Routes views

router.route('/comment').post(upload.single("image"), (req, res) => { 
    const newComment = new Comment({
        postId: req.body.postId,
        comment: req.body.comment,
        name:req.body.name,
    })
    newComment.save((err, comment) =>{
        if(err) {
            return res.status(401).send("Error")
        }
        if(!comment) {
            return res.status(401).send("Failed to post")
        }
        
        return res.status(201).send("Successfully post")
    })
   
})
router.route('/comment').get(async(req,res) => {
    const getComment = await Comment.find({}).exec()
    res.status(201).json(getComment)
})
router.route('/view/:id').get(async(req, res) => {
    const { id } = req.params
    const data = await UserMode.findOne({ _id: req.session.userId})
    const comment = await Comment.find({})
     PostModel.findById({_id: id}, (err, post) => {
        if( err ) {
            return res.status(401).send({ "errorMsg": "Opps!"})
        } 
        if( !post ) {
            return res.status(401).send({"errorMsg": "No such data!"})
        }
        return res.render('viewPost', {
            user: post,
            postData: data,
            comments: comment
        })
    })
})
module.exports = router