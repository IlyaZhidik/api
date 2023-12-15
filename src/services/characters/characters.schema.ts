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
import type { CharactersService } from './characters.class'
import { playersSchema } from '../players/players.schema'
import { resolveObjectId, resolveQueryObjectId } from '../../resolvers/ibjectId'

// Main data model schema
export const charactersSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    playerId: ObjectIdSchema(),
    player: Type.Ref(playersSchema),
    who: StringEnum(['warrior', 'mage']),
    avatar: Type.String(),
    strength: Type.Number(),
    stamina: Type.Number(),
    exp: Type.Number(),
    lvl: Type.Number(),
    powerPoints: Type.Number(),
    wins: Type.Number(),
    games: Type.Number(),
  },
  { $id: 'Characters', additionalProperties: false },
)
export type Characters = Static<typeof charactersSchema>
export const charactersValidator = getValidator(charactersSchema, dataValidator)
export const charactersResolver = resolve<
  Characters,
  HookContext<CharactersService>
>({
  playerId: resolveObjectId,
})

export const charactersExternalResolver = resolve<
  Characters,
  HookContext<CharactersService>
>({})

// Schema for creating new entries
export const charactersDataSchema = Type.Omit(
  charactersSchema,
  ['_id', 'player'],
  {
    $id: 'CharactersData',
  },
)
export type CharactersData = Static<typeof charactersDataSchema>
export const charactersDataValidator = getValidator(
  charactersDataSchema,
  dataValidator,
)
export const charactersDataResolver = resolve<
  Characters,
  HookContext<CharactersService>
>({})

// Schema for updating existing entries
export const charactersPatchSchema = Type.Partial(charactersSchema, {
  $id: 'CharactersPatch',
})
export type CharactersPatch = Static<typeof charactersPatchSchema>
export const charactersPatchValidator = getValidator(
  charactersPatchSchema,
  dataValidator,
)
export const charactersPatchResolver = resolve<
  Characters,
  HookContext<CharactersService>
>({
  playerId: resolveObjectId,
})

// Schema for allowed query properties
export const charactersQueryProperties = Type.Omit(charactersSchema, ['player'])
export const charactersQuerySchema = Type.Intersect(
  [
    querySyntax(charactersQueryProperties),
    // Add additional query properties here
    Type.Object(
      {
        player: Type.Optional(Type.Object({})),
      },
      { additionalProperties: false },
    ),
  ],
  { additionalProperties: false },
)
export type CharactersQuery = Static<typeof charactersQuerySchema>
export const charactersQueryValidator = getValidator(
  charactersQuerySchema,
  queryValidator,
)
export const charactersQueryResolver = resolve<
  CharactersQuery,
  HookContext<CharactersService>
>({
  playerId: resolveQueryObjectId,
})
