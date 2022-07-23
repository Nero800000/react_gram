
const {body} = require("express-validator")

const userCreateValidation = () => {
    return [
        body("name").isString().withMessage("o nome é obrigatorio")
        .isLength({min:3}).withMessage("o nome precisa ter no minimo 3 caracteres"),
        body("email").isString().withMessage("email é obrigatiorio")
        .isEmail().withMessage("insira um e-mail valido"),

        body("password").isString().withMessage("A senha é obrigatória")
        .isLength({min:6}).withMessage("a senha precisa ter no minimo 6 caracteres"),
        body("confirmPassword").isString().withMessage("a confirmação de senha é obrigatoria")
        .custom((value, {req}) => {
            if(value != req.body.password) {
                throw new Error("As senhas não são iguais")
            }

            return true
        })
        
    ]
}

const loginValidaTion = () => {
    return [
        body("email").isString().withMessage("o email é obrigatorio")
        .isEmail().withMessage("insira um e-mail válido"),
        body("password").isString().withMessage("A senha é obrigatoria"),




    ]
}

const useUpdateValidation = () => {
    return [
        body("name").optional().isLength({min: 3}).withMessage("O nome precisa de pelo menos 3 caracteres."),
        body("password").optional().
        isLength({min: 6})
        .withMessage("A senha precisa ter no minimo 6 caracteres"),

    ]
}

module.exports = {
    userCreateValidation,
    loginValidaTion,
    useUpdateValidation,


}