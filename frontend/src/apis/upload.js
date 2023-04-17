import apiCaller from "../helpers/apiCaller.js";

const UploadApi = {
    upload: async (files) => {
        let formData = new FormData()
        for (let file of files ) {
            formData.append('files', file)
        }
        return await apiCaller('uploads', 'POST', formData, { 'Content-Type': 'multipart/form-data' })
    },
    get: async(filename) => await apiCaller(`uploads/${filename}`, 'GET')
}

export default UploadApi;