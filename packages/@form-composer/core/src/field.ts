import React from "react";
import {Map} from "./common";

export type AnyField = Field & { [key: string]: any }

export interface Field<F extends Field = AnyField> {
    name: string
    label?: string
    description?: string
    component: string
    parse?: (value: any, name: string, field: F) => any
    format?: (value: any, name: string, field: F) => any
    defaultValue?: any
    level?: number

    validate?(
        value: any,
        allValues: any,
        meta: any,
        field: Field
    ): string | undefined
}

export interface FieldComponent {
    name: string
    Component: React.FC<any>
    type?: string
    parse?: (value: any, name: string, field: Field) => any
    format?: (value: any, name: string, field: Field) => any
    defaultValue?: any
    composite?: boolean

    validate?(
        value: any,
        allValues: any,
        meta: any,
        field: Field
    ): string | undefined
}

export class FieldComponentManager {
    private fieldComponents: Map<FieldComponent> = {}

    get(name: string) {
        return this.fieldComponents[name]
    }

    add(field: FieldComponent) {
        this.fieldComponents[field.name] = field
    }
}
