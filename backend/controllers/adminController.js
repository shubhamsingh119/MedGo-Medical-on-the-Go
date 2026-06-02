import validator from 'validator'
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from "cloudinary"
import doctorModel from '../models/doctorModel.js'


// API for adding doctor
const addDoctor = async (req,res) => {
    try {

        const {
            name,
            email,
            password,
            speciality,
            degree,
            experience,
            about,
            fees,
            address
        } = req.body

        const imageFile = req.file

        // checking for all data to add doctor
        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
            return res.json({success:false,message:"Missing Details"})
        }

        // validating email format
        if(!validator.isEmail(email)) {
            return res.json({success:false,message:"Please enter a valid email"})
        }


        // validating strong password
        if(password.length<8){
            return res.json({success:false,message:"Please enter a strong password"})
        }

        // hashing doctor password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        if (!imageFile) {
            return res.json({
                success: false,
                message: "Image file is required",
            })
        }

        console.log("FILE =>", imageFile)
        console.log("PATH =>", imageFile.path)

        const normalizedPath = imageFile.path.replace(/\\/g, '/')

        // upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(normalizedPath, {
            resource_type: 'image',
            folder: 'doctors',
            use_filename: true,
            unique_filename: false,
        })
        const imageUrl = imageUpload.secure_url

        const doctorData = {
            name,
            email,
            image:imageUrl,
            password:hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            date:Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()

        res.json({success:true,message:"Doctor Added"})



    } catch (error) {
        console.error('Cloudinary upload error:', error)
        console.error('ERROR =>', error)
        console.error('MESSAGE =>', error.message)
        console.error('HTTP CODE =>', error.http_code ?? error.status_code)
        console.error('STACK =>', error.stack)

        res.json({
            success: false,
            message: error.message || 'Cloudinary upload failed',
        })
    }
}

export {addDoctor}