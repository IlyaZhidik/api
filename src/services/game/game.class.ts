// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Game, GameData, GamePatch, GameQuery } from './game.schema'

export type { Game, GameData, GamePatch, GameQuery }

export interface GameParams extends MongoDBAdapterParams<GameQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class GameService<ServiceParams extends Params = GameParams> extends MongoDBService<
  Game,
  GameData,
  GameParams,
  GamePatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('game'))
  }
}
