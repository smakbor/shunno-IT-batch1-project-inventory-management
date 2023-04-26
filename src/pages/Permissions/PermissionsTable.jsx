//External Lib Import
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Spinner, Table } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

//Internal Lib Import
import { FormInput } from '../../components';

//api services
import { useRoleUpdateMutation } from '../../redux/services/roleService';

const PermissionsTable = ({ roleItem }) => {
    const { t } = useTranslation();

    const [roleUpdate, { isLoading }] = useRoleUpdateMutation();

    /*
     * form validation schema
     */
    const resolver = yupResolver(yup.object().shape({}));

    /*
     * form methods
     */
    const methods = useForm({ mode: 'onChange', resolver });
    const { handleSubmit, register, reset } = methods;

    /*
     * handle form submission
     */
    const onSubmit = (formData) => {
        roleUpdate({ id: roleItem?._id, postBody: { permissions: formData } });
    };

    useEffect(() => {
        reset(roleItem?.permissions);
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Table responsive>
                <thead className="mt-3">
                    <tr>
                        <th>Module Name</th>
                        <th>Add</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        <th>View</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="text-bold">User</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td data-title="#">
                            <FormInput
                                type="checkbox"
                                name="staffList"
                                register={register}
                                placeholder={t('Please enter Owner Name')}
                                containerClass={'mb-3'}
                                col={'col-md-6 col-xs-12'}
                            />
                        </td>

                        <td data-title="Add">
                            <FormInput
                                type="checkbox"
                                name="staffCreate"
                                register={register}
                                placeholder={t('Please enter Owner Name')}
                                containerClass={'mb-3'}
                                col={'col-md-6 col-xs-12'}
                            />
                        </td>
                        <td data-title="View">
                            <FormInput
                                type="checkbox"
                                name="staffDetails"
                                register={register}
                                placeholder={t('Please enter Owner Name')}
                                containerClass={'mb-3'}
                                col={'col-md-6 col-xs-12'}
                            />
                        </td>
                        <td data-title="Edit">
                            <FormInput
                                type="checkbox"
                                name="staffUpdate"
                                register={register}
                                placeholder={t('Please enter Owner Name')}
                                containerClass={'mb-3'}
                                col={'col-md-6 col-xs-12'}
                            />
                        </td>
                        <td data-title="Delete">
                            <FormInput
                                type="checkbox"
                                name="staffDelete"
                                register={register}
                                placeholder={t('Please enter Owner Name')}
                                containerClass={'mb-3'}
                                col={'col-md-6 col-xs-12'}
                            />
                        </td>
                    </tr>
                </tbody>
                {/* disabled={'isLoading'} */}
                <div className="mt-3 border-0">
                    <Button variant="primary" type="submit">
                        Save Permission For <span className="p-0 bg-danger">{t(roleItem?.name)}</span>&nbsp;
                        {isLoading && <Spinner color={'primary'} size={'sm'} className="p-0" />}
                    </Button>
                </div>
            </Table>
        </form>
    );
};

export default PermissionsTable;
