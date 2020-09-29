import React from 'react';
import {createForm} from "@form-composer/core";
import {FormBuilder} from "@form-composer/fields";


function App() {
    const fields = [
        {
            name: 'name',
            label: 'Name',
            component: 'text',
            description: 'This is a name',
            placeholder: 'Your name',
            validate: (value) => {
                if (!value) return "Required"
            }
        },
        // {name: 'avatar', label: 'Avatar', component: 'image'},
        // {
        //   name: 'background', label: 'Background', component: 'color', widget: 'block',
        //   colors: [
        //     'red',
        //     'black',
        //     'green'
        //   ]
        // },
        {
            name: 'age', label: 'Age',
            component: 'number',
            description: 'This is a name',
            validate: (value) => {
                if (!value) return "Required"
            }
        },
        {
            name: 'enabled', label: 'Enabled', component: 'boolean', defaultValue: false,
            description: 'This is a boolean',
            validate: (value) => {
                if (!value) return "Required"
            }
        },
        {
            name: 'gender', label: 'Gender', component: 'choice',
            choices: ['Male', 'Female', 'Another'],
            defaultValue: 'Male'
        },
        {name: 'tags', label: 'Tags', component: 'tags'},
        {
            name: 'description', label: 'Description', component: 'longtext',
            description: 'This is a description',
            validate: (value) => {
                if (!value) return "Required"
            }
        },
        // {
        //   name: 'profile',
        //   label: 'Profile',
        //   component: 'object',
        //   description: 'This is very long long long long long long long long long long long long long long long long long long long long description',
        //   fields: [
        //     {name: 'first_name', label: 'First Name', component: 'text'},
        //     {name: 'last_name', label: 'Last Name', component: 'text'},
        //   ],
        // },
        // {
        //   name: 'experiences',
        //   label: 'Experiences',
        //   description: 'This is description',
        //   component: 'array',
        //   child: {
        //     component: 'object',
        //     fields: [
        //       {name: 'company', label: 'Company', component: 'text'},
        //       {name: 'logo', label: 'Logo', component: 'image'},
        //     ]
        //   },
        //   emptyPlaceHolder: 'Empty',
        //   itemProps: (item, index) => ({
        //     label: 'Your wish'
        //   }),
        //   defaultItem: {
        //     company: 'Your company'
        //   }
        // },
        // {
        //   name: 'hobbies',
        //   label: 'Hobbies',
        //   component: 'array',
        //   child: {
        //     component: 'image',
        //   },
        // }
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
