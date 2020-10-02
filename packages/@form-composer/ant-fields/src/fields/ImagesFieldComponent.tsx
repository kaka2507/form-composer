import React from 'react'
import {useFormComposer} from "@form-composer/core";
import {parseText} from "./format";
import {BaseField, BaseFieldProps} from "./BaseField";
import {IImagePlugin} from "../plugins";
import {Upload} from "antd";
import {CloudUploadOutlined} from '@ant-design/icons';

const Dragger = Upload.Dragger;

export const ImagesField = ({form, field, input, ...rest}: BaseFieldProps) => {
    const formComposer = useFormComposer()
    const imagePlugin = formComposer.plugins.get('image') as IImagePlugin;
    if (!imagePlugin) {
        console.error('Missing ImagePlugin in FormComposer')
        return null;
    }

    const addImage = React.useCallback(
        (src: string) => {
            if (form.finalForm.getFieldState(field.name)?.value?.includes(src)) {
                return
            }
            if (!src.length) {
                return
            }
            form.mutators.insert(field.name, 0, src)
        },
        [form, field.name]
    )
    const onRemove = React.useCallback((file) => {
        const idx = form.finalForm.getFieldState(field.name)?.value?.indexOf(file.response)
        if (idx !== -1) form.mutators.remove(field.name, idx)
    }, [form, field])

    const customRequest = ({onSuccess, onError, file}) => {
        imagePlugin.persist(file)
            .then(persistedSrc => {
                onSuccess(persistedSrc, file)
            })
            .catch(error => {
                onError(error);
            })
    }

    const onChange = ({file}) => {
        if (file.status === 'done') {
            addImage(file.response)
        }
    }

    return (
        <BaseField form={form} field={field} input={input} {...rest}>
            <Dragger
                accept='image/*'
                multiple={true}
                listType="picture-card"
                onRemove={onRemove}
                customRequest={customRequest}
                onChange={onChange}
                showUploadList={{showPreviewIcon: false}}
            >
                <p className="ant-upload-drag-icon">
                    <CloudUploadOutlined/>
                </p>
                <p className="ant-upload-hint">Click or drag file to this area to upload</p>
            </Dragger>
        </BaseField>
    )
}

export const ImagesFieldComponent = {
    name: 'images',
    Component: ImagesField,
    parse: parseText
}
