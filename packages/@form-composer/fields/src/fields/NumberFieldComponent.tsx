import React from "react";
import {InputNumber} from 'antd';
import {parseNumber} from './format'
import {Field, FieldComponent, Form} from "@form-composer/core";
import {FieldRenderProps} from "react-final-form";
import {BaseField} from "./BaseField";

interface NumberFieldProps extends FieldRenderProps<any, HTMLElement> {
    field: Field
    form: Form
}

const NumberField = ({form, field, input, meta}: NumberFieldProps) => (
    <BaseField field={field} form={form} input={input} meta={meta}>
        <InputNumber type="number" style={{width: '100%'}} {...input} />
    </BaseField>
)


export const NumberFieldComponent: FieldComponent = {
    name: 'number',
    Component: NumberField,
    parse: parseNumber
}
