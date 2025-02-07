import { defineNuxtModule, addPlugin, createResolver, hasNuxtModule, installModule, addImportsDir } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'my-module',
    configKey: 'myModule',
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  async setup(_options, nuxt) {
    const resolver = createResolver(import.meta.url)

    if (!hasNuxtModule('@quirks/nuxt', nuxt)) {
      await installModule('@quirks/nuxt')
    }

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))
    addImportsDir(resolver.resolve('./runtime/composables'))
  },
})
