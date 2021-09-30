const Joi = require('@hapi/joi');

//sihnin schema
const SignInValidation = (data) =>{
    const schema = Joi.object({
        name:Joi.string()
            .required(),
        email:Joi.string()
            .required()
            .email(),
        password: Joi.string()
            .required()
            .min(8)
    });
    return schema.validate(data);
};
const LoginInValidation = (data) =>{
    const schema = Joi.object({
        email:Joi.string()
            .required()
            .email(),
        password: Joi.string()
            .required()
            .min(8)
    });
    return schema.validate(data);
};

module.exports.SignInValidation = SignInValidation;
module.exports.LoginInValidation = LoginInValidation;