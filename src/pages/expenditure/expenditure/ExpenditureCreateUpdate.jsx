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

import { useExpenditureCreateMutation, useExpenditureUpdateMutation } from '../../../redux/services/expenditureService';
import { useSelector } from 'react-redux';
import { useStaffListQuery } from '../../../redux/services/staffService';

const ModalCreateUpdate = ({ modal, setModal, toggle, editData, defaultValues, costSectionData }) => {
    const { t } = useTranslation();
    const storeID = useSelector((state) => state.setting.activeStore._id);
    const { data: staffList } = useStaffListQuery(storeID, {
        skip: !storeID,
    });
    const [expenditureCreate, { isLoading, isSuccess }] = useExpenditureCreateMutation();
    const [expenditureUpdate, { isLoading: updateLoad, isSuccess: updateSuccess }] = useExpenditureUpdateMutation();

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            staffID: yup.string().required(t('select employee')),
            purposeID: yup.string().required(t('select cost section')),
        })
    );

    /*
     * handle form submission
     */
    const onSubmit = (formData) => {
        formData.storeID = storeID;
        const postBody = removeEmptyObj(formData);

        if (!editData) {
            expenditureCreate({ storeID, postBody });
        } else {
            expenditureUpdate({ id: editData._id, postBody });
        }
    };

    // useEffect(() => {
    //     if (isSuccess || updateSuccess) {
    //        ;
    //     }
    // }, [isSuccess, updateSuccess]);

    return (
        <Card className={classNames('', { 'd-none': !modal })}>
            <Card.Body>
                <Modal show={modal} onHide={toggle} backdrop="statica" keyboard={false} size="lg">
                    <Modal.Header onHide={toggle} closeButton>
                        <h4 className="modal-title">{editData ? t('edit expenditure') : t('add expenditure')}</h4>
                    </Modal.Header>

                    <Modal.Body>
                        <VerticalForm onSubmit={onSubmit} resolver={schemaResolver} defaultValues={defaultValues}>
                            <FormInput
                                name="staffID"
                                type="select"
                                label={t('employee')}
                                defaultValue=""
                                col={'col-12'}
                                containerClass={'mb-3'}>
                                <option value="" disabled>
                                    {t('select employee')}
                                </option>
                                {staffList &&
                                    staffList.map((staff) => (
                                        <option key={staff._id} value={staff._id}>
                                            {staff.name}
                                        </option>
                                    ))}
                            </FormInput>
                            <FormInput
                                name="purposeID"
                                type="select"
                                label={t('select cost section')}
                                defaultValue=""
                                col={'col-12'}
                                containerClass={'mb-3'}>
                                <option value="" disabled>
                                    {t('select cost section')}
                                </option>
                                {costSectionData?.map((item) => {
                                    return (
                                        <option key={item._id} value={item._id}>
                                            {item.name}
                                        </option>
                                    );
                                })}
                            </FormInput>

                            <FormInput
                                label={t('amount')}
                                type="number"
                                name="amount"
                                placeholder={t('please enter amount')}
                                containerClass={'mb-3'}
                                col={'col-12'}
                            />
                            <FormInput
                                label={t('remarks')}
                                type="text"
                                name="remarks"
                                placeholder={t('please enter note')}
                                containerClass={'mb-3'}
                                col={'col-12'}
                            />

                            <div className="mb-3 text-end">
                                <Button variant="primary" type="submit" onClick={() => setModal(false)}>
                                    {editData ? t('update') : t('submit')}
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
