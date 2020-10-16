import React from "react";
import {FieldRenderProps} from "react-final-form";
import {Field, Form} from "@form-composer/core";
import {Collapse, Row, Tooltip, Typography} from 'antd';
import {InfoCircleOutlined} from '@ant-design/icons'

const {Panel} = Collapse
const {Text} = Typography

export interface BaseFieldProps extends FieldRenderProps<any, HTMLElement> {
    field: Field & {
        noHeader?: boolean
        shrink?: boolean
    }
    form: Form
}

export const getError = (error: string | object) => {
    if (!error) return error
    if (typeof error === 'string') return error;
    return Object.values(error).join('')
}

export const BaseField = ({field, meta, children}: BaseFieldProps) => {
    const hasError = meta.touched && meta.error;
    const activeKey = field.shrink ? undefined : field.name
    if (field.noHeader) {
        return (
            <Row style={{margin: '10px 0px', width: '100%'}}>
                {children}
            </Row>
        )
    }
    return (
        <Collapse
            ghost
            expandIconPosition="right"
            defaultActiveKey={activeKey}
        >
            <Panel
                key={field.name}
                header={(
                    <Row align="middle">
                        {
                            field.description && (
                                <Tooltip title={field.description}>
                                    <InfoCircleOutlined style={{marginRight: '10px'}}/>
                                </Tooltip>
                            )
                        }
                        {
                            !hasError && (
                                <Text strong>{field.label}</Text>
                            )
                        }
                        {
                            hasError && (
                                <Text strong type="danger">{`${field.label} (${getError(meta.error)})`}</Text>
                            )
                        }
                    </Row>
                )}
            >
                {children}
            </Panel>
        </Collapse>
    )
}