import React, {FC} from 'react'
import {FieldsBuilder, Form} from '@form-composer/core'
import {Form as FinalForm} from 'react-final-form'
import {Form as AntForm} from 'antd';
import "antd/dist/antd.css";

const useFormState = (form: Form | null, subscription: any): any => {
    const [state, setState] = React.useState<any>()
    React.useEffect(() => {
        if (!form) return
        return form.subscribe(setState, subscription)
    }, [form])

    return state
}

export interface FormBuilderProps {
    form: Form
}

const FF: any = FinalForm

export const FormBuilder: FC<FormBuilderProps> = ({form}) => {
    return (
        <FF form={form.finalForm}>
            {() => (
                <AntForm>
                    <FieldsBuilder form={form} fields={form.fields}/>
                </AntForm>
            )}
        </FF>
    )
}