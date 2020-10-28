import React from "react";
import {Button, Collapse, Row, Tooltip} from 'antd';
import {parseText} from "./format";
import {Field, FieldBuilder, FieldComponent, Form, useFormComposer} from "@form-composer/core";
import {BaseField, BaseFieldProps} from "./BaseField";
import {
    CloseCircleFilled,
    DownCircleOutlined,
    InfoCircleOutlined,
    PlusCircleOutlined,
    RetweetOutlined,
} from '@ant-design/icons'
import {blue, red} from "@ant-design/colors";

const {Panel} = Collapse

type DefaultItem = any | (() => any)

interface ArrayFieldProps extends BaseFieldProps {
    field: Field & {
        child: Field
        defaultItem: DefaultItem,
        shrink?: boolean,
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

    const items = input && input.value ? input.value : []
    const moveDown = React.useCallback((index) => {
        const dest = index === items.length - 1 ? 0 : index + 1
        form.mutators.swap(field.name, index, dest)
    }, [form, field, items.length])

    // Mark object field as touched when user click to expand
    const onExpand = React.useCallback(() => {
        const state = form.finalForm.getFieldState(field.name)
        if (!state.touched) {
            form.mutators.setFieldTouched(field.name, true)
        }
    }, [form, field])

    const fields: any[] = React.useMemo(() => {
        return items.map((item, index) => ({
            ...field.child,
            name: `${field.name}.${index}`,
            label: `${field.label} ${index}`,
            noHeader: true,
        }))
    }, [field.child, field.name, items.length])

    const header = (
        <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
            <Tooltip placement="top" title="Click to expand">
                <InfoCircleOutlined/>
            </Tooltip>
        </div>
    )
    // Array field is shrink by default
    if (field.shrink === undefined) {
        field.shrink = true;
    }
    return (
        <BaseField form={form} field={field} input={input} onExpand={onExpand} {...rest}>
            <Collapse
                defaultActiveKey={field.name}
                style={{width: '100%'}}>
                <Panel
                    key={field.name}
                    header={header}
                    style={{padding: '0px'}}
                >
                    {fields.map((field, index) => (
                        <Row key={field.name} align="middle">
                            <div style={{position: 'relative', width: '100%'}}>
                                <div style={{position: 'absolute', top: '-12px', right: '-20px', zIndex: 200}}>
                                    <Button
                                        type="text" size="large"
                                        onClick={() => removeItem(index)}
                                        icon={<CloseCircleFilled style={{color: red[5], fontSize: '20px'}}/>}
                                    />
                                </div>
                                {items.length > 1 && (
                                    <div style={{position: 'absolute', height: '100%', right: '-20px', zIndex: 100}}>
                                        <Row align="middle" style={{height: '100%'}}>
                                            <Button
                                                type="text" size="large"
                                                onClick={() => moveDown(index)}
                                                icon={index != 0 && index === items.length - 1 ? <RetweetOutlined /> : <DownCircleOutlined />}
                                            />
                                        </Row>
                                    </div>
                                )}
                                <FieldBuilder formComposer={formComposer} form={form} field={field}/>
                            </div>
                        </Row>
                    ))}
                    <Row justify="center">
                        <Tooltip placement="top" title="Add new element">
                            <Button
                                type="text"
                                size="large"
                                onClick={() => addItem()}
                                icon={<PlusCircleOutlined style={{color: blue[5], fontSize: '20px'}}/>}
                            />
                        </Tooltip>
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
