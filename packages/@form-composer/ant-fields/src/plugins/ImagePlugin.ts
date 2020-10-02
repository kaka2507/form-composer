import {Plugin} from "@form-composer/core";

export interface IImagePlugin extends Plugin {
    persist(file: File): Promise<string>;
}

export class ImagePlugin implements IImagePlugin {
    name: string = 'image'

    persist(file: File): Promise<string> {
        return new Promise((resolve, reject) => setTimeout(() => {
            resolve(URL.createObjectURL(file))
            // reject('Upload fail')
        }, 1000))
    }
}