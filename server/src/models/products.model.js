import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100
    },
    description: {
        type: String,
        required: true,
        minlength: 20,
        maxlength: 500
    },
    images: {
        type: [{type:String}],
        validate: {
            validator: images => images.length <= 5,
            message: "A product can have at most 5 images"
        }
    },
    price:{
        amount:{
            type: Number,
            required: true,
            min:0
        },
        currency: {
            type: String,
            enum:["RS","USD"],
            default:"RS"
        }
    },
    sizes: [{
        size:{
            type: String,
            required: true,
            enum: ["XS","S","M","L","XL","XXL"]
        },
        stock: {
            type: Number,
            min: 0,
            default: 0
        }
    }],
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
})

const productsModel = mongoose.model("products",productsSchema);

export default productsModel