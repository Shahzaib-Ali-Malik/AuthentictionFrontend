import jwt from 'jsonwebtoken'
import config from '../config/config.js'

export const generateAccessToken = (id,name)=>{
    return jwt.sign({
        id,name
    },config.ACCESS_TOKEN_SECRET,{expiresIn:"15m"})
}

export const generateRefreshToken = (id,name)=>{
    return jwt.sign({
        id,name
    },config.REFRESH_TOKEN_SECRET,{expiresIn:"7d"})
}

export const verifyAccessToken = (token)=>{
    return jwt.verify(token,config.ACCESS_TOKEN_SECRET)
}

export const verifyRefreshToken = (token)=>{
    return jwt.verify(token,config.REFRESH_TOKEN_SECRET)
}