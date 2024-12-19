import { describe, it, expect, beforeEach, afterAll } from 'vitest'
import { parseJsonRecursively, createYamlString } from './converter.js'


beforeEach(() => {
  // nothing to be done.
})

afterAll(() => {
  // nothing to be done.
})

describe('parseJsonRecursively()', () => {
  it('without nested.', async () => {
    const json = {
      key1: 'value1',
      key2: 2,
      key3: null,
      key4: ['array'],
      key5: {
        key6: 'object',
      },
    }

    // call.
    const actual = parseJsonRecursively(json)

    // assertion.
    expect(actual).toStrictEqual(json)
  })

  it('with nested null.', async () => {
    const json = {
      key1: 'value1',
      key2: 'null',
    }

    // call.
    const actual = parseJsonRecursively(json)

    // assertion.
    expect(actual).toStrictEqual({
      key1: 'value1',
      key2: null,
    })
  })

  it('with nested object.', async () => {
    const json = {
      key1: 'value1',
      key2: '{ "key3": "value3" }',
    }

    // call.
    const actual = parseJsonRecursively(json)

    // assertion.
    expect(actual).toStrictEqual({
      key1: 'value1',
      key2: {
        key3: 'value3',
      },
    })
  })

  it('with nested array.', async () => {
    const json = {
      key1: 'value1',
      key2: '[ "value2", "value3" ]',
    }

    // call.
    const actual = parseJsonRecursively(json)

    // assertion.
    expect(actual).toStrictEqual({
      key1: 'value1',
      key2: [
        'value2',
        'value3',
      ],
    })
  })
})

describe('createYamlString()', () => {
  it('Unknown option', async () => {
    const json = {
      key1: 'value1',
      key2: 'value2',
    }

    // call.
    const actual = createYamlString(json)

    // assertion.
    expect(actual).toBe(`
key1: value1
key2: value2`.trim() + '\n')
  })
})
