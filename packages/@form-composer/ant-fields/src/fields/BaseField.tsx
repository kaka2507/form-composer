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
    return (
        <AntForm.Item
            key={field.name}
            label={field.noLabel? undefined : field.label}
            help={field.noHelp? undefined : hasError? getError(meta.error): finalHelp}
            validateStatus={hasError? "error": "validating"}
            {...itemLayout}>
            {children}
        </AntForm.Item>
    )
}