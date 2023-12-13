// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Game, GameData, GamePatch, GameQuery, GameService } from './game.class'

export type { Game, GameData, GamePatch, GameQuery }

export type GameClientService = Pick<GameService<Params<GameQuery>>, (typeof gameMethods)[number]>

export const gamePath = 'game'

export const gameMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const gameClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(gamePath, connection.service(gamePath), {
    methods: gameMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [gamePath]: GameClientService
  }
}
