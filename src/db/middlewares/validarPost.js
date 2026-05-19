const postSchema = require("../schema/postSchema")
const validarPost = (req, res, next) => {
    const { error } = postSchema.validate(req.body)
    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }
    next()
}

module.exports = validarPost