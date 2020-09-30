import React from "react";
import {Collapse} from 'antd';
import {parseText} from "./format";
import {Field, FieldComponent, FieldsBuilder, Form} from "@form-composer/core";
import {BaseField, BaseFieldProps} from "./BaseField";

const Panel = Collapse.Panel

interface ObjectFieldProps extends BaseFieldProps {
    field: Field & { fields: Field[] }
    form: Form
}

const ObjectField = ({form, field, ...rest}: ObjectFieldProps) => {
    const fields: any[] = React.useMemo(() => {
        return field.fields.map((subField: any) => ({
            ...subField,
            name: `${field.name}.${subField.name}`,
        }))
    }, [field.fields, field.name])
    return (
        <BaseField field={field} form={form} {...rest}>
            <Collapse accordion>
                <Panel key={`panel-${field.name}`} header={field.label}>
                    <FieldsBuilder form={form} fields={fields} itemLayout={rest.itemLayout} />
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
