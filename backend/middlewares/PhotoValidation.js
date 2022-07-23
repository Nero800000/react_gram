const {body} = require("express-validator")  //vamo tankar mais merdaaaaaa  // so destrava a mente, para sempre Voce consegue!!!!!!



const photoInsertValidation = () => {
    return [
        //Title
        body("title").not().equals("undefined").withMessage("O titulo é obrigatório")
        .isString()
        .withMessage("O titulo é obrigatório")
        .isLength({min: 3})
        .withMessage("O titulo precisa ter 3 caracteres no minimo"),
        //Image
        body("image").custom((value,{req})=> {
            if(!req.file) {
                 throw new Error("A imagem é obrigatória")
            }
            return true
        })
    ]
}

const photoUpdateValidation = () => {
    return [
        body("title").optional().isString().withMessage("O titulo é obrigatiorio")
        .isLength({min: 3})
        .withMessage("O titulo precisa ter 3 caracteres no minimo"),
        
    ]
}

const commentValidation = () => {

    return [
        body("comment").isString().withMessage("O comentario é obrigatorio")
    ]

}

module.exports = {
    photoInsertValidation,
    photoUpdateValidation,
    commentValidation
}

