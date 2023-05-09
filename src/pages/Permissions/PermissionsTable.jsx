//External Lib Import
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge, Button, Spinner, Table } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

//Internal Lib Import
import { FormInput } from '../../components';

//api services
import { useRoleUpdateMutation } from '../../redux/services/roleService';
import { useProfileDetailsQuery } from '../../redux/services/profileService';

const PermissionsTable = ({ roleItem, index }) => {
    const { t } = useTranslation();
    const [roleUpdate, { isLoading }] = useRoleUpdateMutation();
    const { data: profile } = useProfileDetailsQuery() || {};

    /*
     * form validation schema
     */
    const resolver = yupResolver(yup.object().shape({}));

    /*
     * form methods
     */
    const methods = useForm({ mode: 'onChange', resolver });
    const { handleSubmit, register, reset } = methods;

    const handleAllPermissions = (e) => {
        e.target.checked
            ? reset({
                  roles: true,
                  createRole: true,
                  readRole: true,
                  updateRole: true,
                  deleteRole: true,
                  categories: true,
                  createCategory: true,
                  readCategory: true,
                  updateCategory: true,
                  deleteCategory: true,
              })
            : reset({
                  roles: false,
                  createRole: false,
                  readRole: false,
                  updateRole: false,
                  deleteRole: false,
                  categories: false,
                  createCategory: false,
                  readCategory: false,
                  updateCategory: false,
                  deleteCategory: false,
              });
    };

    const handleModuleSelect = (e) => {
        if (e.target.checked) {
            if (e.target.name === 'roles') {
                reset({
                    createRole: true,
                    readRole: true,
                    updateRole: true,
                    deleteRole: true,
                });
            } else if (e.target.name === 'categories') {
                reset({
                    createCategory: true,
                    readCategory: true,
                    updateCategory: true,
                    deleteCategory: true,
                });
            }
        } else {
            if (e.target.name === 'roles') {
                reset({
                    createRole: false,
                    readRole: false,
                    updateRole: false,
                    deleteRole: false,
                });
            } else if (e.target.name === 'categories') {
                reset({
                    createCategory: false,
                    readCategory: false,
                    updateCategory: false,
                    deleteCategory: false,
                });
            }
        }
    };

    const handleToggle = (e, rowName) => {
        if (rowName === 'roles' && !e.target.checked) {
            reset({
                roles: false,
            });
        } else if (rowName === 'categories' && !e.target.checked) {
            reset({
                categories: false,
            });
        }
    };

    useEffect(() => {
        if (roleItem) {
            reset(roleItem.permissions);
        }
    }, [roleItem]);

    /*
     * handle form submission
     */
    const onSubmit = (formData) => {
        roleUpdate({
            id: roleItem?._id,
            postBody: { storeID: profile?.storeID, permissions: formData, name: roleItem.label },
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <FormInput
                label={t('all permissions')}
                className="checkbox"
                name={'allPermissions' + index}
                type="checkbox"
                onClick={(e) => handleAllPermissions(e)}
                register={register}
                containerClass={'mb-3'}
                col={'col-md-6 col-xs-12'}
            />
            <Table responsive>
                <thead className="mt-3">
                    <tr>
                        <th>{t('module name')}</th>
                        <th>{t('add')}</th>
                        <th>{t('view')}</th>
                        <th>{t('edit')}</th>
                        <th>{t('delete')}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="text-bold">{t('roles')}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td data-title="#">
                            <FormInput
                                onClick={handleModuleSelect}
                                className="checkbox"
                                type="checkbox"
                                name="roles"
                                register={register}
                                containerClass={'mb-3'}
                                col={'col-md-6 col-xs-12'}
                            />
                        </td>

                        <td data-title="Add">
                            <FormInput
                                className="checkbox"
                                name="createRole"
                                type="checkbox"
                                onClick={(e) => handleToggle(e, 'roles')}
                                register={register}
                                containerClass={'mb-3'}
                                col={'col-md-6 col-xs-12'}
                            />
                        </td>
                        <td data-title="View">
                            <FormInput
                                onClick={(e) => handleToggle(e, 'roles')}
                                className="checkbox"
                                type="checkbox"
                                name="readRole"
                                register={register}
                                containerClass={'mb-3'}
                                col={'col-md-6 col-xs-12'}
                            />
                        </td>
                        <td data-title="Edit">
                            <FormInput
                                name="updateRole"
                                className="checkbox"
                                type="checkbox"
                                onClick={(e) => handleToggle(e, 'roles')}
                                register={register}
                                containerClass={'mb-3'}
                                col={'col-md-6 col-xs-12'}
                            />
                        </td>
                        <td data-title="Delete">
                            <FormInput
                                name="deleteRole"
                                className="checkbox"
                                type="checkbox"
                                onCLick={(e) => handleToggle(e, 'roles')}
                                register={register}
                                containerClass={'mb-3'}
                                col={'col-md-6 col-xs-12'}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td class="text-bold">{t('categories')}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td data-title="#">
                            <FormInput
                                onChange={handleModuleSelect}
                                className="checkbox"
                                type="checkbox"
                                name="categories"
                                register={register}
                                containerClass={'mb-3'}
                                col={'col-md-6 col-xs-12'}
                            />
                        </td>

                        <td data-title="Add">
                            <FormInput
                                className="checkbox"
                                name="createCategory"
                                type="checkbox"
                                onChange={(e) => handleToggle(e, 'categories')}
                                register={register}
                                containerClass={'mb-3'}
                                col={'col-md-6 col-xs-12'}
                            />
                        </td>
                        <td data-title="View">
                            <FormInput
                                onChange={(e) => handleToggle(e, 'categories')}
                                className="checkbox"
                                type="checkbox"
                                name="readCategory"
                                register={register}
                                containerClass={'mb-3'}
                                col={'col-md-6 col-xs-12'}
                            />
                        </td>
                        <td data-title="Edit">
                            <FormInput
                                name="updateCategory"
                                className="checkbox"
                                type="checkbox"
                                onChange={(e) => handleToggle(e, 'categories')}
                                register={register}
                                containerClass={'mb-3'}
                                col={'col-md-6 col-xs-12'}
                            />
                        </td>
                        <td data-title="Delete">
                            <FormInput
                                name="deleteCategory"
                                className="checkbox"
                                type="checkbox"
                                onChange={(e) => handleToggle(e, 'categories')}
                                register={register}
                                containerClass={'mb-3'}
                                col={'col-md-6 col-xs-12'}
                            />
                        </td>
                    </tr>
                </tbody>
                {/* disabled={'isLoading'} */}
                <div className="mt-3 border-0">
                    <Button variant="primary" type="submit">
                        {t('save permission for')}{' '}
                        <span className="p-0 bg-danger">
                            <Badge bg="info">{t(roleItem?.label)}</Badge>
                        </span>
                        &nbsp;
                        {isLoading && <Spinner color={'primary'} size={'sm'} className="p-0" />}
                    </Button>
                </div>
            </Table>
        </form>
    );
};

export default PermissionsTable;
