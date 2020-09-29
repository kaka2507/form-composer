import React from "react";
import {Input} from 'antd';
import {mapInputProps, parseText} from "./format";
import {Field, FieldComponent, Form} from "@form-composer/core";
import {BaseField, BaseFieldProps} from "./BaseField";


interface TextFieldProps extends BaseFieldProps {
    field: Field & { placeholder: string }
    form: Form
}

const TextField = ({field, input, ...rest}: TextFieldProps) => {
    const inputProps = mapInputProps(input)
    return (
        <BaseField field={field} input={input} {...rest}>
            <Input key={field.name} size="large" {...inputProps} onChange={(v) => input.onChange(v.target.value)} placeholder={field.placeholder}/>
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
