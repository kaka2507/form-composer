 import React from "react";
import {FormComposer} from "./FormComposer";

export const FormComposerContext = React.createContext<FormComposer | null>(null)
export const ERROR_MISSING_FORM_MANAGER = `useFormComposer could not find an instance of {FormComposer}`

export function useFormComposer(): FormComposer {
    const formComposer = React.useContext(FormComposerContext);
    if (!formComposer) {
        throw new Error(ERROR_MISSING_FORM_MANAGER)
    }
    return formComposer;
}
