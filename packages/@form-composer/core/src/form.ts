import arrayMutators from 'final-form-arrays'
import {Config, createForm as finalCreateForm, FormApi, FormState} from 'final-form'
import {AnyField, Field} from './field'

export interface FormOptions<S, F extends Field = AnyField> extends Config<S> {
    fields: F[]

    reset?(): void

    onChange?(values: FormState<S>): void
}

export class Form<S = any, F extends Field = AnyField> {
    fields: F[]
    finalForm: FormApi<S>
    loading: boolean = false
    onSubmit: Config<S>['onSubmit']

    constructor({
                    fields,
                    reset,
                    onChange,
                    ...options
                }: FormOptions<S, F>) {
        const initialValues = options.initialValues || ({} as S)
        this.fields = fields
        this.onSubmit = options.onSubmit
        this.finalForm = finalCreateForm<S>({
            ...options,
            initialValues,
            onSubmit: this.handleSubmit,
            mutators: {
                ...arrayMutators,
                ...options.mutators,
            },
        })

        this._reset = reset

        if (onChange) {
            let firstUpdate = true
            this.subscribe(
                formState => {
                    if (firstUpdate) {
                        firstUpdate = false
                    } else {
                        onChange(formState)
                    }
                },
                {values: true}
            )
        }
    }

    /**
     * Returns the current values of the form.
     *
     * if the form is still loading it returns `undefined`.
     */
    get values(): S | undefined {
        if (this.loading) {
            return undefined
        }
        // @ts-ignore
        return this.finalForm.getState().values || this.initialValues
    }

    /**
     * The values the form was initialized with.
     */
    get initialValues() {
        return this.finalForm.getState().initialValues
    }

    get pristine() {
        return this.finalForm.getState().pristine
    }

    get dirty() {
        return this.finalForm.getState().dirty
    }

    get submitting() {
        return this.finalForm.getState().submitting
    }

    get valid() {
        return this.finalForm.getState().valid
    }

    get mutators() {
        return this.finalForm.mutators
    }

    /**
     * Resets the values back to the initial values the form was initialized with.
     * Or empties all the values if the form was not initialized.
     */
    async reset() {
        if (this._reset) {
            await this._reset()
        }
        this.finalForm.reset()
    }

    /**
     * Subscribes to changes to the form. The subscriber will only be called when
     * values specified in subscription change. A form can have many subscribers.
     */
    subscribe: FormApi<S>['subscribe'] = (cb, options) => {
        return this.finalForm.subscribe(cb, options)
    }

    /**
     * Submits the form if there are currently no validation errors. It may
     * return undefined or a Promise depending on the nature of the onSubmit
     * configuration value given to the form when it was created.
     */
    submit: FormApi<S>['submit'] = () => {
        return this.finalForm.submit()
    }

    /**
     * Changes the value of the given field.
     *
     * @param name
     * @param value
     */
    change(name: string, value?: any) {
        // @ts-ignore
        return this.finalForm.change(name, value)
    }

    /**
     * Updates multiple fields in the form.
     *
     * The updates are batched so that it only triggers one `onChange` event.
     *
     * In order to prevent disruptions to the user's editing experience this
     * function will _not_ update the value of any field that is currently
     * being edited.
     *
     * @param values
     */
    updateValues(values: S) {
        this.finalForm.batch(() => {
            // @ts-ignore
            const activePath: string | undefined = this.finalForm.getState().active

            if (!activePath) {
                updateEverything<S>(this.finalForm, values)
            } else {
                updateSelectively<S>(this.finalForm, values)
            }
        })
    }

    /**
     * Replaces the initialValues of the form without deleting the current values.
     *
     * This function is helpful when the initialValues are loaded asynchronously.
     *
     * @param initialValues
     */
    updateInitialValues(initialValues: S) {
        this.finalForm.batch(() => {
            const values = this.values || ({} as S)
            this.finalForm.initialize(initialValues)
            // @ts-ignore
            const activePath: string | undefined = this.finalForm.getState().active

            if (!activePath) {
                updateEverything<S>(this.finalForm, values)
            } else {
                updateSelectively<S>(this.finalForm, values)
            }
        })
    }

    private _reset?(): void

    private handleSubmit: Config<S>['onSubmit'] = async (values, form, cb) => {
        const response = await this.onSubmit(values, form, cb)
        form.initialize(values)
        return response
    }
}

function updateEverything<S>(form: FormApi<any>, values: S) {
    Object.entries(values).forEach(([path, value]) => {
        form.change(path, value)
    })
}

function updateSelectively<S>(form: FormApi<any>, values: S, prefix?: string) {
    // @ts-ignore
    const activePath: string = form.getState().active!

    Object.entries(values).forEach(([name, value]) => {
        const path = prefix ? `${prefix}.${name}` : name

        if (typeof value === 'object') {
            if (activePath.startsWith(path)) {
                updateSelectively(form, value, path)
            } else {
                form.change(path, value)
            }
        } else if (path !== activePath) {
            form.change(path, value)
        }
    })
}

export function createForm(options: FormOptions<any>, onChange?: any): Form {
    const form = new Form(options)
    if (onChange) {
        form.subscribe((form) => {
            onChange(form.values)
        }, {values: true})
    }
    return form
}