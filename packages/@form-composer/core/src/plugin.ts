import {Map} from './common'

export interface Plugin {
    name: string
}

export class PluginManager {
    private plugins: Map<Plugin> = {}

    get(name: string) {
        return this.plugins[name]
    }

    add(plugin: Plugin) {
        this.plugins[plugin.name] = plugin
    }
}
