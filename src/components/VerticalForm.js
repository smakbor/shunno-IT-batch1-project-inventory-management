// @flow
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

type VerticalFromProps = {
    defaultValues?: Object,
    resolver?: any,
    children?: any,
    onSubmit?: (value: any) => void,
    formClass?: string,
};

const VerticalForm = ({
    defaultValues,
    resolver,
    children,
    onSubmit,
    formClass,
}: VerticalFromProps): React$Element<any> => {
    /*
     * form methods
     */
    const methods = useForm({ mode: 'onChange', defaultValues, resolver });
    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
        watch
    } = methods;
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={formClass} noValidate>
            <Row>
                {Array.isArray(children)
                    ? children.map((child, i) => {
                        return (
                            child.props && (
                                <Col className={child.props.col} key={i}>
                                    {child.props && child.props.name
                                        ? React.createElement(child.type, {
                                            ...{
                                                ...child.props,
                                                register,
                                                key: child.props.name,
                                                errors,
                                                control,
                                            },
                                        })
                                        : child}
                                </Col>
                            )
                        );
                    })
                    : children}
            </Row>
        </form>
    );
};

export default VerticalForm;
