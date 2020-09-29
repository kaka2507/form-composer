import {Field, FieldComponent, Form} from "@form-composer/core";
import {FieldRenderProps} from "react-final-form";
import {Form as AntForm, Switch} from "antd";
import {formItemLayout} from "./layout";
import React from "react";
import {CheckOutlined, CloseOutlined} from '@ant-design/icons';


interface CheckBoxFieldProps extends FieldRenderProps<any, HTMLElement> {
    field: Field
    form: Form
}

const CheckBoxField = ({field, input}: CheckBoxFieldProps) => {
    const checked = !!(input.value || input.checked)

    const onChange = (checked) => {
        input.onChange(checked);
    }

    return (
        <>
            <AntForm.Item  {...formItemLayout} name={field.name} label={field.label} help={field.description}
                           validateStatus="validating">
                <Switch
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    checked={checked}
                    onChange={onChange}
                />
            </AntForm.Item>
        </>
    )
}


export const BooleanFieldComponent: FieldComponent = {
    name: 'boolean',
    type: 'checkbox',
    Component: CheckBoxField,
}
