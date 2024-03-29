import assert from 'node:assert/strict'
import test from 'node:test'
import {retext} from 'retext'
import retextRepeatedWords from 'retext-repeated-words'

test('retextRepeatedWords', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(
      Object.keys(await import('retext-repeated-words')).sort(),
      ['default']
    )
  })

  await t.test('should emit a message w/ metadata', async function () {
    const file = await retext()
      .use(retextRepeatedWords)
      .process('Well, it it doesn’t have to be.')

    assert.deepEqual(
      JSON.parse(JSON.stringify({...file.messages[0], ancestors: []})),
      {
        ancestors: [],
        column: 7,
        fatal: false,
        message: 'Unexpected repeated `it`, remove one occurrence',
        line: 1,
        name: '1:7-1:12',
        place: {
          start: {line: 1, column: 7, offset: 6},
          end: {line: 1, column: 12, offset: 11}
        },
        reason: 'Unexpected repeated `it`, remove one occurrence',
        ruleId: 'it',
        source: 'retext-repeated-words',
        actual: 'it it',
        expected: ['it'],
        url: 'https://github.com/retextjs/retext-repeated-words#readme'
      }
    )
  })

  await t.test('should catch repeated words', async function () {
    const file = await retext()
      .use(retextRepeatedWords)
      .process(
        'Well, it it doesn’t have to to be. Like a fish in the\nthe sea.'
      )

    assert.deepEqual(file.messages.map(String), [
      '1:7-1:12: Unexpected repeated `it`, remove one occurrence',
      '1:26-1:31: Unexpected repeated `to`, remove one occurrence',
      '1:51-2:4: Unexpected repeated `the`, remove one occurrence'
    ])
  })

  await t.test('should catch repeated words when uppercase', async function () {
    const file = await retext()
      .use(retextRepeatedWords)
      .process('LIKE A FISH IN THE\nTHE SEA.')

    assert.deepEqual(file.messages.map(String), [
      '1:16-2:4: Unexpected repeated `THE`, remove one occurrence'
    ])
  })

  await t.test('should ignore sentence cased words', async function () {
    const file = await retext()
      .use(retextRepeatedWords)
      .process('Duran Duran is awesome.')

    assert.deepEqual(file.messages, [])
  })

  await t.test('should ignore initialisms', async function () {
    const file = await retext()
      .use(retextRepeatedWords)
      .process('D. D. will pop up with.')

    assert.deepEqual(file.messages, [])
  })

  await t.test('should ignore differently cases words', async function () {
    const file = await retext().use(retextRepeatedWords).process('DURAN Duran')

    assert.deepEqual(file.messages, [])
  })

  await t.test('should ignore some valid repetitions', async function () {
    const file = await retext()
      .use(retextRepeatedWords)
      .process('the most heartening exhibition they had had since')

    assert.deepEqual(file.messages, [])
  })

  await t.test('should ignore some valid repetitions (mau)', async function () {
    const file = await retext()
      .use(retextRepeatedWords)
      .process(
        'The Mau Mau Uprising, also known as the Mau Mau Rebellion, Mau Mau Revolt, or Kenya Emergency, was a military conflict that took place in British Kenya'
      )

    assert.deepEqual(file.messages, [])
  })
})
