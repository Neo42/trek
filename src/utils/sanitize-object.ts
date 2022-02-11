const isVoid = (value: unknown) =>
  value === undefined || value === null || value === ''

export const sanitizeObject = (object: {[key: string]: unknown}) => {
  const result = {...object}
  Object.entries(result).forEach(([key, value]) => {
    if (isVoid(value)) delete result[key]
  })
  return result
}
