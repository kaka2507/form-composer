import React from 'react'
import {mapInputProps, parseText} from "./format";
import {Field, FieldComponent, Form} from "@form-composer/core";
import {Input} from "antd";
import {BaseField, BaseFieldProps} from "./BaseField";

interface LongTextFieldProps extends BaseFieldProps {
    field: Field & { placeholder: string, row?: number }
    form: Form
}

const LongTextField = ({input, field, ...rest}: LongTextFieldProps) => {
    const inputProps = mapInputProps(input)
    return (
        <BaseField input={input} field={field} {...rest}>
            <Input.TextArea key={field.name} {...inputProps} placeholder={field.placeholder} rows={field.row? field.row : 4}/>
        </BaseField>
    )
}


export const LongTextFieldComponent: FieldComponent = {
    name: 'longtext',
    Component: LongTextField,
    parse: parseText,
}
