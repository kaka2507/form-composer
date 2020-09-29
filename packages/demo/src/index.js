import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {FormComposer, FormComposerProvider} from "@form-composer/core";
import {
    BooleanFieldComponent,
    ChoiceFieldComponent,
    LongTextFieldComponent,
    NumberFieldComponent,
    TagsFieldComponent,
    TextFieldComponent
} from "@form-composer/ant-fields";

const formComposer = new FormComposer({
    fieldTypes: [
        TextFieldComponent,
        LongTextFieldComponent,
        NumberFieldComponent,
        BooleanFieldComponent,
        TagsFieldComponent,
        ChoiceFieldComponent,
    ]
})


ReactDOM.render(
    <FormComposerProvider formComposer={formComposer}>
        <App/>
    </FormComposerProvider>,
    document.getElementById('root')
);
