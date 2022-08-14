const express = require('express')
const router = express.Router()
const UserModel = require('../model/UserMode'),
PostModel = require('../model/PostModel')
router.route('/user').get(async (req, res) => {
    const findUser = await UserModel.find({}).exec()
    res.status(201).json(findUser)
})
router.route('/register').post((req, res) => {
    try {
        UserModel.find({username: req.body.username }, (err, user) => {
            if(user.length == 0) {
                const UserReg = new UserModel({
                    username: req.body.username,
                    password: req.body.password
                })
                UserReg.save((err, user) => {
                    if(err) {
                        res.status(401).json({
                            errorMsg: "Failed to login!",
                            status: false
                        })
                    } else {
                        res.redirect('/login')
                    }
                    
                })
            } else {
                res.status(401).json({
                    errorMsg: `Username ${req.body.username} Already Exists!`,
                    status: false
                })        
            }
        })
    } catch (error) {
        res.status(401).json({
            errorMsg: "Something went wrong!",
            status: false
        })   
    }
})
router.route('/login').post(async (req,res) => {
    
    try {
        UserModel.findOne({username: req.body.username, password: req.body.password}, (err, user) => {
            if(err) { 
                return res.status(501).json({ "msg": "Error"})
            }
            if(!user) {
                res.redirect('/login')
            } else {
                req.session.userId = user._id
                res.redirect('/')
            }
            
            
        })
    } catch (error) {
        res.status(401).json({
            errorMsg: "Something went wrong!",
            status: false
        }) 
    }
})
//EJS
router.route('/register').get((req,res) => {
    res.render('register')
})
router.route('/login').get((req,res) => {
    res.render('login')
})
router.route('/').get(async (req, res) => {
    const data = await PostModel.find({}).exec()
    UserModel.findOne({ _id: req.session.userId}, (err, user )=> {
        if(err) {
            res.redirect('/login')
        }
        return res.render('welcome',{
            data:data,
            user: user  
         })
    })
    
})

//logout
router.route('/logout').get((req, res) => {
    req.session.destroy();
    res.redirect('/')
});
module.exports = router
