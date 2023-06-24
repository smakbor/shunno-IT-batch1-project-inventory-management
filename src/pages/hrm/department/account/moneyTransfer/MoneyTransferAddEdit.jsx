//External Lib Import
import React, { useEffect } from 'react';
import { Card, Modal } from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

//Internal Lib Import
import MappedComponent from '../../../../mappedComponent/MappedComponent';
import removeEmptyObj from '../../../../../helpers/removeEmptyObj';
import {
    useMoneyTransferCreateMutation,
    useMoneyTransferUpdateMutation,
} from '../../../../../redux/services/moneyTransferService';
//api services

const MoneyTransferAddEdit = ({ modal, setModal, toggle, editData, defaultValues }) => {
    const { t } = useTranslation();
    const store = useSelector((state) => state.setting.activeStore?._id);

    const [moneyTransferCreate, { isLoading, isSuccess, error }] = useMoneyTransferCreateMutation();
    const [moneyTransferUpdate, { isLoading: updateLoad, isSuccess: updateSuccess }] = useMoneyTransferUpdateMutation();

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            name: yup.string().required(t('please enter name')).min(3, t('minimum containing 3 letter')),
            accountNumber: yup.string(),
            initialBalance: yup.number(),
        })
    );

    useEffect(() => {
        if (isSuccess || updateSuccess) {
            setModal(false);
        }
    }, [isSuccess, updateSuccess]);

    const inputData = [
        {
            label: t('name'),
            type: 'text',
            name: 'name',
            placeholder: t('please enter name'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-6',
            required: true,
        },
        {
            label: t('account number'),
            type: 'text',
            name: 'accountNumber',
            placeholder: t('please enter account number number'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-6',
            required: true,
        },
        {
            label: t('initial balance'),
            type: 'number',
            name: 'initialBalance',
            placeholder: t('please enter initial balance'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-6',
            required: true,
        },
        {
            label: t('credit'),
            type: 'number',
            name: 'credit',
            placeholder: t('please enter credit'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-6',
            required: false,
        },
        {
            label: t('debit'),
            type: 'number',
            name: 'debit',
            placeholder: t('please enter debit'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-6',
            required: false,
        },
        {
            label: t('note'),
            type: 'text',
            name: 'note',
            placeholder: t('please enter note'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-6',
            required: false,
        },
    ];

    const onSubmit = (formData) => {
        formData.store = store;
        formData.initialBalance = Number(formData.initialBalance);
        formData.credit = Number(formData.credit);
        formData.debit = Number(formData.debit);
        if (!editData) {
            moneyTransferCreate(removeEmptyObj(formData));
        } else {
            const updatedData = { ...editData, ...formData };
            moneyTransferUpdate(removeEmptyObj(updatedData));
        }
    };

    return (
        <Card className={classNames('', { 'd-none': !modal })}>
            <Card.Body>
                <Modal show={modal} onHide={toggle} backdrop="statica" keyboard={false} size="lg">
                    <Modal.Header onHide={toggle} closeButton>
                        <h4 className="modal-title">{editData ? t('update moneyTransfer') : t('add moneyTransfer')}</h4>
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
                            updateTitle={t('update moneytransfer')}
                            createTitle={t('add moneytransfer')}
                            error={error?.data}
                        />
                    </Modal.Body>
                </Modal>
            </Card.Body>
        </Card>
    );
};

export default MoneyTransferAddEdit;
