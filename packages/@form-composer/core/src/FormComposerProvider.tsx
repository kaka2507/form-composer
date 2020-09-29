 import React from "react";
import {FormComposer} from "./FormComposer";
import {FormComposerContext} from "./use-form-composer";

export interface FormManagerProviderProps {
    formComposer: FormComposer
}

export const FormComposerProvider: React.FC<FormManagerProviderProps> = ({formComposer, children}) => {
    return (
        <FormComposerContext.Provider value={formComposer}>
            {children}
        </FormComposerContext.Provider>
    )
}
