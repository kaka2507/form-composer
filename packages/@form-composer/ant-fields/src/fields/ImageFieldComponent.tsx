import React, {useState} from 'react'
import {useFormComposer} from "@form-composer/core";
import {parseText} from "./format";
import {BaseField, BaseFieldProps} from "./BaseField";
import {IImagePlugin} from "../plugins";
import {Result, Row, Spin, Upload} from "antd";
import {CloudUploadOutlined, LoadingOutlined} from '@ant-design/icons';

const Dragger = Upload.Dragger;

const loadingIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;

export const ImageField = ({field, input, ...rest}: BaseFieldProps) => {
    const formComposer = useFormComposer()
    const imagePlugin = formComposer.plugins.get('image') as IImagePlugin;
    if (!imagePlugin) {
        console.error('Missing ImagePlugin in FormComposer')
        return null;
    }
    const [src, setSrc] = useState(input.value ? input.value : '')
    const [file, setFile] = useState(undefined)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('')

    const onRemove = () => {
        updateImage('')
    }

    const updateImage = (src: string) => {
        setSrc(src);
        input.onChange(src)
    }

    const customRequest = ({onSuccess, onError, file}) => {
        setError('')
        setLoading(true);
        imagePlugin.persist(file)
            .then(persistedSrc => {
                setLoading(false);
                onSuccess(persistedSrc, file)
            })
            .catch(error => {
                onError(error);
                setLoading(false);
            })
    }

    const onChange = ({file}) => {
        if (file.status === 'done') {
            updateImage(file.response)
        } else if (file.status === 'error') {
            updateImage('')
            setError(file.error)
        }
    }

    return (
        <BaseField field={field} input={input} {...rest}>
            <Dragger
                accept='image/*'
                multiple={false}
                showUploadList={false}
                listType="picture-card"
                onRemove={onRemove}
                customRequest={customRequest}
                onChange={onChange}
            >
                {loading && (
                    <Row justify="center">
                        <Spin indicator={loadingIcon}/>
                    </Row>
                )}
                {!loading && !src && !error && (
                    <>
                        <p className="ant-upload-drag-icon">
                            <CloudUploadOutlined/>
                        </p>
                        <p className="ant-upload-hint">Click or drag file to this area to upload</p>
                    </>
                )}
                {!loading && !src && error && (
                    <Result
                        status="error"
                        title={error}
                        subTitle='Click to try again'/>
                )}
                {!loading && src && (
                    <Row justify="center">
                        <img src={src} alt={field.name} style={{maxHeight: '80px'}}/>
                    </Row>
                )}
            </Dragger>
        </BaseField>
    )
}

export const ImageFieldComponent = {
    name: 'image',
    Component: ImageField,
    parse: parseText
}
