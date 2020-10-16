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
    }
    form: Form
}

const ObjectField = ({form, field, ...rest}: ObjectFieldProps) => {
    const fields: any[] = React.useMemo(() => {
        return field.fields.map((subField: any) => ({
            ...subField,
            name: `${field.name}.${subField.name}`,
            noHelp: true,
            childOfObject: true,
            level: field.level? field.level + 1 : 1
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

    const header = (
        <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
            <Tooltip placement="top" title="Click to expand">
                <InfoCircleOutlined />
            </Tooltip>
        </div>
    )

    return (
        <BaseField form={form} field={field} {...rest}>
            <Collapse
                onChange={onChange}
                style={{width: '100%'}}
            >
                <Panel key={field.name} header={header}>
                    <FieldsBuilder form={form} fields={fields} />
                </Panel>
            </Collapse>
        </BaseField>
    )
}

export const ObjectFieldComponent: FieldComponent = {
    name: 'object',
    Component: ObjectField,
    parse: parseText,
    composite: true,
}
