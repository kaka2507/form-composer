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

    validate?(
        value: any,
        allValues: any,
        meta: any,
        field: Field
    ): string | undefined
}

export type Choice = {
    value: string
    label: string
}

export interface ChoiceField extends Field {
    component: 'choice',
    choices: Choice[]
}

export interface ObjectField extends Field {
    component: 'object'
    fields: Field[]
}

export type DefaultItem = any | (() => any)

export interface ArrayField extends Field {
    component: 'array',
    child: ObjectField | Field,
    defaultItem: DefaultItem,
    /**
     * Explicit declare the child is composite or primary field.
     * If child is composite, it will be rendered by Collapse
     */
    isComposite?: boolean,
    emptyPlaceHolder?: string,
    /**
     * An optional function which generates `props` for
     * this items's `li`.
     */
    itemProps?: (
        item: object,
        index: number,
    ) => {
        /**
         * The `key` property used to optimize the rendering of lists.
         *
         * If rendering is causing problems, use `defaultItem` to
         * generate a unique key for the item.
         *
         * Reference:
         * * https://reactjs.org/docs/lists-and-keys.html
         */
        key?: string
    },
}

export interface FieldComponent {
    name: string
    Component: React.FC<any>
    type?: string
    parse?: (value: any, name: string, field: Field) => any
    format?: (value: any, name: string, field: Field) => any
    defaultValue?: any

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
