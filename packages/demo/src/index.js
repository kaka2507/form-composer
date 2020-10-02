import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {FormComposer, FormComposerProvider} from "@form-composer/core";
import {
    ArrayFieldComponent,
    BooleanFieldComponent,
    ChoiceFieldComponent,
    ImageFieldComponent,
    ImagePlugin,
    ImagesFieldComponent,
    LongTextFieldComponent,
    NumberFieldComponent,
    ObjectFieldComponent,
    TagsFieldComponent,
    TextFieldComponent,
} from "@form-composer/ant-fields";

const imagePlugin = new ImagePlugin();

const formComposer = new FormComposer({
    fieldTypes: [
        TextFieldComponent,
        LongTextFieldComponent,
        NumberFieldComponent,
        BooleanFieldComponent,
        TagsFieldComponent,
        ChoiceFieldComponent,
        ImageFieldComponent,
        ImagesFieldComponent,

        ObjectFieldComponent,
        ArrayFieldComponent,
    ],
    plugins: [
        imagePlugin,
    ]
})


ReactDOM.render(
    <FormComposerProvider formComposer={formComposer}>
        <App/>
    </FormComposerProvider>,
    document.getElementById('root')
);
