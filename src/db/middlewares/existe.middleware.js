const validaPathParameterMiddleware = (req, res, next) => {
    const id = req.params.id
    if (isNaN(id)) {
        return res.status(400).json({message: 'El parametro debe ser numerico.'})
    }
    next()
}

const validaExisteMiddleware = (Modelo) => {

    return async (req, res, next) => {
        const id = req.params.id
        const autor = await Modelo.findByPk(id)
        if (!autor) {
            return res.status(404).json( {message: `El id ${id} en modelo ${Modelo.name} no Existe`} )
        }
        next()
    }
}


module.exports = { validaPathParameterMiddleware, validaExisteMiddleware }