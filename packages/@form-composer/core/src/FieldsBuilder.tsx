import React from "react";
import {Field} from './field'
import {Form} from "./form";
import {FieldBuilder} from "./FieldBuilder";
import {useFormComposer} from "./use-form-composer";

export interface FieldsBuilderProps {
    form: Form,
    fields: Field[]
    [key: string]: any
}

export const FieldsBuilder = ({form, fields, ...fieldsBuilderProps}: FieldsBuilderProps) => {
    const formComposer = useFormComposer();
    return (
        <>
            {fields.map((field: Field) => (
                <FieldBuilder key={field.name} formComposer={formComposer} form={form} field={field} {...fieldsBuilderProps} />
            ))}
        </>
    )
}
