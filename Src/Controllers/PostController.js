const res = require('express/lib/response')
const fs = require('fs')
const PostModel = require('../Models/Post')
const path = require('path')
const { resolve } = require('path')


const editPage = async (req,res) => {
    const {id} = req.params
    try {
        const post = await PostModel.findById(id)
        // res.status(200).json(post)
        res.render('Edit', {data: post})
    } catch (error) {
        res.status(400).json('Khong tim thay')
    }
} 

const createPostPage = (req, res) =>{
    res.render('NewPost')
}

const createPost = async (req, res) => {
    const {title, desc} = req.body
    const img = req.file.filename
    const author = req.user.username
    try {
        const newPost = new PostModel({
            title,
            desc,
            img,
            author
        })
        const post = await newPost.save()
       // res.status(201).json(post)
       res.redirect('/me/posts')
    } catch (error) {
        res.status(500).json(error)
    }
}

const getPost = async (req, res) => {
   const {id} = req.params
   try {
       const post = await PostModel.findById(id)
      // res.status(200).json(post)
       res.render('post', {data: post})
   } catch (error) {
       res.status(400).json('Khong tim thay')
   }
}

const getAllPost = async (req, res) => {
   
    try {
        const posts = await PostModel.find({})
        if (posts.length == 0) return res.status(404).json('Khong co bai viet')
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json(error)
    }
}

const updatePost = async (req, res) => {
    const id = req.params.id
    const {title, desc} = req.body
    const img = req.file.filename
    try {

        const postOld = await PostModel.findById(id)
        await PostModel.findByIdAndUpdate(
            id, {
                $set: req.body, img
            },
            { new:true}
            )
           // console.log(path.join(path.resolve('./'),`Src/Public/image/${postOld.img}`))
            await fs.unlink( path.join(path.join(path.resolve('./'),`Src/Public/image/${postOld.img}`)) , err => {
                if (err) return res.json(err)
            })
        //res.status(200).json(post)
        res.redirect('/me/posts')
    } catch (error) {
        res.status(500).json(error)
    }
}

const deletePost = async (req, res) => {
   const id = req.params.id
   try {
       const post = await PostModel.findById(id)
       await post.delete()
       //res.status(200).json(post)
       res.redirect('/me/posts')
   } catch (error) {
       res.status(400).json(error)
   }
}

module.exports = {
    createPost,
    getAllPost,
    getPost,
    updatePost,
    deletePost,
    editPage,
    createPostPage
}