let express = require("express")
require('dotenv').config()
let auth = require("./controllers/auth")
let posts = require("./controllers/posts")
let app = express()
app.use(require("cors")())
app.use(express.json())
posts.post.belongsTo(posts.user.User)
app.post("/register", auth.register)
app.post("/login", auth.login)
app.get("/posts", posts.getAllPosts)
app.get("/userposts/:userId", posts.getCurrentUserPosts)
app.use(require("./middleware/isAuthenticated").isAuthenticated)
app.post("/posts", posts.addPost)
app.put("/posts/:id", posts.editPost)
app.delete("/posts/:id", posts.deletePost)
require("./util/database").sync().then(function() {
    app.listen(process.env.PORT, function() {
        console.log("db sync successful & server running on port 4005")
    })
})