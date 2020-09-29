import React from "react";
import {InputNumber} from 'antd';
import {parseNumber} from './format'
import {FieldComponent} from "@form-composer/core";
import {BaseField, BaseFieldProps} from "./BaseField";

const NumberField = ({input, ...rest}: BaseFieldProps) => (
    <BaseField input={input} {...rest}>
        <InputNumber type="number" style={{width: '100%'}} {...input} />
    </BaseField>
)


export const NumberFieldComponent: FieldComponent = {
    name: 'number',
    Component: NumberField,
    parse: parseNumber
}
