import React from 'react';
import {createForm} from "@form-composer/core";
import {FormBuilder} from "@form-composer/ant-fields";


function App() {
    const fields = [
        {
            name: 'name',
            label: 'Name',
            component: 'text',
            description: 'Sample text field',
            placeholder: 'Your name',
            validate: (value) => {
                if (!value) return "Required"
            }
        },
        {
            name: 'age',
            label: 'Age',
            component: 'number',
            description: 'Sample number field',
            placeholder: 'Your age',
            validate: (value) => {
                if (!value) return "Required"
            }
        },
        {name: 'avatar', label: 'Avatar', component: 'image'},
        {name: 'avatars', label: 'Avatar', component: 'images'},
        {
            name: 'enabled',
            label: 'Enabled',
            component: 'boolean',
            description: 'Sample boolean field',
            defaultValue: true,
        },
        {
            name: 'gender',
            label: 'Gender',
            component: 'choice',
            choices: ['Male', 'Female', 'Another'],
            description: 'Sample choice field',
            defaultValue: 'Female'
        },
        {
            name: 'tags',
            label: 'Tags',
            description: 'Sample tags field',
            placeholder: 'your-tags',
            component: 'tags',
            validate: (value) => {
                if (!value) return "Required"
                if (value.length === 0) return "Required"
            }
        },
        {
            name: 'description',
            label: 'Description',
            component: 'longtext',
            description: 'Sample longtext field',
            validate: (value) => {
                if (!value) return "Required"
            }
        },
        {
            name: 'simple_object_field',
            label: 'Simple object field',
            component: 'object',
            description: 'Sample simple object field',
            fields: [
                {name: 'first_name', label: 'First Name', component: 'text'},
                {name: 'last_name', label: 'Last Name', component: 'text'},
            ],
            validate: (value) => {
                if (!value) return "Required"
            }
        },
        {
            name: 'complex_object_field',
            label: 'Complex object field',
            component: 'object',
            description: 'Sample complex object field',
            fields: [
                {name: 'first_name', label: 'First Name', component: 'text'},
                {
                    name: 'profile', label: 'Profile', component: 'object',
                    fields: [
                        {name: 'first_name', label: 'First Name', component: 'text'},
                        {name: 'last_name', label: 'Last Name', component: 'text'},
                    ]
                },
                {
                    name: 'array',
                    label: 'Array',
                    component: 'array',
                    child: {
                        component: 'text',
                    },
                    defaultItem: 'array element'
                },
            ],
            validate: (value) => {
                if (!value) return "Required"
                if (value === {}) return "Required"
            }
        },
        {
            name: 'simple_array_field',
            label: 'Simple Array Field',
            description: "Sample simple array field",
            component: 'array',
            child: {
                component: 'text',
            },
            defaultItem: 'array element',
            validate: (value) => {
                if (!value) return ["Required at least 1 element"];
                if (value.length === 0) return ["Required at least 1 element"];
                return undefined;
            }
        },
        {
            name: 'complex_array_field_1',
            label: 'Array Contain Object',
            description: "Sample Array contain object",
            component: 'array',
            child: {
                name: 'simple_object_field',
                label: 'Simple object field',
                component: 'object',
                description: 'Sample simple object field',
                fields: [
                    {name: 'first_name', label: 'First Name', component: 'text'},
                    {name: 'last_name', label: 'Last Name', component: 'text'},
                ],
                validate: (value) => {
                    if (!value) return ["Required at least 1 element"];
                    if (value.length === 0) return ["Required at least 1 element"];
                    return undefined;
                }
            },
            defaultItem: {
                first_name: 'Daniel',
                last_name: 'Doan',
            },
            validate: (value) => {
                if (!value) return ["Required at least 1 element"];
                if (value.length === 0) return ["Required at least 1 element"];
                return undefined;
            }
        },
        {
            name: 'complex_array_field_2',
            label: 'Array Contain Array',
            description: "Sample Array contain array",
            component: 'array',
            child: {
                name: 'simple_array_field',
                label: 'Simple Array Field',
                description: "Sample simple array field",
                component: 'array',
                child: {
                    component: 'text',
                },
                defaultItem: 'array element'
            },
            defaultItem: [],
            validate: (value) => {
                if (!value) return ["Required at least 1 element"];
                if (value.length === 0) return ["Required at least 1 element"];
                return undefined;
            }
        }
    ]
    const initValues = {}
    const form = createForm({
        initialValues: initValues,
        onSubmit: async (values) => {
            console.log('onSubmit form with values:', values)
        },
        fields: fields,
    }, (values) => {
        console.log('onFormChange values:', values)
    })
    return (
        <div style={{margin: 'auto', padding: '20px', boxSizing: 'border-box'}}>
            <FormBuilder form={form}/>
        </div>
    )
}

export default App;
