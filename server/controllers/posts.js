let user = require("../models/user")
let Post = require("../models/post")
module.exports = {
    "user": user,
    "post": Post,
    "getAllPosts": async function(request, response) {
        let posts = await Post.findAll({
            "where": { "privateStatus": false },
            "include": [{ "model": user.User, "attributes": ["username"] }]
        })
        response.send(posts)
    },
    "getCurrentUserPosts": async function(request, response) {
        let posts = await Post.findAll({
            "where": { "userId": request.params.userId },
            "include": [{ "model": user.User, "attributes": ["username"] }]
        })
        response.send(posts)
    },
    "addPost": async function(req, response) {
        try {
            let { status, title, content, userId } = req.body
            await Post.create({ "privateStatus": status, "title": title, "content": content, "userId": userId })
            response.sendStatus(200)
        } catch (error) {
            console.log(error)
            response.sendStatus(400)
        }
    },
    "editPost": async function(request, response) {
        try {
            let id = request.params.id
            let status = request.body.status
            await Post.update({ "privateStatus": status }, {
                "where": { "id": id }
            })
            response.sendStatus(200)
        } catch {
            console.log("edit post")
        }
    },
    "deletePost": async function(request, response) {
        console.log("delete post")
        await Post.destroy({
            "where": { "id": request.params.id }
        })
        response.sendStatus(200)
    }
}