import express from 'express'
import { getMe, loginAPI, logOut, refresh, registerAPI } from '../controllers/auth.controller.js'
import { loginValidator, registerValidator } from '../validators/auth.validator.js'
import {authenticate} from '../middleware/auth.middleware.js'
const router = express.Router()

router.post('/register',registerValidator,registerAPI)

router.post('/login',loginValidator,loginAPI)

router.post('/refresh',refresh)

router.post('/logout',authenticate,logOut)

router.get('/me',authenticate,getMe)


export default router