import { characters } from './characters/characters'
import { game } from './game/game'
import { players } from './players/players'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(characters)
  app.configure(game)
  app.configure(players)
  // All services will be registered here
}
