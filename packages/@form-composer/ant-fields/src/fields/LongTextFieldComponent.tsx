import React from 'react'
import {parseText} from "./format";
import {FieldComponent} from "@form-composer/core";
import {Input} from "antd";
import {BaseField, BaseFieldProps} from "./BaseField";


const LongTextField = ({input, ...rest}: BaseFieldProps) => (
    <BaseField input={input} {...rest}>
        <Input.TextArea {...input} rows={4}/>
    </BaseField>
)


export const LongTextFieldComponent: FieldComponent = {
    name: 'longtext',
    Component: LongTextField,
    parse: parseText,
}
