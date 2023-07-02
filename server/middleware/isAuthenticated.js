const jwt = require('jsonwebtoken')
const {SECRET} = process.env

//Exports a single function, isAuthenticated.isAuthenticated, which calls the next function if the input token is valid.
module.exports = {
    isAuthenticated: (req, res, next) => {
        const headerToken = req.get('Authorization') //Saves the request token.

        //Returns error 401 if the request had no token.
        if (!headerToken) {
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        }

        let token

        //Approves the token if it matches the private key.
        try {
            token = jwt.verify(headerToken, SECRET)
        } catch (err) {
            err.statusCode = 500
            throw err
        }

        //Fails with error 401 if the token wasn't approved.
        if (!token) {
            const error = new Error('Not authenticated.')
            error.statusCode = 401
            throw error
        }

        next()
    }
}