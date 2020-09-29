import React from "react";
import {Input} from 'antd';
import {parseText} from "./format";
import {Field, FieldComponent, Form} from "@form-composer/core";
import {FieldRenderProps} from "react-final-form";
import {BaseField} from "./BaseField";


interface TextFieldProps extends FieldRenderProps<any, HTMLElement> {
    field: Field & { placeholder: string }
    form: Form
}

const TextField = ({form, field, input, meta}: TextFieldProps) => {
    return (
        <BaseField field={field} form={form} input={input} meta={meta}>
            <Input {...input} placeholder={field.placeholder}/>
        </BaseField>
    )
}

export const TextFieldComponent: FieldComponent = {
    name: 'text',
    Component: TextField,
    validate(value: any, values: any, meta: any, field: any) {
        if (field.required && !value) return 'Required'
    },
    parse: parseText
}
