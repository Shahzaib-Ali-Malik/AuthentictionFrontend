import productsModel from "../models/products.model.js";
import { sendFiles } from "../services/storage.utili.js";

export const productCreate = async (req,res)=>{
    const {title,description,price,sizes} = req.body
    const files = req.files
    let fileUrls = []

    for(let i = 0;i < files.length;i++){
        const eachFile = await sendFiles(files[i].buffer,files[i].originalname);        
        fileUrls.push(eachFile.url)
    }
    
   const newProduct = await productsModel.create({
    title,
    description,
    price,
    sizes,
    images: fileUrls,
    seller: req.user._id
   })

   res.status(201).json({
    message: "Product Created successfully",
    data: {
        product: {
            title,
            description,
            price: newProduct.price,
            sizes: newProduct.sizes,
            images: newProduct.images,
            productId: newProduct._id,
            sellerId: newProduct.seller
        }
    }
   })
    
}

export const allProducts = async (req,res)=>{
    const user = req.user;

    const product = await productsModel.find()

    res.status(200).json({
        message: "Products fetched successfully",
        data:{
            product
        }
    })
}

export const singleProduct = async (req,res)=>{
    const {id} = req.params;
    const getProduct = await productsModel.findById(id);
    
    res.status(200).json({
        message: "Product founded successfully",
        data: {
            getProduct
        }
    })
}

export const deleteProduct = async (req,res)=>{
    const {id} = req.params;
    const getProduct = await productsModel.findByIdAndDelete(id);
    
    res.status(200).json({
        message: "Product deleted successfully",
        data: {
            getProduct
        }
    })
}

export const updateProduct = async (req,res)=>{
    const {id} = req.params;
    const getProduct = await productsModel.findByIdAndUpdate(id);
    
    res.status(200).json({
        message: "Product deleted successfully",
        data: {
            getProduct
        }
    })
}