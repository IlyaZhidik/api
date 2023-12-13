// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  Characters,
  CharactersData,
  CharactersPatch,
  CharactersQuery,
  CharactersService
} from './characters.class'

export type { Characters, CharactersData, CharactersPatch, CharactersQuery }

export type CharactersClientService = Pick<
  CharactersService<Params<CharactersQuery>>,
  (typeof charactersMethods)[number]
>

export const charactersPath = 'characters'

export const charactersMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const charactersClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(charactersPath, connection.service(charactersPath), {
    methods: charactersMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [charactersPath]: CharactersClientService
  }
}
