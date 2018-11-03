'use strict';

var test = require('tape');
var retext = require('retext');
var repeated = require('.');

test('repeatedWords()', function (t) {
  t.deepEqual(
    retext().use(repeated).processSync([
      'Well, it it doesn’t have to to be. Like a fish in the',
      'the sea.'
    ].join('\n')).messages.map(String),
    [
      '1:7-1:12: Expected `it` once, not twice',
      '1:26-1:31: Expected `to` once, not twice',
      '1:51-2:4: Expected `the` once, not twice'
    ],
    'should catch repeated words'
  );

  t.deepEqual(
    retext().use(repeated).processSync([
      'LIKE A FISH IN THE',
      'THE SEA.'
    ].join('\n')).messages.map(String),
    ['1:16-2:4: Expected `THE` once, not twice'],
    'should catch repeated words when uppercase'
  );

  t.deepEqual(
    retext().use(repeated).processSync('Duran Duran is awesome.').messages,
    [],
    'should ignore sentence cased words'
  );

  t.deepEqual(
    retext().use(repeated).processSync('D. D. will pop up with.').messages,
    [],
    'should ignore initialisms'
  );

  t.deepEqual(
    retext().use(repeated).processSync('DURAN Duran').messages,
    [],
    'should ignore differently cases words'
  );

  t.deepEqual(
    retext().use(repeated).processSync('the most heartening exhibition they had had since').messages,
    [],
    'should ignore some valid repetitions'
  );

  t.deepEqual(
    retext().use(repeated).processSync('The Mau Mau Uprising, also known as the Mau Mau Rebellion, Mau Mau Revolt, or Kenya Emergency, was a military conflict that took place in British Kenya').messages,
    [],
    'should ignore some valid repetitions (mau)'
  );

  t.end();
});
