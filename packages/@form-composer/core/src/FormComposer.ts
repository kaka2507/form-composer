import {FieldComponent, FieldComponentManager} from "./field";
import {Plugin, PluginManager} from "./plugin";

export interface FormComposerConfig {
    fieldTypes?: FieldComponent[]
    plugins?: Plugin[]
}

export class FormComposer {
    fields: FieldComponentManager
    plugins: PluginManager

    constructor(config: FormComposerConfig) {
        this.fields = new FieldComponentManager();
        (config.fieldTypes ? config.fieldTypes : []).forEach(field => {
            if (!this.fields.get(field.name)) {
                this.fields.add(field)
            }
        })
        this.plugins = new PluginManager();
        (config.plugins ? config.plugins : [] as Plugin[]).forEach(plugin => {
            this.plugins.add(plugin)
        })
    }

    registerField(fieldComponents: FieldComponent[]) {
        fieldComponents.forEach(field => {
            if (!this.fields.get(field.name)) {
                this.fields.add(field)
            }
        })
    }

    registerPlugin(plugins: Plugin[]) {
        plugins.forEach(plugin => {
            if (!this.plugins.get(plugin.name)) {
                this.plugins.add(plugin)
            }
        })
    }
}
