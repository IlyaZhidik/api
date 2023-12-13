import {
  resolveObjectId as _resolveObjectId,
  resolveQueryObjectId as _resolveQueryObjectId,
} from '@feathersjs/mongodb'

export const resolveArrayObjectIds = async (value: any) => {
  if (!value) return
  return await Promise.all(value.map(_resolveObjectId))
}

export const resolveArrayQueryObjectIds = async (value: any) => {
  if (!value) return
  return await Promise.all(value.map(_resolveQueryObjectId))
}

export const resolveOptionalArrayObjectIds = async (value: any) => {
  if (value) return await resolveArrayObjectIds(value)
}

export const resolveObjectId = async (value: any) => {
  if (value) return await _resolveObjectId(value)
}

export const resolveQueryObjectId = async (value: any) => {
  if (value) return await _resolveQueryObjectId(value)
}
