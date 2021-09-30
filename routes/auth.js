const router = require('express').Router();
const {SignInValidation,LoginInValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//importing model
const User = require('../model/User')


router.post('/signin',async (req,res)=>{

    //validating 
   const {error} = SignInValidation(req.body);
   if(error) {return res.status(400).send(error.details[0].message)};

   //checking for existing user
   const emailCheck = await User.findOne({email: req.body.email});
   if(emailCheck) {return res.status(400).send('email already exist')}

   //encrypting
    const salt = await bcrypt.genSalt(10);
    const encrptedPassword = await bcrypt.hash(req.body.password, salt);

   //Creating new User
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: encrptedPassword,
    });
    try{
        const saveUser = await user.save();
        res.send({user: user.name,message: "Account created"});
    }catch(err){
        res.status(400).send(err);
    }
});

    //Login existing user
    router.post('/login', async(req,res) => {
         //validating 
   const {error} = LoginInValidation(req.body);
   if(error) {return res.status(400).send(error.details[0].message)};

   //checking for existing user
   const emailCheck = await User.findOne({email: req.body.email});
   if(!emailCheck) {return res.status(400).send('Email does not exist, Create an account ')}

   //Checking password
   const passwordCheck = await bcrypt.compare(req.body.password, emailCheck.password);
   if(!passwordCheck) {return res.status(400).send('Password is incorrect')}

   //create and assign a token
   const token = jwt.sign({_id: emailCheck._id},process.env.TOKEN_SECRET,{expiresIn: "30m"});
   res.header('auth-token',token).json({token, name: emailCheck.name})

    });

    

module.exports = router;