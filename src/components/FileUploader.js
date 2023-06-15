// @flow
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Spinner } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import useFileUpload from '../hooks/useFileUpload';
import { useMediaCreateMutation } from '../redux/services/mediaService';


const FileUploader = props => {
    const { t } = useTranslation();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const { data, isLoading, isError, isUploaded, handleFileUpload, handleFileDelete } = useFileUpload()
    const [mediaCreate, { isLoading: mediaCreateLoading, isSuccess: mediaCreateSuccess }] = useMediaCreateMutation();
    /**
     * Handled the accepted files and shows the preview
     */
    const handleAcceptedFiles = (files) => {
        var allFiles = files;

        if (props.showPreview) {
            files.map((file) =>
                Object.assign(file, {
                    preview: file['type'].split('/')[0] === 'image' ? URL.createObjectURL(file) : null,
                    formattedSize: formatBytes(file.size),
                })
            );

            allFiles = [...selectedFiles];
            allFiles.push(...files);
            setSelectedFiles(allFiles);
        }

        // if (props.onFileUpload) props.onFileUpload(allFiles);
    };

    /**
     * Formats the size
     */
    const formatBytes = (bytes, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };

    /*
     * Removes the selected file
     */
    const removeFile = (file) => {
        const newFiles = [...selectedFiles];

        newFiles.splice(file, 1);
        setSelectedFiles(newFiles);
    };
    const handleUpload = async (files) => {
        let response = [];

        handleFileUpload(files).then(response => {
            mediaCreate(response);
            setSelectedFiles([]);
        }).catch(err => {
            console.log(err)
            if (isUploaded) {
                handleFileDelete(files)
            }
        })


    }

    return (
        <>
            <Dropzone {...props} onDrop={(acceptedFiles) => handleAcceptedFiles(acceptedFiles)}>
                {({ getRootProps, getInputProps }) => (
                    <div className="dropzone">
                        <div className="dz-message needsclick" {...getRootProps()}>
                            <input {...getInputProps()} />
                            <i className="h3 text-muted dripicons-cloud-upload"></i>
                            <h5>{t("drop files here or click to upload")}</h5>
                        </div>
                    </div>
                )}
            </Dropzone>

            {props.showPreview && selectedFiles.length > 0 && (
                <div className="dropzone-previews mt-3" id="uploadPreviewTemplate">
                    {(selectedFiles || []).map((f, i) => {
                        return (
                            <Card className="mt-1 mb-0 shadow-none border" key={i + '-file'}>
                                <div className="p-2">
                                    <Row className="align-items-center">
                                        {f.preview && (
                                            <Col className="col-auto">
                                                <img
                                                    data-dz-thumbnail=""
                                                    className="avatar-sm rounded bg-light"
                                                    alt={f.name}
                                                    src={f.preview}
                                                />
                                            </Col>
                                        )}
                                        {!f.preview && (
                                            <Col className="col-auto">
                                                <div className="avatar-sm">
                                                    <span className="avatar-title bg-primary rounded">
                                                        {f.type.split('/')[0]}
                                                    </span>
                                                </div>
                                            </Col>
                                        )}
                                        <Col className="ps-0">
                                            <Link to="#" className="text-muted fw-bold">
                                                {f.name}
                                            </Link>
                                            <p className="mb-0">
                                                <strong>{f.formattedSize}</strong>
                                            </p>
                                        </Col>
                                        <Col className="text-end">
                                            <button className="btn btn-link btn-lg text-muted shadow-none" >
                                                <i className="dripicons-cross" onClick={() => removeFile(i)}></i>
                                            </button>
                                        </Col>
                                    </Row>

                                </div>
                            </Card>
                        );
                    })
                    }
                    {
                        selectedFiles &&
                        <Row>
                            <Col className='text-center'>
                                <button className='btn btn-primary mt-3' onClick={() => handleUpload(selectedFiles)}
                                    disabled={isLoading}
                                >
                                    {isLoading &&
                                        <Spinner color={'primary'} size={'sm'} />
                                    }&nbsp;
                                    {!isLoading ? t("upload") : t("uploading")}</button>
                            </Col>
                        </Row>
                    }
                </div>
            )}
        </>
    );
};

FileUploader.defaultProps = {
    showPreview: true,
};

export default FileUploader;
