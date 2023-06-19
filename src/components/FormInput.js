//External Lib Import
import React, { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import classNames from 'classnames';
import { get } from 'lodash';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
//Internal Lib Import
import HyperDatepicker from '../components/Datepicker';
import { Controller } from 'react-hook-form';
import moment from 'moment';

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
    control,
    className,
    labelClassName,
    containerClass,
    refCallback,
    children,
    nested,
    required,
    setValue,
    watchValue,
    option,
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
        case 'datePicker':
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
                    {/* <HyperDatepicker
                        showTimeSelect={false}
                        hideAddon={true}
                        value={watchValue ? new Date(watchValue) : null}
                        onChange={(date) => setValue(name, new Date(date).toDateString())}
                    /> */}
                    <Controller
                        control={control}
                        name={name}
                        render={({ field: { onChange, value, name, ref } }) => {
                            let date;
                            if (value) {
                                date = new Date(value);
                            }
                            return (
                                <DatePicker
                                    placeholderText="Select date"
                                    className="datepicker form-control"
                                    dateFormat="d MMM yyyy"
                                    inputRef={ref}
                                    value={date}
                                    onChange={(date) => onChange(date)}
                                    selected={date}
                                />
                            );
                        }}
                    />
                    {errors && errors[name] && !watchValue ? (
                        <Form.Control.Feedback type="invalid" className="d-block">
                            {errors[name]['message']}
                        </Form.Control.Feedback>
                    ) : null}
                </Form.Group>
            );
            break;
        case 'react-select':
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
                    <Controller
                        control={control}
                        // defaultValue={option.find((dValue) => dValue.value === defaultValues.value)}
                        name={name}
                        render={({ field: { onChange, value, name, ref } }) => {
                            return (
                                <Select
                                    menuPlacement="auto"
                                    inputRef={ref}
                                    classNamePrefix="react-select"
                                    options={option}
                                    value={option?.find((c) => c.value === value)}
                                    onChange={(val) => onChange(val.value)}
                                />
                            );
                        }}
                    />
                    {errors && errors[name] && !watchValue ? (
                        <Form.Control.Feedback type="invalid" className="d-block">
                            {errors[name]['message']}
                        </Form.Control.Feedback>
                    ) : null}
                </Form.Group>
            );
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
                        index={Date.now()}
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
