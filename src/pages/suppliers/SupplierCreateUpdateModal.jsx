//External Lib Import
import React, { useEffect } from 'react';
import { Card, Button, Modal, Spinner } from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import Select from 'react-select';

//Internal Lib Import
import { FormInput, VerticalForm } from '../../components';
import removeEmptyObj from '../../helpers/removeEmptyObj';

//api services

import { useManufacturerCreateMutation, useManufacturerUpdateMutation } from '../../redux/services/manufacturerService';

const ManufacturerCreateUpdateModal = ({ modal, setModal, toggle, editData, defaultValues }) => {
    const { t } = useTranslation();

    const [manufacturerCreate, { isLoading, isSuccess }] = useManufacturerCreateMutation();
    const [manufacturerUpdate, { isLoading: updateLoad, isSuccess: updateSuccess }] = useManufacturerUpdateMutation();

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            name: yup.string().required(t('please enter manufacturer name')).min(3, t('minimum containing 3 letter')),
            isEcom: yup.boolean().required(),
        })
    );

    //slugify

    /*
     * handle form submission
     */
    // {
    //     "name": "Nahid",
    //     "mobile": "01717487771",
    //     "email": "arifulislamnahid98@gmail.com",
    //     "fatherName":"Mr X",
    //     "company":"Nahid Trading",
    //     "address": "Kusthia",
    //     "remarks":"Relative Supplier",
    //     "thana":"Kusthia Sadar",
    //     "district":"Kushtia",
    //     "nid": "65165416352",
    //     "reference": {
    //         "name": "comok",
    //         "mobile": "01725785177",
    //         "address": "Bic",
    //         "nid":"564319653165",
    //         "relation":"Brother"

    //     },
    //     "due": 80,
    //     "storeID":"602e42e46ebade5b1c7cf45f"
    // }
    const onSubmit = (formData) => {
        const data = {};
        data.name = formData.name;
        data.status = formData.status;

        if (!editData) {
            manufacturerCreate(removeEmptyObj(data));
        } else {
            const postBody = removeEmptyObj(data);
            manufacturerUpdate({ id: editData._id, postBody });
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
                        <h4 className="modal-title">
                            {editData ? t('update manufacturer') : t('create manufacturer')}
                        </h4>
                    </Modal.Header>

                    <Modal.Body>
                        <VerticalForm onSubmit={onSubmit} resolver={schemaResolver} defaultValues={defaultValues}>
                            <FormInput
                                label={t('manufacturer name')}
                                type="text"
                                name="name"
                                placeholder={t('please enter manufacturer name')}
                                containerClass={'mb-3'}
                                col={'col-12'}
                            />
                            <FormInput
                                name="status"
                                type="select"
                                label="status"
                                col={'col-12'}
                                containerClass={'mb-3'}>
                                <option value="ACTIVE">Active</option>
                                <option value="INACTIVE">Inactive</option>
                            </FormInput>

                            <div className="mb-3 text-end">
                                <Button variant="primary" type="submit">
                                    {editData ? t('update manufacturer') : t('create manufacturer')}
                                    &nbsp;{(isLoading || updateLoad) && <Spinner color={'primary'} size={'sm'} />}
                                </Button>
                            </div>
                        </VerticalForm>
                    </Modal.Body>
                </Modal>
            </Card.Body>
        </Card>
    );
};

export default ManufacturerCreateUpdateModal;
