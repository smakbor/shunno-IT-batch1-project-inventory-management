//external lib import
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Spinner, Table } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

//internal lib import
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

        console.log(formData);
        roleUpdate({ id: roleItem?._id, postBody: { permissions: formData } });
    };

    const handleAllSelect = (e) => {

        if (e.target.checked) {
            if (e.target.name === "staffList") {
                reset({

                    "staffCreate": true,
                    "staffDetails": true,
                    "staffUpdate": true,
                    "staffDelete": true
                })
            }
            else if (e.target.name === "allBlog") {
                reset({

                    "blogCreate": true,
                    "blogDetails": true,
                    "blogUpdate": true,
                    "blogDelete": true
                });
            }

        }
        else {
            if (e.target.name === "staffList") {
                reset({

                    "staffCreate": false,
                    "staffDetails": false,
                    "staffUpdate": false,
                    "staffDelete": false
                })
            }
            else if (e.target.name === "allBlog") {
                reset({

                    "blogCreate": false,
                    "blogDetails": false,
                    "blogUpdate": false,
                    "blogDelete": false
                });
            }

        }
    }
    const handleToggle = (e, rowName) => {
        if (rowName === "staffList" && !e.target.checked) {
            reset({
                "staffList": false
            })
        }
        else if (rowName === "allBlog" && !e.target.checked) {
            reset(
                {
                    "allBlog": false
                }
            )
        }

    }
    const handleAllPermissions = (e) => {
        e.target.checked ?
            reset({
                "staffList": true,
                "staffCreate": true,
                "staffDetails": true,
                "staffUpdate": true,
                "staffDelete": true,
                "allBlog": true,
                "blogCreate": true,
                "blogDetails": true,
                "blogUpdate": true,
                "blogDelete": true
            })
            :
            reset({
                "staffList": false,
                "staffCreate": false,
                "staffDetails": false,
                "staffUpdate": false,
                "staffDelete": false,
                "allBlog": false,
                "blogCreate": false,
                "blogDetails": false,
                "blogUpdate": false,
                "blogDelete": false
            })
    }
    useEffect(() => {
        // reset({
        //     "staffList": false,
        //     "staffCreate": true,
        //     "staffDetails": false,
        //     "staffUpdate": true,
        //     "staffDelete": true
        // });
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <FormInput
                label='All Permissions'
                className='checkbox'
                name='allPermissions'
                type="checkbox"
                onClick={(e) => handleAllPermissions(e)}
                register={register}
                placeholder={t('Please enter Owner Name')}
                containerClass={'mb-3'}
                col={'col-md-6 col-xs-12'}
            />
            <Table responsive>
                <thead className="mt-3">
                    <tr>
                        <th>Module Name</th>
                        <th>Add</th>
                        <th>View</th>
                        <th>Edit</th>
                        <th>Delete</th>
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
                                onClick={handleAllSelect}
                                className='checkbox'

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
                                className='checkbox'
                                name='staffCreate'
                                type="checkbox"
                                onClick={(e) => handleToggle(e, 'staffList')}
                                register={register}
                                placeholder={t('Please enter Owner Name')}
                                containerClass={'mb-3'}
                                col={'col-md-6 col-xs-12'}
                            />
                        </td>
                        <td data-title="View">
                            <FormInput
                                onClick={(e) => handleToggle(e, 'staffList')}
                                className='checkbox'
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
                                name='staffUpdate'
                                className='checkbox'
                                type="checkbox"
                                onClick={(e) => handleToggle(e, 'staffList')}
                                register={register}
                                placeholder={t('Please enter Owner Name')}
                                containerClass={'mb-3'}
                                col={'col-md-6 col-xs-12'}
                            />
                        </td>
                        <td data-title="Delete">
                            <FormInput
                                name='staffDelete'
                                className='checkbox'
                                type="checkbox"
                                onCLick={(e) => handleToggle(e, 'staffList')}
                                register={register}
                                placeholder={t('Please enter Owner Name')}
                                containerClass={'mb-3'}
                                col={'col-md-6 col-xs-12'}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td class="text-bold">Blog</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td data-title="#">
                            <FormInput
                                onChange={handleAllSelect}
                                className='checkbox'
                                type="checkbox"
                                name="allBlog"
                                register={register}
                                placeholder={t('Please enter Owner Name')}
                                containerClass={'mb-3'}
                                col={'col-md-6 col-xs-12'}
                            />
                        </td>

                        <td data-title="Add">
                            <FormInput
                                className='checkbox'
                                name='blogCreate'
                                type="checkbox"
                                onChange={(e) => handleToggle(e, 'allBlog')}
                                register={register}
                                placeholder={t('Please enter Owner Name')}
                                containerClass={'mb-3'}
                                col={'col-md-6 col-xs-12'}
                            />
                        </td>
                        <td data-title="View">
                            <FormInput
                                onChange={(e) => handleToggle(e, 'allBlog')}
                                className='checkbox'
                                type="checkbox"
                                name="blogDetails"
                                register={register}
                                placeholder={t('Please enter Owner Name')}
                                containerClass={'mb-3'}
                                col={'col-md-6 col-xs-12'}
                            />
                        </td>
                        <td data-title="Edit">
                            <FormInput
                                name='blogUpdate'
                                className='checkbox'
                                type="checkbox"
                                onChange={(e) => handleToggle(e, 'allBlog')}
                                register={register}
                                placeholder={t('Please enter Owner Name')}
                                containerClass={'mb-3'}
                                col={'col-md-6 col-xs-12'}
                            />
                        </td>
                        <td data-title="Delete">
                            <FormInput
                                name='blogDelete'
                                className='checkbox'
                                type="checkbox"
                                onChange={(e) => handleToggle(e, 'allBlog')}
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
