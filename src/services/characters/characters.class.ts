// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Characters, CharactersData, CharactersPatch, CharactersQuery } from './characters.schema'

export type { Characters, CharactersData, CharactersPatch, CharactersQuery }

export interface CharactersParams extends MongoDBAdapterParams<CharactersQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class CharactersService<ServiceParams extends Params = CharactersParams> extends MongoDBService<
  Characters,
  CharactersData,
  CharactersParams,
  CharactersPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('characters'))
  }
}
