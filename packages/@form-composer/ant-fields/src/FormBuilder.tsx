import React, {FC} from 'react'
import {FieldsBuilder, Form, RenderCount} from '@form-composer/core'
import {Form as FinalForm} from 'react-final-form'
import {Form as AntForm, Grid} from 'antd';
import "antd/dist/antd.css";

export interface FormBuilderProps {
    form: Form,
}

const FF: any = FinalForm
const {useBreakpoint} = Grid

export const FormBuilder: FC<FormBuilderProps> = ({form}) => {
    const screens = useBreakpoint();
    const itemLayout = {
        labelCol: {
            xs: {span: 24},
            sm: {span: 5},
        },
        wrapperCol: {
            xs: {span: 24},
            sm: {span: 17},
        },
    };
    return (
        <FF form={form.finalForm} subscription={{ submitting: true, pristine: true }} >
            {() => (
                <AntForm size="large" layout={screens.xs ? "vertical" : "horizontal"}>
                    <RenderCount />
                    <FieldsBuilder form={form} fields={form.fields} itemLayout={itemLayout}/>
                </AntForm>
            )}
        </FF>
    )
}