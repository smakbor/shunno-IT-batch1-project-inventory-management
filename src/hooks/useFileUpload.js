import { useState, useEffect, React } from "react";
import { axioShunnoStorage, axiosPrivate } from "../utils/axios/axios";

const useFileUpload = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const handleFileUpload = async (file) => {
        setIsLoading(true);
        let formData = new FormData();
        formData.append('file', file)
        const fileUploadInfo = await axiosPrivate.post('/media/upload', formData)
        if (fileUploadInfo.data.data.file) {
            setIsLoading(false);
            setData(fileUploadInfo.data.data.file)
        }
        else {
            setIsLoading(false);
            setIsError(true);
        }
    }

    return { data, isError, isLoading, handleFileUpload }
};

export default useFileUpload;

