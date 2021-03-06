/* eslint-disable no-undef */

const JagTagParser = require('../index')

describe('String parser', () => {
  it('Converts strings to uppercase', () => {
    expect(JagTagParser('{upper:test}')).toBe('TEST')
  })

  it('Converts strings to lowercase', () => {
    expect(JagTagParser('{lower:TEST}')).toBe('test')
  })

  it('Returns string length', () => {
    expect(JagTagParser('{length:test}')).toBe('4')
  })

  it('Encodes URLs', () => {
    expect(JagTagParser('{url:http://example.com/?x=Discord Bot}')).toBe('http://example.com/?x=Discord%20Bot')
  })

  it('Replaces text', () => {
    expect(JagTagParser('{replace:test|TEST|this is a test}')).toBe('this is a TEST')
  })

  it('Extracts substrings', () => {
    expect(JagTagParser('{substring:2|6|something}')).toBe('meth')
  })

  it('Trims white space', () => {
    // This also trims newlines, but Jest does not parse it properly for some reason (See https://repl.it/@LWTech/Whitespace-Replacer)
    expect(JagTagParser('{oneline:lots     of     whitespace}')).toBe('lots of whitespace')
  })

  it('Hashes characters', () => {
    expect(JagTagParser('{hash:test text}')).toBe('-1238303749')
  })
})
