import {body,validationResult} from 'express-validator'

export const registerValidator = [
    body("name")
        .exists().withMessage("Name is required").bail()
        .isString().withMessage("Name must be a string").bail()
        .trim()
        .isLength({min:2}).withMessage('Name must have at least 2 characters'),
    body("email")
        .exists().withMessage("Email is required").bail()
        .isString().withMessage("Email must be a string").bail()
        .trim()
        .isEmail().withMessage("Enter valid Email address"),
    body("password")
        .exists().withMessage("Password is required").bail()
        .isString().withMessage("Password must be a string").bail()
        .trim()
        .isLength({min:6}).withMessage("Password must be 6 char long"),
    body("confirmPassword")
        .trim()
        .custom((value,{req})=>{
            if(value !== req.body.password){
                throw new Error("Password is not matched")
            }

            return true
        }),

    (req,res,next)=>{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                message: "Invalid request",
                errors
            })
        }
        next()
    }

]

export const loginValidator = [
    body("email")
        .exists().withMessage("Email is required").bail()
        .isString().withMessage("Email must be a string").bail()
        .trim()
        .isEmail().withMessage("Enter valid Email address"),
    body("password")
        .exists().withMessage("Password is required").bail()
        .isString().withMessage("Password must be a string").bail()
        .trim()
        .isLength({min:6}).withMessage("Password must be 6 char long"),
    (req,res,next)=>{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                message: "Invalid request",
                errors
            })
        }
        next()
    }
]