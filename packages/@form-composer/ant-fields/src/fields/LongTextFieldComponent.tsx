import React from 'react'
import {mapInputProps, parseText} from "./format";
import {FieldComponent} from "@form-composer/core";
import {Input} from "antd";
import {BaseField, BaseFieldProps} from "./BaseField";


const LongTextField = ({input, field, ...rest}: BaseFieldProps) => {
    const inputProps = mapInputProps(input)
    return (
        <BaseField input={input} field={field} {...rest}>
            <Input.TextArea key={field.name} {...inputProps} rows={4}/>
        </BaseField>
    )
}


export const LongTextFieldComponent: FieldComponent = {
    name: 'longtext',
    Component: LongTextField,
    parse: parseText,
}
