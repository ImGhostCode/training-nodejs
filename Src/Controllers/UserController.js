const PostModel = require("../Models/Post")

const getMyPost = async (req, res) => {
    //const username = req.body.username
    const username = req.user.username
    try {
        const posts = await PostModel.find({author:username})
        //if(posts.length == 0) return res.status(200).json('Khong co bai viet')
       // res.status(200).json(posts)
        res.render('Me', {data: posts})
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    getMyPost
}