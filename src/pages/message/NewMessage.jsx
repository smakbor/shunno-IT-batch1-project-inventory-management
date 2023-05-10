import React, { useState } from 'react';
import RichEditor from '../../components/RichEditor';
import { FormInput, VerticalForm } from '../../components';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
const NewMessage = () => {
    const [content, setContent] = useState("")
    const { t } = useTranslation();
    const handleSubmit = formData => {
        const message = content
        formData = { ...formData, message }
        console.log(formData)
    }
    return (
        <div className='px-3'>
            <div className='d-flex align-items-center justify-content-between'>
                <h3 className='text-start'>{t('new message')}</h3>
                <div>
                    {/* <button>fullscreen</button> */}
                </div>
            </div>

            <hr className='w-100' />
            <VerticalForm onSubmit={handleSubmit} className='m-3'>
                <FormInput
                    label={t('receiver name')}
                    type="select"
                    name="receiver"
                    containerClass={'mb-2 d-flex justify-content-between'}
                    className='w-75'
                    labelClassName='fs-4'
                >
                    <option value="omy">Omy</option>
                    <option value="sujon">Sujon</option>
                    <option value="akbor">Akbor</option>
                </FormInput>
                <br col={'col-12'} />
                <FormInput
                    label={t('subject')}
                    type="text"
                    name="subject"
                    placeholder={t("please write subject")}
                    containerClass={'mb-2 d-flex justify-content-between'}
                    className='w-75'
                    labelClassName='fs-4'
                />
                <br col={'col-12'} />
                <div className='mb-2 d-flex justify-content-between'>
                    <p className='fs-4'>{t("message")}</p>
                    <div className='w-75'>
                        <RichEditor content={content} setContent={setContent} />
                    </div>
                </div>

                <div col={'col-12'} className='text-end'>
                    <Button size="md" variant='primary' type='submit'>{t("send")}</Button>
                </div>
            </VerticalForm>

        </div>
    );
};

export default NewMessage;