import React, {useState} from 'react'
import {useFormComposer} from "@form-composer/core";
import {parseText} from "./format";
import {BaseField, BaseFieldProps} from "./BaseField";
import {IImagePlugin} from "../plugins";
import {Modal, Upload} from "antd";
import {CloudUploadOutlined} from '@ant-design/icons';

const Dragger = Upload.Dragger;

export const ImagesField = ({form, field, input, ...rest}: BaseFieldProps) => {
    const formComposer = useFormComposer()
    const imagePlugin = formComposer.plugins.get('image') as IImagePlugin;
    if (!imagePlugin) {
        console.error('Missing ImagePlugin in FormComposer')
        return null;
    }
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewSrc, setPreviewSrc] = useState(undefined);

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
        const idx = form.finalForm.getFieldState(field.name)?.value?.indexOf(file.response.url)
        if (idx !== -1) form.mutators.remove(field.name, idx)
    }, [form, field])

    const customRequest = ({onSuccess, onError, file}) => {
        if (file.response) {
            onSuccess(file)
            return
        }
        imagePlugin.persist(file)
            .then(response => {
                onSuccess(response, file)
            })
            .catch(error => {
                onError(error);
            })
    }

    const onChange = ({file, fileList}) => {
        if (file.status === 'done') {
            addImage(file.response.url)
        }
    }

    const handlePreview = async file => {
        if (file.response) {
            setPreviewVisible(true)
            setPreviewSrc(file.response.url)
        }
    };

    return (
        <BaseField form={form} field={field} input={input} {...rest}>
            <Dragger
                accept='image/*'
                multiple={true}
                listType="picture-card"
                onRemove={onRemove}
                customRequest={customRequest}
                onChange={onChange}
                onPreview={handlePreview}
            >
                <p className="ant-upload-drag-icon">
                    <CloudUploadOutlined/>
                </p>
                <p className="ant-upload-hint">Click or drag file to this area to upload</p>
            </Dragger>
            <Modal
                visible={previewVisible}
                footer={null}
                onCancel={() => setPreviewVisible(false)}
            >
                <img alt="preview" style={{ width: '100%' }} src={previewSrc} />
            </Modal>
        </BaseField>
    )
}

export const ImagesFieldComponent = {
    name: 'images',
    Component: ImagesField,
    parse: parseText
}
