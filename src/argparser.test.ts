import { describe, it, expect, beforeEach, afterAll } from 'vitest'
import { getArgs } from './argparser.js'


beforeEach(() => {
  // nothing to be done.
})

afterAll(() => {
  // nothing to be done.
})

describe('getArgs()', () => {
  it('Unknown option', async () => {
    // call.
    const { args, error } = await getArgs(['--invalid'])

    // assertion.
    expect(args).toBeUndefined()
    expect(error).toBeTypeOf('string')
  })

  it('positionals', async () => {
    // call.
    const { args, error } = await getArgs(['command_name'])

    // assertion.
    expect(args?.positionals[0]).toBe('command_name')
    expect(error).toBeUndefined()
  })

  it('positionals x2', async () => {
    // call.
    const { args, error } = await getArgs(['command_name_1', 'command_name_2'])

    // assertion.
    expect(args?.positionals[0]).toBe('command_name_1')
    expect(args?.positionals[1]).toBe('command_name_2')
    expect(error).toBeUndefined()
  })

  it('values, default', async () => {
    // call.
    const { args, error } = await getArgs(['command_name'])

    // assertion.
    expect(args?.values).toStrictEqual({ help: false })
    expect(error).toBeUndefined()
  })

  it('values, -h', async () => {
    // call.
    const { args, error } = await getArgs(['command_name', '-h'])

    // assertion.
    expect(args?.values).toStrictEqual({ help: true })
    expect(error).toBeUndefined()
  })

  it('values, --help', async () => {
    // call.
    const { args, error } = await getArgs(['command_name', '--help'])

    // assertion.
    expect(args?.values).toStrictEqual({ help: true })
    expect(error).toBeUndefined()
  })
})
