let bcrypt = require("bcryptjs")
let jwt = require("jsonwebtoken")
let User = require("../models/user").User
function createToken(id, username) {
    return jwt.sign({ "id": id, "username": username }, process.env.SECRET, { "expiresIn": "2 days" })
}
module.exports = {
    "register": async function(req, res) {
        try {
            let { username, password } = req.body
            let foundUser = await User.findOne({where: {username: username}})
            if (foundUser) {
                res.status(400).send("cannot create user")
            } else {
                const salt = bcrypt.genSaltSync(10)
                const hash = bcrypt.hashSync(password, salt)
                let newUser = await User.create({username: username, hashedPass: hash})
                let token = createToken(newUser.dataValues.id, newUser.dataValues.username)
                let exp = Date.now() + 172800000
                res.send({ "token": token, "exp": exp, "userId": newUser.dataValues.id, "username": newUser.dataValues.username })
            }
        } catch (error) {
            console.log(error)
        }
    },
    "login": async function(request, response) {
        try {
            let { username, password } = request.body
            let foundUser = await User.findOne({
                "where": { "username": request.body.username }
            })
            if (foundUser) {
                let isAuthenticated = bcrypt.compareSync(request.body.password, foundUser.hashedPass)
                if (isAuthenticated) {
                    let token = createToken(foundUser.id, foundUser.username)
                    let exp = Date.now() + 172800000
                    response.send({ "token": token, "exp": exp, "userId": foundUser.id, "username": foundUser.username })
                } else {
                    response.send("cannot log in")
                }
            } else {
                response.send("cannot log in")
            }
        } catch {
            console.log("ERROR IN register")
        }
    }
}