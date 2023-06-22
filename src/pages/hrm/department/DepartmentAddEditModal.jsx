//External Lib Import
import React, { useEffect } from 'react';
import { Card, Modal } from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

//Internal Lib Import
import removeEmptyObj from '../../../helpers/removeEmptyObj';
import MappedComponent from '../../../pages/mappedComponent/MappedComponent';
//api services
import { useDepartmentCreateMutation, useDepartmentUpdateMutation } from '../../../redux/services/departmentService';
import { useSelector } from 'react-redux';

const DepartmentAddEditModal = ({ modal, setModal, toggle, editData, defaultValues }) => {
    const { t } = useTranslation();
    const store = useSelector((state) => state.setting.activeStore?._id);
    const [departmentCreate, { isLoading, isSuccess }] = useDepartmentCreateMutation();
    const [departmentUpdate, { isLoading: updateLoad, isSuccess: updateSuccess }] = useDepartmentUpdateMutation();

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            name: yup.string().required(t('please enter department name')).min(2, t('minimum containing 2 letters')),
            status: yup.string().required(t('please select status')),
        })
    );

    const inputData = [
        {
            label: t('department name'),
            type: 'text',
            name: 'name',
            placeholder: t('please enter name'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-12 col-lg-12',
            required: true,
        },
        {
            label: t('description'),
            type: 'text',
            name: 'description',
            placeholder: t('please enter description'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-12 col-lg-12',
            required: true,
        },
        {
            label: t('status'),
            type: 'react-select',
            name: 'status',
            placeholder: t('please enter status'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-12 col-lg-12',
            required: false,
            options: [
                { label: 'please select status', value: '' },
                { label: 'active', value: 'ACTIVE' },
                { label: 'inactive', value: 'INACTIVE' },
            ],
        },
    ];

    /*
     * handle form submission
     */
    const onSubmit = (formData) => {
        formData.store = store;
        console.log(formData);
        if (!editData) {
            departmentCreate(removeEmptyObj(formData));
        } else {
            const updatedData = { ...editData, ...formData };
            const postBody = removeEmptyObj(updatedData);
            departmentUpdate(postBody);
        }
    };

    useEffect(() => {
        if (isSuccess || updateSuccess) {
            setModal(false);
        }
    }, [isSuccess, updateSuccess]);

    return (
        <Card className={classNames('', { 'd-none': !modal })}>
            <Card.Body>
                <Modal show={modal} onHide={toggle} backdrop="statica" keyboard={false}>
                    <Modal.Header onHide={toggle} closeButton>
                        <h4 className="modal-title">{editData ? t('update department') : t('create department')}</h4>
                    </Modal.Header>

                    <Modal.Body>
                        <MappedComponent
                            inputField={inputData}
                            onSubmit={onSubmit}
                            defaultValues={defaultValues}
                            schemaResolver={schemaResolver}
                            isLoading={isLoading}
                            updateLoad={updateLoad}
                            editData={editData}
                            updateTitle={t('update department')}
                            createTitle={t('create department')}
                        />
                    </Modal.Body>
                </Modal>
            </Card.Body>
        </Card>
    );
};

export default DepartmentAddEditModal;
