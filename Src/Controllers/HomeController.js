const PostModel = require('../Models/Post')
const homePage = async (req, res) => {
    const pageSize = 5
    const page = parseInt(req.query.page ) || 1
    try {
        const totalPage = await PostModel.countDocuments()
        const posts = await PostModel.find({}).skip((page - 1) * pageSize).limit(pageSize)
        const pages = Math.ceil(totalPage / pageSize)
       res.render('Home', {data: posts, user: req.user, current: page, pages: pages})
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    homePage
}