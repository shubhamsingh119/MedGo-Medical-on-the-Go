import { v2 as cloudinary } from 'cloudinary'

const connectCloudinary = () => {
    const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME?.trim()
    const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY?.trim()
    const CLOUDINARY_SECRET_KEY = process.env.CLOUDINARY_SECRET_KEY?.trim()

    if (!CLOUDINARY_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_SECRET_KEY) {
        console.error('Missing Cloudinary environment variables: CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_SECRET_KEY')
        console.error('CLOUDINARY_NAME set:', Boolean(CLOUDINARY_NAME))
        console.error('CLOUDINARY_API_KEY set:', Boolean(CLOUDINARY_API_KEY))
        console.error('CLOUDINARY_SECRET_KEY set:', Boolean(CLOUDINARY_SECRET_KEY))
        return
    }

    cloudinary.config({
        cloud_name: CLOUDINARY_NAME,
        api_key: CLOUDINARY_API_KEY,
        api_secret: CLOUDINARY_SECRET_KEY,
        secure: true,
    })

    console.log('Cloudinary configured:', {
        cloud_name: cloudinary.config().cloud_name,
        api_key: cloudinary.config().api_key ? 'set' : 'missing',
        api_secret: cloudinary.config().api_secret ? 'set' : 'missing',
    })
}

export default connectCloudinary