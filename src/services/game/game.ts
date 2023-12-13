// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  gameDataValidator,
  gamePatchValidator,
  gameQueryValidator,
  gameResolver,
  gameExternalResolver,
  gameDataResolver,
  gamePatchResolver,
  gameQueryResolver,
} from './game.schema'

import type { Application } from '../../declarations'
import { GameService, getOptions } from './game.class'
import { gamePath, gameMethods } from './game.shared'

export * from './game.class'
export * from './game.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const game = (app: Application) => {
  // Register our service on the Feathers application
  app.use(gamePath, new GameService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: gameMethods,
    // You can add additional custom events to be sent to clients here
    events: [],
  })
  // Initialize hooks
  app.service(gamePath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(gameExternalResolver),
        schemaHooks.resolveResult(gameResolver),
      ],
    },
    before: {
      all: [
        schemaHooks.validateQuery(gameQueryValidator),
        schemaHooks.resolveQuery(gameQueryResolver),
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(gameDataValidator),
        schemaHooks.resolveData(gameDataResolver),
      ],
      patch: [
        schemaHooks.validateData(gamePatchValidator),
        schemaHooks.resolveData(gamePatchResolver),
      ],
      remove: [],
    },
    after: {
      all: [],
    },
    error: {
      all: [],
    },
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [gamePath]: GameService
  }
}
