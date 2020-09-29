import {parseText} from "./format";
import {Field, FieldComponent, Form} from "@form-composer/core";
import {FieldRenderProps} from "react-final-form";
import {Select} from "antd";
import React from "react";
import {BaseField} from "./BaseField";

type Choice = {
    value: string
    label: string
}

interface ChoiceFieldProps extends FieldRenderProps<any, HTMLElement> {
    field: Field & { choices: (Choice | string)[] }
    form: Form
}

const { Option } = Select;

const ChoiceField = ({form, field, input, meta}: ChoiceFieldProps) => {
    return (
        <BaseField field={field} form={form} input={input} meta={meta}>
            <Select style={{width: '100%'}} {...input}>
                {field.choices ? (
                    field.choices.map(toProps).map(toComponent)
                ) : (
                    <Option value={input.value}>{input.value}</Option>
                )}
            </Select>
        </BaseField>
    )
}

function toProps(option: Choice | string): Choice {
    if (typeof option === 'object') return option
    return {value: option, label: option}
}

function toComponent(option: Choice) {
    return (
        <Option key={option.value} value={option.value}>
            {option.label}
        </Option>
    )
}


export const ChoiceFieldComponent: FieldComponent = {
    name: 'choice',
    type: 'select',
    Component: ChoiceField,
    parse: parseText
}
