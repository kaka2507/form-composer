import React from 'react'
import {parseText} from "./format";
import {Field, FieldComponent, Form} from "@form-composer/core";
import {Input, Tag} from 'antd';
import {BaseField, BaseFieldProps} from "./BaseField";

interface TagsFieldProps extends BaseFieldProps {
    field: Field & { placeholder: string }
    form: Form
}

const TagsField = ({form, field, input, ...rest}: TagsFieldProps) => {
    const [value, setValue] = React.useState<string>('')
    const addTag = React.useCallback(
        (tag: string) => {
            if (form.finalForm.getFieldState(field.name)?.value?.includes(tag)) {
                return
            }
            if (!tag.length) {
                return
            }
            form.mutators.insert(field.name, 0, tag)
            setValue('')
        },
        [form, field.name]
    )
    const removeTag = React.useCallback((index) => {
        form.mutators.remove(field.name, index)
    }, [form, field])
    const items = input.value || []

    const help = (
        <span style={{display: 'flex', flexWrap: 'wrap', margin: '4px 0'}}>
            {items && items.map((tag: string, index: number) => (
                <Tag key={tag} closable onClose={() => removeTag(index)}>tag</Tag>
            ))}
            {!items && items.map((tag: string, index: number) => (
                <span>{field.description}</span>
            ))}
        </span>
    )
    return (
        <BaseField field={field} form={form} input={input} help={help} {...rest}>
            <Input
                name={field.name}
                value={value}
                onChange={event => setValue(event.target.value)}
                placeholder={field.placeholder}
                onKeyPress={event => {
                    if (event.key === ' ' || event.key === 'Enter') {
                        event.preventDefault()
                        addTag(value)
                    }
                }}
            />
        </BaseField>
    )
}

export const TagsFieldComponent: FieldComponent = {
    name: 'tags',
    Component: TagsField,
    parse: parseText
}
