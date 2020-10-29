import React from "react";
import {Button, Collapse, Form as AntForm, Modal, Row, Select, Space, Tooltip} from 'antd';
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
const {Option} = Select
const {Item} = AntForm

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
    const [isSwapping, setIsSwapping] = React.useState(false)
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

    const swap = React.useCallback((from, to) => {
        form.mutators.swap(field.name, from, to)
    }, [form, field])

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
    const [swapForm] = AntForm.useForm();
    const onStartToSwap = (event) => {
        event.stopPropagation()
        event.preventDefault()
        setIsSwapping(true)
    }

    const onSwap = () => {
        swapForm
            .validateFields()
            .then(values => {
                swapForm.resetFields();
                if (values.from !== values.to) {
                    swap(values.from - 1, values.to - 1)
                }
                setIsSwapping(false);
            })
            .catch(() => {
                // ignore
            });
    }

    const header = (
        <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
            <Space>
                {items.length > 2 && (
                    <Tooltip placement="top" title="Swap items">
                        <RetweetOutlined onClick={onStartToSwap}/>
                    </Tooltip>
                )}
                <Tooltip placement="top" title="Click to expand">
                    <InfoCircleOutlined/>
                </Tooltip>
            </Space>
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
                                            <Tooltip title={index != 0 && index === items.length - 1? "Move to first position" : "Move down"}>
                                                <Button
                                                    type="text" size="large"
                                                    onClick={() => moveDown(index)}
                                                    icon={index != 0 && index === items.length - 1 ? <RetweetOutlined /> : <DownCircleOutlined />}
                                                />
                                            </Tooltip>
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
            <Modal
                title="Swap Items"
                visible={isSwapping}
                onCancel={() => setIsSwapping(false)}
                okText="Swap"
                onOk={onSwap}
            >
                <AntForm
                    form={swapForm}
                    layout="vertical">
                    <Item
                        label="From"
                        name="from"
                        rules={[{ required: true, message: 'Please select the first position for swapping.' }]}
                    >
                        <Select placeholder="From">
                            {
                                Array(items.length).fill(1).map((x, y) => x + y).map(i => (
                                    <Option key={i} value={i}>{i}</Option>
                                ))
                            }
                        </Select>
                    </Item>
                    <Item
                        label="To"
                        name="to"
                        rules={[{ required: true, message: 'Please select the second position for swapping.' }]}
                    >
                        <Select placeholder="To">
                            {
                                Array(items.length).fill(1).map((x, y) => x + y).map(i => (
                                    <Option key={i} value={i}>{i}</Option>
                                ))
                            }
                        </Select>
                    </Item>
                </AntForm>
            </Modal>
        </BaseField>
    )
}

export const ArrayFieldComponent: FieldComponent = {
    name: 'array',
    Component: ArrayField,
    parse: parseText
}
