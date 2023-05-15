//External Lib Import
import React, { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import classNames from 'classnames';
import { get } from 'lodash';

/* Password Input */
const PasswordInput = ({ name, placeholder, refCallback, errors, register, className }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <InputGroup className="mb-0">
                <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    placeholder={placeholder}
                    name={name}
                    id={name}
                    as="input"
                    ref={(r) => {
                        if (refCallback) refCallback(r);
                    }}
                    className={className}
                    isInvalid={errors && errors[name] ? true : false}
                    {...(register ? register(name) : {})}
                    autoComplete={name}
                />
                <div
                    className={classNames('input-group-text', 'input-group-password', {
                        'show-password': showPassword,
                    })}
                    data-password={showPassword ? 'true' : 'false'}>
                    <span
                        className="password-eye"
                        onClick={() => {
                            setShowPassword(!showPassword);
                        }}></span>
                </div>
            </InputGroup>
        </>
    );
};

const FormInput = ({
    label,
    type,
    name,
    placeholder,
    register,
    errors,
    className,
    labelClassName,
    containerClass,
    refCallback,
    children,
    nested,
    required,
    ...otherProps
}) => {
    // handle input type
    const comp = type === 'textarea' ? 'textarea' : type === 'select' ? 'select' : 'input';

    switch (type) {
        case 'hidden':
            return <input type={type} name={name} {...(register ? register(name) : {})} {...otherProps} />;
            break;
        case 'password':
            return (
                <Form.Group className={containerClass}>
                    {label ? (
                        <>
                            {' '}
                            <Form.Label className={labelClassName} htmlFor={name}>
                                {label}
                            </Form.Label>{' '}
                            {children}{' '}
                        </>
                    ) : null}{' '}
                    {required && <span className="text-danger">*</span>}
                    <PasswordInput
                        name={name}
                        placeholder={placeholder}
                        refCallback={refCallback}
                        errors={errors}
                        register={register}
                        className={className}
                    />
                    {errors && errors[name] ? (
                        <Form.Control.Feedback type="invalid" className="d-block">
                            {errors[name]['message']}
                        </Form.Control.Feedback>
                    ) : null}
                </Form.Group>
            );
            break;
        case 'select':
            return (
                <Form.Group className={containerClass}>
                    {label ? (
                        <Form.Label className={labelClassName} htmlFor={name}>
                            {label}
                        </Form.Label>
                    ) : null}{' '}
                    {required && <span className="text-danger">*</span>}
                    <Form.Select
                        type={type}
                        placeholder={placeholder}
                        label={label}
                        name={name}
                        id={name}
                        ref={(r) => {
                            if (refCallback) refCallback(r);
                        }}
                        comp={comp}
                        className={className}
                        isInvalid={errors && errors[name] ? true : false}
                        {...(register ? register(name) : {})}
                        {...otherProps}>
                        {children}
                    </Form.Select>
                    {errors && errors[name] ? (
                        <Form.Control.Feedback type="invalid">{errors[name]['message']}</Form.Control.Feedback>
                    ) : null}
                </Form.Group>
            );
            break;
        case 'checkbox':
        case 'radio':
            return (
                <Form.Group className={containerClass}>
                    <Form.Check
                        type={type}
                        label={label}
                        name={name}
                        id={name}
                        ref={(r) => {
                            if (refCallback) refCallback(r);
                        }}
                        className={className}
                        isInvalid={errors && errors[name] ? true : false}
                        {...(register ? register(name) : {})}
                        {...otherProps}
                    />

                    {errors && errors[name] ? (
                        <Form.Control.Feedback type="invalid">{errors[name]['message']}</Form.Control.Feedback>
                    ) : null}
                </Form.Group>
            );
            break;
        default:
            return nested ? (
                <Form.Group className={containerClass}>
                    {label ? (
                        <Form.Label className={labelClassName} htmlFor={name}>
                            {label}
                        </Form.Label>
                    ) : null}{' '}
                    {required && <span className="text-danger">*</span>}
                    <Form.Control
                        type={type}
                        placeholder={placeholder}
                        name={name}
                        id={name}
                        as={comp}
                        ref={(r) => {
                            if (refCallback) refCallback(r);
                        }}
                        className={className}
                        isInvalid={errors && get(errors, name) ? true : false}
                        {...(register ? register(name) : {})}
                        {...otherProps}
                        autoComplete={name}>
                        {children ? children : null}
                    </Form.Control>
                    {nested && get(errors, name) ? (
                        <Form.Control.Feedback type="invalid">{get(errors, name)?.message}</Form.Control.Feedback>
                    ) : null}
                </Form.Group>
            ) : (
                <Form.Group className={containerClass}>
                    {label ? (
                        <Form.Label className={labelClassName} htmlFor={name}>
                            {label}
                        </Form.Label>
                    ) : null}{' '}
                    {required && <span className="text-danger">*</span>}
                    <Form.Control
                        type={type}
                        placeholder={placeholder}
                        name={name}
                        id={name}
                        as={comp}
                        ref={(r) => {
                            if (refCallback) refCallback(r);
                        }}
                        className={className}
                        isInvalid={errors && errors[name] ? true : false}
                        {...(register ? register(name) : {})}
                        {...otherProps}
                        autoComplete={name}>
                        {children ? children : null}
                    </Form.Control>
                    {errors && errors[name] ? (
                        <Form.Control.Feedback type="invalid">{errors[name]['message']}</Form.Control.Feedback>
                    ) : null}
                </Form.Group>
            );
            break;
    }
};

export default FormInput;
