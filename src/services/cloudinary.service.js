export const fileUpload = async (file) => {
    let result = null;

    let formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', `${process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET}`);

    await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
    })
        .then((response) => response.json())
        .then((data) => {
            result = data;
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    return result;
};