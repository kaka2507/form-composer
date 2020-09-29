import React from "react";
import {FieldRenderProps} from "react-final-form";
import {Field, Form} from "@form-composer/core";
import {Form as AntForm} from "antd";
import {formItemLayout} from "./layout";

interface BaseFieldProps extends FieldRenderProps<any, HTMLElement> {
    field: Field
    form: Form
    help?: string | React.ReactNode
}

export const BaseField = ({form, field, input, meta, help, children}: BaseFieldProps) => {
    const hasError = meta.touched && meta.error;
    return (
        <>
            {hasError && (
                <AntForm.Item  {...formItemLayout} hasFeedback label={field.label} help={meta.error}
                               validateStatus="error">
                    {children}
                </AntForm.Item>
            )}
            {!hasError && (
                <AntForm.Item  {...formItemLayout} label={field.label} help={help? help : field.description}
                               validateStatus="validating">
                    {children}
                </AntForm.Item>
            )}
        </>
    )
}


