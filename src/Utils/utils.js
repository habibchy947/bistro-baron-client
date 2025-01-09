import axios from "axios"

export const uploadImage = async (imageData) => {
    const formData = new FormData()
    formData.append('image', imageData)
    const {data} = await axios.post(`${import.meta.env.VITE_IMGBB_API_URL}?key=${import.meta.env.VITE_IMGBB_API_KEY}`, formData)
    return data.data.display_url
}

