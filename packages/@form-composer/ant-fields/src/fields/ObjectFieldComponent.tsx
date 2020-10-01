import React from "react";
import {Collapse, Tooltip} from 'antd';
import {parseText} from "./format";
import {Field, FieldComponent, FieldsBuilder, Form} from "@form-composer/core";
import {BaseField, BaseFieldProps} from "./BaseField";
import {InfoCircleOutlined} from '@ant-design/icons'

const Panel = Collapse.Panel

interface ObjectFieldProps extends BaseFieldProps {
    field: Field & {
        fields: Field[],
        nested?: boolean,
        noHelp?: boolean
    }
    form: Form
}

const ObjectField = ({form, field, ...rest}: ObjectFieldProps) => {
    const fields: any[] = React.useMemo(() => {
        return field.fields.map((subField: any) => ({
            ...subField,
            name: `${field.name}.${subField.name}`,
            nested: true,
        }))
    }, [field.fields, field.name])

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

    let header;
    if (!field.nested || field.noHelp) {
        header = (
            <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
                <Tooltip placement="top" title="Click to expand">
                    <InfoCircleOutlined />
                </Tooltip>
            </div>
        )
    } else {
        header = field.label
    }

    // Force: object field will be no help (description or error) if it's nested
    if (field.nested) {
        field.noHelp = true
    }

    return (
        <BaseField form={form} field={field} {...rest}>
            <Collapse accordion onChange={onChange}>
                <Panel key={field.name} header={header}>
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
