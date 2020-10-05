import React from "react";
import {Collapse, Tooltip} from 'antd';
import {parseText} from "./format";
import {Field, FieldComponent, FieldsBuilder, Form} from "@form-composer/core";
import {BaseField, BaseFieldProps} from "./BaseField";
import {InfoCircleOutlined} from '@ant-design/icons'

const Panel = Collapse.Panel

export interface ObjectFieldProps extends BaseFieldProps {
    field: Field & {
        fields: Field[],
        noLabel?: boolean
        childOfObject?: boolean
    }
    form: Form
}

const ObjectField = ({form, field, ...rest}: ObjectFieldProps) => {
    const fields: any[] = React.useMemo(() => {
        return field.fields.map((subField: any) => ({
            ...subField,
            name: `${field.name}.${subField.name}`,
            noHelp: true,
            childOfObject: true
        }))
    }, [field.fields, field.name])

    return (
        <ObjectFieldRenderer form={form} field={field} fields={fields} {...rest} />
    )
}

export interface ObjectFieldRendererProps extends ObjectFieldProps {
    fields: Field[]
}

export const ObjectFieldRenderer = ({form, field, fields, ...rest}: ObjectFieldRendererProps) => {
    // Mark object field as touched when user click to expand
    const onChange = React.useCallback(() => {
        const state = form.finalForm.getFieldState(field.name)
        if (!state.touched) {
            form.mutators.setFieldTouched(field.name, true)
        }
    }, [form, field])

    const childLayout = {
        labelCol: {
            span: 24
        },
        wrapperCol: {
            span: 24
        },
    };

    const header = (
        <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
            <Tooltip placement="top" title="Click to expand">
                <InfoCircleOutlined />
            </Tooltip>
        </div>
    )
    if (field.childOfObject) {
        field.noLabel = true;
    }
    return (
        <BaseField form={form} field={field} {...rest}>
            <Collapse onChange={onChange}>
                <Panel key={field.name} header={field.childOfObject? field.label : header}>
                    <FieldsBuilder form={form} fields={fields} itemLayout={childLayout} />
                </Panel>
            </Collapse>
        </BaseField>
    )
}

export const ObjectFieldComponent: FieldComponent = {
    name: 'object',
    Component: ObjectField,
    parse: parseText
}
