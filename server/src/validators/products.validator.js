import {body, validationResult} from 'express-validator'

export const productValidator = [
    body("title")
        .exists().withMessage("Title is required").bail()
        .isString().withMessage("Title must be a String").bail()
        .trim()
        .isLength({min:2}).withMessage("Title must have at least 2 characters").bail()
        .isAlpha("en-US", {ignore: " -"}).withMessage("Only english alphabets and - are allowed"),
    body("description")
        .exists().withMessage("Description is required").bail()
        .isString().withMessage("Description must be a String").bail()
        .trim()
        .isLength({min:20,max:500}).withMessage("Description must be between 20 to 500 characters"),
    body("price.amount")
        .exists().withMessage("Amount is required").bail()
        .isFloat({min:0}).withMessage("price amount should be floating number and min price must be 0 "),
    body("price.currency")
        .exists().withMessage("Select currency").bail()
        .isString().withMessage("Currency must be a String").bail()
        .isIn(["RS","USD"]).withMessage("Currency either be RS or USD"),
    body("sizes")
        .exists().withMessage("Sizes are required").bail()
        .isArray().withMessage("Sizes must be an array of object"),
    body("sizes.*.size")
        .exists().withMessage("Size is required").bail()
        .isString().withMessage("Size must be a string").bail()
        .trim()
        .isIn(["XS","S","M","L","XL","XXL"]).withMessage("size can be one of these XS, S, M, L, XL, XXL."),
    body("sizes.*.stock")
        .exists().withMessage("Stock is required").bail()
        .isInt({min:0}).withMessage("Stock must an Integer and its minimum value should be greter than 0 "),
    (req,res,next)=>{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                message: "Invalid request",
                error: errors
            })
        }
        next()
    }
]