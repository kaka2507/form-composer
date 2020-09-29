import {FieldComponent} from "@form-composer/core";
import {Switch} from "antd";
import React from "react";
import {BaseField, BaseFieldProps} from "./BaseField";
import {CheckOutlined, CloseOutlined} from '@ant-design/icons';

const CheckBoxField = ({field, input, ...rest}: BaseFieldProps) => {
    const checked = !!(input.value || input.checked)

    const onChange = (checked) => {
        input.onChange(checked);
    }

    return (
        <>
            <BaseField field={field} input={input} {...rest}>
                <Switch
                    checkedChildren={<CheckOutlined/>}
                    unCheckedChildren={<CloseOutlined/>}
                    checked={checked}
                    onChange={onChange}
                />
            </BaseField>
        </>
    )
}


export const BooleanFieldComponent: FieldComponent = {
    name: 'boolean',
    type: 'checkbox',
    Component: CheckBoxField,
}
