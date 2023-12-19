// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import {
  Type,
  getValidator,
  querySyntax,
  ObjectIdSchema,
  StringEnum,
} from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { GameService } from './game.class'
import { playersSchema } from '../players/players.schema'
import { resolveObjectId, resolveQueryObjectId } from '../../resolvers/ibjectId'
import { ObjectId } from 'mongodb'

// Main data model schema
export const gameSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    winnerId: Type.Optional(ObjectIdSchema()),
    winner: Type.Ref(playersSchema),
    name: Type.String(),
    enemyId: Type.Optional(ObjectIdSchema()),
    hostId: ObjectIdSchema(),
    enemyCharacterId: Type.Optional(ObjectIdSchema()),
    hostCharacterId: ObjectIdSchema(),
    whoHostCharacter: StringEnum(['warrior', 'mage']),
  },
  { $id: 'Game', additionalProperties: false },
)
export type Game = Static<typeof gameSchema>
export const gameValidator = getValidator(gameSchema, dataValidator)
export const gameResolver = resolve<Game, HookContext<GameService>>({
  winnerId: resolveObjectId,
  enemyId: resolveObjectId,
  enemyCharacterId: resolveObjectId,
  hostId: resolveObjectId,
})

export const gameExternalResolver = resolve<Game, HookContext<GameService>>({})

// Schema for creating new entries
export const gameDataSchema = Type.Omit(gameSchema, ['_id', 'winner'], {
  $id: 'GameData',
})
export type GameData = Static<typeof gameDataSchema>
export const gameDataValidator = getValidator(gameDataSchema, dataValidator)
export const gameDataResolver = resolve<Game, HookContext<GameService>>({})

// Schema for updating existing entries
export const gamePatchSchema = Type.Partial(gameSchema, {
  $id: 'GamePatch',
})
export type GamePatch = Static<typeof gamePatchSchema>
export const gamePatchValidator = getValidator(gamePatchSchema, dataValidator)
export const gamePatchResolver = resolve<Game, HookContext<GameService>>({
  winnerId: resolveObjectId,
  enemyId: resolveObjectId,
  enemyCharacterId: resolveObjectId,
  hostId: resolveObjectId,
})

// Schema for allowed query properties
export const gameQueryProperties = Type.Omit(gameSchema, ['winner'])
export const gameQuerySchema = Type.Intersect(
  [
    querySyntax(gameQueryProperties),
    // Add additional query properties here
    Type.Object(
      {
        winner: Type.Optional(Type.Object({})),
      },
      { additionalProperties: false },
    ),
  ],
  { additionalProperties: false },
)
export type GameQuery = Static<typeof gameQuerySchema>
export const gameQueryValidator = getValidator(gameQuerySchema, queryValidator)
export const gameQueryResolver = resolve<GameQuery, HookContext<GameService>>({
  winnerId: resolveQueryObjectId,
  enemyId: resolveQueryObjectId,
  enemyCharacterId: resolveQueryObjectId,
  hostId: resolveQueryObjectId,
})
