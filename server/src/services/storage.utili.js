import imageKit, { toFile } from '@imagekit/nodejs'
import config from '../config/config.js'

const storageInstance = new imageKit({
    urlEndpoint: config.IK_ENDPOINT,
    publicKey: config.IK_PUBLIC_KEY,
    privateKey: config.IK_PRIVATE_KEY
})

export const sendFiles = async (file,fileName)=>{
    const obj= {
        file: await toFile(file,fileName),
        fileName,
        folder: "Authenticate-Products"
    }

    const uploadFiles = await storageInstance.files.upload(obj)
    return uploadFiles
}