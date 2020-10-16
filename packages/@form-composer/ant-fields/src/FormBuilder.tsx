import React, {FC} from 'react'
import {FieldsBuilder, Form, RenderCount} from '@form-composer/core'
import {Form as FinalForm} from 'react-final-form'
import "antd/dist/antd.css";

export interface FormBuilderProps {
    form: Form,
}

const FF: any = FinalForm

export const FormBuilder: FC<FormBuilderProps> = ({form}) => {
    return (
        <FF form={form.finalForm} subscription={{ submitting: true, pristine: true }} >
            {() => (
                <div>
                    <RenderCount />
                    <FieldsBuilder form={form} fields={form.fields}/>
                </div>
            )}
        </FF>
    )
}