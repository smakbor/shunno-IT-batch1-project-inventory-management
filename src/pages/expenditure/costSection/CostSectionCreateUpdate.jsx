//external lib import
import React, { useEffect } from 'react';
import { Card, Button, Modal, Spinner } from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import Select from 'react-select';

//internal lib import
import { FormInput, VerticalForm } from '../../../components';
import removeEmptyObj from '../../../helpers/removeEmptyObj';

//api services

import { useCostSectionCreateMutation, useCostSectionUpdateMutation } from '../../../redux/services/costSectionService';
import { useSelector } from 'react-redux';

const ModalCreateUpdate = ({ modal, setModal, toggle, editData, defaultValues }) => {
    const { t } = useTranslation();
    const storeID = useSelector(state => state.setting.activeStore._id)
    const [costSectionCreate, { isLoading, isSuccess }] = useCostSectionCreateMutation();
    const [costSectionUpdate, { isLoading: updateLoad, isSuccess: updateSuccess }] = useCostSectionUpdateMutation();

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            name: yup.string().required(t('please enter cost section')).min(2, t('minimum containing 2 letters')),
        })
    );

    /*
     * handle form submission
     */
    const onSubmit = (formData) => {
        const data = {};
        data.name = formData.name;

        if (!editData) {
            costSectionCreate({ storeID, postBody: removeEmptyObj(data) });
        } else {
            const updatedData = { ...editData, ...data };

            const postBody = removeEmptyObj(updatedData);
            costSectionUpdate({ id: editData._id, postBody });
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
                        <h4 className="modal-title">{editData ? t('edit cost section') : t('add cost section')}</h4>
                    </Modal.Header>

                    <Modal.Body>
                        <VerticalForm onSubmit={onSubmit} resolver={schemaResolver} defaultValues={defaultValues}>
                            <FormInput
                                label={t('cost section name')}
                                type="text"
                                name="name"
                                placeholder={t('please enter cost section')}
                                containerClass={'mb-3'}
                                col={'col-12'}
                            />

                            <div className="mb-3 text-end">
                                <Button variant="primary" type="submit">
                                    {editData ? t('update') : t('Submit')}
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

export default ModalCreateUpdate;
