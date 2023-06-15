import { Button, Col, Row, Spinner } from 'react-bootstrap';
import { FormInput } from '../../../components';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const MappedComponent = ({
    inputField,
    onSubmit,
    schemaResolver,
    defaultValues,
    isLoading,
    updateLoad,
    editData,
    updateTitle,
    createTitle,
}) => {
    const methods = useForm({ mode: 'onChange', defaultValues, resolver: schemaResolver });

    const {
        handleSubmit,
        register,
        control,
        setValue,
        reset,
        formState: { errors },
    } = methods;

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={'formClass'} noValidate>
            <Row>
                {inputField.map((item) => {
                    if (editData && item.isVisible == false) {
                        return (
                            <Col className="d-none">
                                <FormInput
                                    label={item.label}
                                    type={item.type}
                                    name={item.name}
                                    placeholder={item.placeholder}
                                    containerClass={item.containerClass}
                                    required={item.required}
                                    register={register}
                                    errors={errors}
                                    option={item.options}
                                    control={control}
                                    watchValue={item.watchValue}
                                    setValue={setValue}></FormInput>
                            </Col>
                        );
                    } else {
                        return (
                            <Col className={item.col}>
                                <FormInput
                                    label={item.label}
                                    type={item.type}
                                    name={item.name}
                                    placeholder={item.placeholder}
                                    containerClass={item.containerClass}
                                    required={item.required}
                                    register={register}
                                    errors={errors}
                                    option={item.options}
                                    control={control}
                                    watchValue={item.watchValue}
                                    setValue={setValue}></FormInput>
                            </Col>
                        );
                    }
                })}

                <div className="mt-3 text-end">
                    <Button variant="primary" type="submit">
                        {editData ? updateTitle : createTitle}
                        &nbsp;{(isLoading || updateLoad) && <Spinner color={'primary'} size={'sm'} />}
                    </Button>
                </div>
            </Row>
        </form>
    );
};

export default MappedComponent;
