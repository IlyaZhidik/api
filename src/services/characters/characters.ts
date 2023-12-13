// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  charactersDataValidator,
  charactersPatchValidator,
  charactersQueryValidator,
  charactersResolver,
  charactersExternalResolver,
  charactersDataResolver,
  charactersPatchResolver,
  charactersQueryResolver
} from './characters.schema'

import type { Application } from '../../declarations'
import { CharactersService, getOptions } from './characters.class'
import { charactersPath, charactersMethods } from './characters.shared'

export * from './characters.class'
export * from './characters.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const characters = (app: Application) => {
  // Register our service on the Feathers application
  app.use(charactersPath, new CharactersService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: charactersMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(charactersPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(charactersExternalResolver),
        schemaHooks.resolveResult(charactersResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(charactersQueryValidator),
        schemaHooks.resolveQuery(charactersQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(charactersDataValidator),
        schemaHooks.resolveData(charactersDataResolver)
      ],
      patch: [
        schemaHooks.validateData(charactersPatchValidator),
        schemaHooks.resolveData(charactersPatchResolver)
      ],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [charactersPath]: CharactersService
  }
}
