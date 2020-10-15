import React from "react";
import {Field, FieldComponent} from './field'
import {Form} from "./form";
import {FormComposer} from "./FormComposer";
import {Field as FinalField} from "react-final-form";
import {RenderCount} from "./RenderCount";

export interface FieldBuilderProps {
    formComposer: FormComposer,
    form: Form,
    field: Field
    [key: string]: any
}

export const FieldBuilder = ({formComposer, form, field, ...fieldBuilderProps}: FieldBuilderProps) => {
    if (field.component === null) return null
    const fieldType = formComposer.fields.get(field.component as string)

    let type: string | undefined
    if (fieldType && fieldType.type) {
        type = fieldType.type
    }
    const parse = getProp('parse', field, fieldType)
    const validate = getProp('validate', field, fieldType)

    let format = field.format
    if (!format && fieldType && fieldType.format) {
        format = fieldType.format
    }

    let defaultValue = field.defaultValue
    if (!parse && fieldType && fieldType.defaultValue) {
        defaultValue = fieldType.defaultValue
    }

    const subscription = !field.level?
        fieldType.composite?
            {error: true, touched: true} :
            {value: true, error: true, touched: true} :
        {active: true}
    console.log('field:', field)
    console.log('subscription', subscription)

    return (
        <FinalField
            key={field.name}
            name={field.name}
            type={type}
            parse={
                parse
                    ? (value: any, name: string) => parse!(value, name, field)
                    : undefined
            }
            format={
                format
                    ? (value: any, name: string) => format!(value, name, field)
                    : undefined
            }
            defaultValue={defaultValue}
            validate={(value, values, meta) => {
                if (validate) {
                    return validate(value, values, meta, field)
                }
            }}
            supscription={subscription}
        >
            {fieldRenderProps => {
                if (fieldType) {
                    return (
                        <div style={{position: 'relative'}}>
                            <RenderCount />
                            <fieldType.Component
                                form={form}
                                field={field}
                                {...fieldBuilderProps}
                                {...fieldRenderProps}
                            />
                        </div>
                    )
                }

                return <p>Unrecognized field type</p>
            }}
        </FinalField>
    )
}

function getProp(
    name: keyof FieldComponent & keyof Field,
    field: Field,
    fieldType?: FieldComponent
): any {
    let prop = field[name]
    if (!prop && fieldType && fieldType[name]) {
        prop = fieldType[name]
    }
    return prop
}
