/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module retext-repeated-words
 * @fileoverview Check for for repeated words.
 */

'use strict';

/* Dependencies. */
var visit = require('unist-util-visit');
var is = require('unist-util-is');
var toString = require('nlcst-to-string');

/* Expose. */
module.exports = repeatedWords;

/* List of words which can legally occur twice. */
var list = [
  'had',
  'that',
  'can',
  'blah',
  'beep',
  'yadda',
  'sapiens',
  'tse',
  'mau'
];

/**
 * Check for for repeated words.
 */
function repeatedWords() {
  return transformer;

  function transformer(tree, file) {
    visit(tree, 'SentenceNode', function (parent) {
      var children = parent.children;
      var length = children.length;
      var index = -1;
      var child;
      var before;
      var value;
      var node;
      var prev;
      var message;

      while (++index < length) {
        child = children[index];

        if (is('WordNode', child)) {
          value = toString(child);
          node = child;
        } else if (is('WhiteSpaceNode', child)) {
          before = value;
          prev = node;
          value = node = null;
        } else {
          before = value = prev = node = null;
        }

        if (before && before === value && !ignore(value)) {
          message = file.warn('Expected `' + value + '` once, not twice', {
            start: prev.position.start,
            end: node.position.end
          });

          message.ruleId = message.source = 'retext-repeated-words';
        }
      }
    });
  }
}

/* Check if `value`, a word which occurs twice, should be ignored. */
function ignore(value) {
  var head;
  var tail;

  /* ...the most heartening exhibition they had had since... */
  if (list.indexOf(lower(value)) !== -1) {
    return true;
  }

  head = value.charAt(0);
  head = head === head.toUpperCase();

  if (head) {
    /* D. D. will pop up with... */
    if (value.length === 2 && value.charAt(1) === '.') {
      return true;
    }

    tail = value.slice(1);

    /* Duran Duran.... Bella Bella.. */
    if (tail === lower(tail)) {
      return true;
    }
  }

  return false;
}

function lower(value) {
  return value.toLowerCase();
}
