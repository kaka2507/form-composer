import React from 'react';
import {createForm} from "@form-composer/core";
import {FormBuilder} from "@form-composer/ant-fields";


function App() {
    const fields = [
        {
            name: 'name',
            label: 'Name',
            component: 'text',
            description: 'Your full name',
            placeholder: 'Your full name',
            validate: (value) => {
                if (!value) return "Required"
            }
        },
        {
            name: 'age',
            label: 'Age',
            component: 'number',
            description: 'Your age',
            placeholder: 'Your age',
            validate: (value) => {
                if (!value) return "Required"
            }
        },
        {
            name: 'enabled',
            label: 'Enabled',
            component: 'boolean',
            defaultValue: true,
            description: 'Enable',
        },
        {
            name: 'gender', label: 'Gender', component: 'choice',
            choices: ['Male', 'Female', 'Another'],
            description: 'Your gender',
            defaultValue: 'Female'
        },
        {
            name: 'tags',
            label: 'Tags',
            description: 'Employee tags',
            placeholder: 'Employee tags',
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
            description: 'This is a description',
            validate: (value) => {
                if (!value) return "Required"
            }
        },
        {
            name: 'profile',
            label: 'Profile',
            component: 'object',
            description: 'This is very long long long long long long long long long long long long long long long long long long long long description',
            fields: [
                {name: 'first_name', label: 'First Name', component: 'text'},
                {name: 'last_name', label: 'Last Name', component: 'text'},
            ],
            validate: (value) => {
                if (!value) return "Required"
            }
        },
    ]
    const initValues = {}
    const form = createForm({
        initialValues: initValues,
        onSubmit: async (values) => {
            console.log('onSubmit form with values:', values)
        },
        fields: fields,
    }, (values) => {
        console.log('onChange values:', values)
    })
    return (
        <div style={{margin: 'auto', padding: '20px', boxSizing: 'border-box'}}>
            <FormBuilder form={form}/>
        </div>
    )
}

export default App;
