import { t } from 'i18next';
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
const ExcelImportModal = ({ showModal, setImportedFile, openModal, closeModal, importExcel }) => {


    return (
        <Modal show={showModal} onHide={closeModal}>
            <Modal.Header className='justify-content-center' closeButton>
                <Modal.Title>
                    {t("import excel")}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input type="file" accept=".xlsx, .xls" onChange={(e) => setImportedFile(e.target.files[0])} />
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
