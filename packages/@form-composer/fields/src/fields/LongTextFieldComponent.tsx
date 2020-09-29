import React from 'react'
import {parseText} from "./format";
import {Field, FieldComponent, Form} from "@form-composer/core";
import {FieldRenderProps} from "react-final-form";
import {Input} from "antd";
import {BaseField} from "./BaseField";

interface LongTextFieldProps extends FieldRenderProps<any, HTMLElement> {
    field: Field
    form: Form
}

const LongTextField = ({form, field, input, meta}: LongTextFieldProps) => (
    <BaseField field={field} form={form} input={input} meta={meta}>
        <Input.TextArea {...input} rows={4}/>
    </BaseField>
)


export const LongTextFieldComponent: FieldComponent = {
    name: 'longtext',
    Component: LongTextField,
    parse: parseText,
}
