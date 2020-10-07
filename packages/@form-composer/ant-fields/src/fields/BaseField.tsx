import React from "react";
import {FieldRenderProps} from "react-final-form";
import {Field, Form} from "@form-composer/core";
import {Form as AntForm} from "antd";

export interface BaseFieldProps extends FieldRenderProps<any, HTMLElement> {
    field: Field & {noLabel?: boolean, noHelp?: boolean}
    form: Form
    itemLayout: object
    help?: string | React.ReactNode
}

const getError = (error: string | object) => {
    if (!error) return error
    if (typeof error === 'string') return error;
    return Object.values(error).join('')
}

export const BaseField = ({field, meta, help, itemLayout, children}: BaseFieldProps) => {
    const hasError = meta.touched && meta.error;
    const finalHelp = help? help: (field.description? field.description : undefined)
    let styles = {}
    if (field.noHelp) styles['marginBottom'] = '8px'
    if (field.noLabel) styles['marginTop'] = '8px'
    return (
        <AntForm.Item
            key={field.name}
            label={field.noLabel? undefined : field.label}
            help={field.noHelp? undefined : hasError? getError(meta.error): finalHelp}
            style={styles}
            validateStatus={hasError? "error": "validating"}
            {...itemLayout}>
            {children}
        </AntForm.Item>
    )
}