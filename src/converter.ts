import { stringify } from 'yaml'

type JsonTypes = object | Array<JsonTypes> | string | number | boolean | null

/**
 * parse json recursively.
 *
 * @param {JsonTypes} json json value type.
 * @returns {JsonTypes} fully parsed json value type.
 */
export function parseJsonRecursively(json: JsonTypes): JsonTypes {
  // array.
  if (Array.isArray(json)) {
    return json.map((value) => parseJsonRecursively(value))
  }

  // object.
  if (typeof json === 'object' && json !== null) {
    return Object.fromEntries(Object.entries(json).map(([key, value]) => [key, parseJsonRecursively(value)]))
  }

  // string.
  if (typeof json === 'string') {
    const jsonObject = parseAsArrayOrObjectOrNull(json)
    return (jsonObject !== undefined) ? parseJsonRecursively(jsonObject) : json
  }

  // number, boolean, null.
  return json
}

/**
 * parse json as Json array, object or null.
 *
 * @param {string} str json string.
 * @returns {Array<JsonTypes> | object | null | undefined} parsed json array, object or null or undefined.
 */
function parseAsArrayOrObjectOrNull(str: string): Array<JsonTypes> | object | null | undefined {
  let json = undefined
  try {
    json = JSON.parse(str)
  } catch (e) {  // eslint-disable-line @typescript-eslint/no-unused-vars
    return undefined
  }

  // array, object or null.
  return (Array.isArray(json) || json === null || typeof json === 'object') ? json : undefined
}

/**
 * create yaml string.
 *
 * @param {JsonTypes} json json value type.
 * @returns {string} yaml string.
 */
export function createYamlString(json: JsonTypes): string {
  return stringify(json)
}
