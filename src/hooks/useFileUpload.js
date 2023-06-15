import { useState } from "react";
import { axioShunnoStorage } from "../utils/axios/axios";
import { useSelector } from "react-redux";

const useFileUpload = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);
    const [isError, setIsError] = useState(false);
    const store = useSelector(state => state.setting.activeStore);
    const handleFileUpload = async (files) => {
        setIsLoading(true);
        try {
            let formData = new FormData();
            formData.append('clientApp', "HISABNIKASH");
            for (let i = 0; i < files.length; i++) {
                formData.append('files', files[i]);
            }
            const fileUploadInfo = await axioShunnoStorage.post('/vault', formData)
            const { data: { data: { file } } } = fileUploadInfo;
            setIsUploaded(true);
            return file.map(f => {
                return {
                    store: store._id,
                    proprietor: store.proprietor,
                    name: f.name,
                    path: f.path,
                    type: f.type,
                    size: f.size,
                    publicId: f.publicID,
                    fileId: f.id,
                    extension: f.extension,
                    visibility: f.visibility
                }
            })
        } catch (error) {
            setIsError(true);
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }

    }
    const handleFileDelete = async (files) => {
        console.log(files)
        // try {
        //     const formData = new FormData();
        //     formData()
        //     const fileDeleteInfo = axioShunnoStorage.delete('/vault', {
        //         publicID,
        //         permanent: false,
        //         clientApp: "HISABNIKASH"
        //     })
        //     return fileDeleteInfo;
        // } catch (error) {
        //     console.log(error)

        // }

    }

    return { data, isError, isLoading, isUploaded, handleFileUpload, handleFileDelete }
};

export default useFileUpload;

