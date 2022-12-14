const User = require("../models/User.js")
const { verifyJwtAccessToken } = require("../utils/token.js")

 async function ensureAuth(req, res, next) {
    try {
        //get token from headers
        let tokenHeaders = req.headers['Authorization'] || req.headers['authorization']
        if (!tokenHeaders) throw Error('No Token Headers Found')

        let token = tokenHeaders.split('Bearer ')[1]
        //verfiy token it is still valid
        let decoded = await verifyJwtAccessToken(token)
        //find user
        req.user = await User.findById(decoded['userInfo']?.id).orFail()
        next()
    } catch (error) {
        res.status(403).json({
            error: error.message
        })
    }
}
module.exports= {ensureAuth}