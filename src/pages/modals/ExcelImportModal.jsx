import { t } from 'i18next';
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
const ExcelImportModal = ({ showModal, setImportedFile, openModal, closeModal, importExcel, target, columnOrder }) => {


    return (
        <Modal show={showModal} onHide={closeModal}>
            <Modal.Header className='justify-content-center' closeButton>
                <Modal.Title>
                    {t(`import ${target}`)}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h6 className='mb-3 mt-0'>{t("labels marked with star are required")}</h6>
                <h4 className='mb-4'>{t("correct column order is")}:{columnOrder}</h4>
                <div className='d-flex justify-content-between'>
                    <input className='form-control d-inline-block w-75' type="file" accept=".xlsx, .xls" onChange={(e) => setImportedFile(e.target.files[0])} />
                    <Button variant="info" className='d-block'>
                        <i className='dripicons-download me-1' />
                        {t("demo")}
                    </Button>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={importExcel}>
                    {t("import")}
                </Button>
                <Button variant="secondary" onClick={closeModal}>
                    {t("cancel")}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ExcelImportModal;
