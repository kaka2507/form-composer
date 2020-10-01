import React from "react";
import {Button, Col, Collapse, Row, Tooltip} from 'antd';
import {parseText} from "./format";
import {Field, FieldBuilder, FieldComponent, Form, useFormComposer} from "@form-composer/core";
import {BaseField, BaseFieldProps} from "./BaseField";
import {InfoCircleOutlined, MinusCircleOutlined, PlusCircleOutlined} from '@ant-design/icons'

const Panel = Collapse.Panel

type DefaultItem = any | (() => any)

interface ArrayFieldProps extends BaseFieldProps {
    field: Field & {
        child: Field
        defaultItem: DefaultItem,
        noLabel?: boolean,
        childOfObject?: boolean
    }
    form: Form
}

const ArrayField = ({form, field, input, ...rest}: ArrayFieldProps) => {
    const formComposer = useFormComposer();
    const addItem = React.useCallback(() => {
        let obj: {}
        if (typeof field.defaultItem === 'function') {
            obj = field.defaultItem()
        } else {
            obj = field.defaultItem || undefined
        }
        form.mutators.push(field.name, obj)
    }, [form, field])

    const removeItem = React.useCallback((index) => {
        form.mutators.remove(field.name, index)
    }, [form, field])

    // Mark object field as touched when user click to expand
    const onChange = React.useCallback(() => {
        const state = form.finalForm.getFieldState(field.name)
        if (!state.touched) {
            form.mutators.setFieldTouched(field.name, true)
        }
    }, [form, field])

    const items = input.value || []
    const fields: any[] = React.useMemo(() => {
        return items.map((item, index) => ({
            ...field.child,
            name: `${field.name}.${index}`,
            label: `${field.label} ${index}`,
            noLabel: true,
            noHelp: true
        }))
    }, [field.child, field.name, items.length])

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

    const childLayout = {
        labelCol: {
            span: 24
        },
        wrapperCol: {
            span: 24
        },
    };
    return (
        <BaseField form={form} field={field} input={input} {...rest}>
            <Collapse onChange={onChange}>
                <Panel key={field.name} header={field.childOfObject? field.label : header}>
                    {fields.map((field, index) => (
                        <Row key={field.name} align="top">
                            <Col flex="30px">
                                <Button icon={<MinusCircleOutlined/>} size="large" type="text" onClick={() => removeItem(index)} />
                            </Col>
                            <Col flex="auto">
                                <FieldBuilder formComposer={formComposer} form={form} field={field} itemLayout={childLayout}/>
                            </Col>
                        </Row>
                    ))}
                    <Row justify="center">
                        <Button icon={<PlusCircleOutlined/>} size="large" type="text" onClick={() => addItem()} />
                    </Row>
                </Panel>
            </Collapse>
        </BaseField>
    )
}

export const ArrayFieldComponent: FieldComponent = {
    name: 'array',
    Component: ArrayField,
    parse: parseText
}
