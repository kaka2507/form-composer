import React from "react";
import {Field, FieldComponent} from './field'
import {Form} from "./form";
import {useFormComposer} from "./use-form-composer";
import {Field as FinalField} from "react-final-form";

export interface FieldBuilderProps {
    form: Form,
    fields: Field[]
}

export const FieldsBuilder = ({form, fields}: FieldBuilderProps) => {
    const formComposer = useFormComposer();
    return (
        <>
            {fields.map((field: Field) => {
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
                return (
                    <FinalField
                        name={field.name}
                        key={field.name}
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
                        supscription={{
                            value: true,
                            error: true,
                            touched: true
                        }}
                    >
                        {fieldProps => {
                            if (fieldType) {
                                return (
                                    <fieldType.Component
                                        {...fieldProps}
                                        form={form}
                                        field={field}
                                    />
                                )
                            }

                            return <p>Unrecognized field type</p>
                        }}
                    </FinalField>
                )
            })}
        </>
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
