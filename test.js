import test from 'tape'
import {retext} from 'retext'
import retextRepeatedWords from './index.js'

test('retextRepeatedWords()', (t) => {
  t.deepEqual(
    JSON.parse(
      JSON.stringify(
        retext()
          .use(retextRepeatedWords)
          .processSync('Well, it it doesn’t have to be.').messages
      )
    ),
    [
      {
        name: '1:7-1:12',
        message: 'Expected `it` once, not twice',
        reason: 'Expected `it` once, not twice',
        line: 1,
        column: 7,
        source: 'retext-repeated-words',
        ruleId: 'it',
        position: {
          start: {line: 1, column: 7, offset: 6},
          end: {line: 1, column: 12, offset: 11}
        },
        fatal: false,
        actual: 'it it',
        expected: ['it']
      }
    ],
    'should emit messages'
  )

  t.deepEqual(
    retext()
      .use(retextRepeatedWords)
      .processSync(
        'Well, it it doesn’t have to to be. Like a fish in the\nthe sea.'
      )
      .messages.map((d) => String(d)),
    [
      '1:7-1:12: Expected `it` once, not twice',
      '1:26-1:31: Expected `to` once, not twice',
      '1:51-2:4: Expected `the` once, not twice'
    ],
    'should catch repeated words'
  )

  t.deepEqual(
    retext()
      .use(retextRepeatedWords)
      .processSync('LIKE A FISH IN THE\nTHE SEA.')
      .messages.map((d) => String(d)),
    ['1:16-2:4: Expected `THE` once, not twice'],
    'should catch repeated words when uppercase'
  )

  t.deepEqual(
    retext().use(retextRepeatedWords).processSync('Duran Duran is awesome.')
      .messages,
    [],
    'should ignore sentence cased words'
  )

  t.deepEqual(
    retext().use(retextRepeatedWords).processSync('D. D. will pop up with.')
      .messages,
    [],
    'should ignore initialisms'
  )

  t.deepEqual(
    retext().use(retextRepeatedWords).processSync('DURAN Duran').messages,
    [],
    'should ignore differently cases words'
  )

  t.deepEqual(
    retext()
      .use(retextRepeatedWords)
      .processSync('the most heartening exhibition they had had since')
      .messages,
    [],
    'should ignore some valid repetitions'
  )

  t.deepEqual(
    retext()
      .use(retextRepeatedWords)
      .processSync(
        'The Mau Mau Uprising, also known as the Mau Mau Rebellion, Mau Mau Revolt, or Kenya Emergency, was a military conflict that took place in British Kenya'
      ).messages,
    [],
    'should ignore some valid repetitions (mau)'
  )

  t.end()
})
