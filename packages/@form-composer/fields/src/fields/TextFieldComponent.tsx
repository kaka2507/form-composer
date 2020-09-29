import React from "react";
import {Input} from 'antd';
import {parseText} from "./format";
import {Field, FieldComponent, Form} from "@form-composer/core";
import {BaseField, BaseFieldProps} from "./BaseField";


interface TextFieldProps extends BaseFieldProps {
    field: Field & { placeholder: string }
    form: Form
}

const TextField = ({field, input, ...rest}: TextFieldProps) => {
    return (
        <BaseField field={field} input={input} {...rest}>
            <Input size="large" {...input} placeholder={field.placeholder}/>
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
