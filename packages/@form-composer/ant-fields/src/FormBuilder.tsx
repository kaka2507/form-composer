import React, {FC} from 'react'
import {FieldsBuilder, Form, Field, RenderCount} from '@form-composer/core'
import {Form as FinalForm} from 'react-final-form'
import "antd/dist/antd.css";

export interface FormBuilderProps {
    form: Form,
    fields?: Field[]
}

const FF: any = FinalForm

export const FormBuilder: FC<FormBuilderProps> = ({form, fields}) => {
    const renderFields = fields? fields : form.fields
    return (
        <FF form={form.finalForm} subscription={{ }} >
            {() => (
                <FieldsBuilder form={form} fields={renderFields}/>
            )}
        </FF>
    )
}