import React, {useState} from 'react'
import {useFormComposer} from "@form-composer/core";
import {parseText} from "./format";
import {BaseField, BaseFieldProps} from "./BaseField";
import {IImagePlugin} from "../plugins";
import {Modal, Upload} from "antd";
import {CloudUploadOutlined} from '@ant-design/icons';

const Dragger = Upload.Dragger;

export const ImageField = ({field, input, ...rest}: BaseFieldProps) => {
    const formComposer = useFormComposer()
    const imagePlugin = formComposer.plugins.get('image') as IImagePlugin;
    if (!imagePlugin) {
        console.error('Missing ImagePlugin in FormComposer')
        return null;
    }
    const [currentFile, setCurrentFile] = useState(undefined)
    const [previewVisible, setPreviewVisible] = useState(false);

    const customRequest = ({onSuccess, onError, file, ...rest}) => {
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

    const onChange = ({file}) => {
        if (file.status === 'removed') {
            setCurrentFile(undefined)
            input.onChange('')
        } else {
            setCurrentFile(file)
        }
        if (file.status === 'done') {
            input.onChange(file.response.url)
        }
    }

    const handlePreview = async file => {
        setPreviewVisible(true)
    };

    return (
        <BaseField field={field} input={input} {...rest}>
            <Dragger
                accept='image/*'
                multiple={false}
                listType="picture"
                className="upload-list-inline"
                customRequest={customRequest}
                onChange={onChange}
                onPreview={handlePreview}
                fileList={currentFile? [currentFile]: undefined}
            >
                <p className="ant-upload-drag-icon">
                    <CloudUploadOutlined/>
                </p>
                <p className="ant-upload-hint">Click or drag file to this area to upload</p>
            </Dragger>
            {currentFile && currentFile.response && (
                <Modal
                    visible={previewVisible}
                    footer={null}
                    onCancel={() => setPreviewVisible(false)}
                >
                    <img alt="preview" style={{ width: '100%' }} src={currentFile.response.url} />
                </Modal>
            )}
        </BaseField>
    )
}

export const ImageFieldComponent = {
    name: 'image',
    Component: ImageField,
    parse: parseText
}
