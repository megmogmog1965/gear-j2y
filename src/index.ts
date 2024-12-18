#!/usr/bin/env npx tsx

import fs from 'fs'
import process from 'process'
import { getArgs } from '@/src/argparser.js'
import { parseJsonRecursively, createYamlString } from '@/src/converter.js'

/**
 * main process.
 *
 * @returns {boolean} true if success.
 */
async function main(): Promise<boolean> {
  const { args, error } = getArgs()

  // invalid cli options.
  if (error || !args) {
    console.log(usage())
    return false
  }

  // invalid cli args.
  if (args.values.help || args.positionals.length === 0) {
    console.log(usage())
    return false
  }

  // read local json file.
  const shallow = loadJson(args.positionals[0])
  if (!shallow) {
    console.log(usage())
    return false
  }

  // parse json recursively.
  const deep = parseJsonRecursively(shallow)

  // convert json to yaml.
  const yaml = createYamlString(deep)

  // stdout.
  process.stdout.write(yaml)

  return true
}

/**
 * usage.
 *
 * @returns usage message.
 */
function usage(): string {
  return `
Usage: npx gear-j2y [options] [json file]

Options:
  -h, --help  Show help
`.trim()
}

/**
 * load json file.
 *
 * @param {string} filePath json file path.
 * @returns {any | undefined} json object or undefined.
 */
function loadJson(filePath: string): any | undefined {  // eslint-disable-line @typescript-eslint/no-explicit-any
  try {
    const file = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(file)

  } catch (e) {  // eslint-disable-line @typescript-eslint/no-unused-vars
    return undefined
  }
}

// call.
const result = await main()
if (!result) {
  process.exit(1)
}
