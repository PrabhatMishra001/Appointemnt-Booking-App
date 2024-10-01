// src/utils/uploadCloudinary.js

const uploadImageToCloudinary = async (file) => {
    const url = `https://api.cloudinary.com/v1_1/dyiirthkm/image/upload`;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'doctor_booking');

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to upload image');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        throw error;
    }
};

export default uploadImageToCloudinary;
