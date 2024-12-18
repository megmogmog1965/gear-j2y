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
    const jsonObject = parseAsJsonObject(json)
    return jsonObject ? parseJsonRecursively(jsonObject) : json
  }

  // number, boolean, null.
  return json
}

/**
 * parse json as object.
 *
 * @param {string} str json string.
 * @returns {object | undefined} parsed json object or undefined.
 */
function parseAsJsonObject(str: string): object | undefined {
  let json = undefined
  try {
    json = JSON.parse(str)
  } catch (e) {  // eslint-disable-line @typescript-eslint/no-unused-vars
    return undefined
  }

  return (typeof json === 'object' && json !== null) ? json : undefined
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
