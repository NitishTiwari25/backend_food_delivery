const express = require("express")
const router = express.Router()
const User = require("../models/user")
 const {body,validationResult}=require("express-validator")

 const jwt=require("jsonwebtoken");
 const bcrypt = require("bcryptjs");
 const jwtsecret="mynameisnitishtiwariiamboythisisme"


router.post("/createuser",
    //  [
    // body("email").isEmail(),
    // body("name").isLength({min:5}),
    // //password must be atleast 5 char long
    // body("password"," password must be 5 char").isLength({min:5})

    // ],
    async (req, res) => {

        // const errors=validationResult(req);
        // if(!errors.isEmpty()){
        //     return res.status(400).json({errors:errors.array()});
        // }

        const salt= await bcrypt.genSalt(10);  //for safety of password
        let setpassword = await bcrypt.hash(req.body.password,salt)

        try {
            await User.create({
                name: req.body.name,
                email: req.body.email,
                password: setpassword,
                location: req.body.location
            })
            res.json({ success: true });

        } catch (error) {
            console.log(error)
            res.json({ success: false });
        }
    })


router.post("/loginuser",
[
    body("email").isEmail(),

    //password must be atleast 5 char long
    body("password"," incorresct password").isLength({min:5})

    ],
    async (req, res) => {
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }

let email=req.body.email;
        try {
          let userdata=  await User.findOne({email});
               
               if(!userdata){
                return res.status(400).json({errors:"try login with correct"})
               }

               const pwdcompare=await bcrypt.compare(req.body.password,userdata.password)
               if(!pwdcompare){   //for normal password verify req.body.password!==userdata.password
                return res.status(400).json({errors:"try login with correct"})
               }
              

            const data={
                user:{
                    id:userdata.id
                }
            }   
            const authtoken=jwt.sign(data,jwtsecret)
           return  res.json({ success: true ,authtoken:authtoken});

        } catch (error) {
            console.log(error)
            res.json({ success: false });
        }
    })

module.exports = router;