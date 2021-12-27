/**
 * @typedef {import('nlcst').Root} Root
 * @typedef {import('nlcst').SentenceContent} SentenceContent
 * @typedef {{value: string, child: SentenceContent, index: number}} Info
 */

import {toString} from 'nlcst-to-string'
import {visit, SKIP} from 'unist-util-visit'
import {pointStart, pointEnd} from 'unist-util-position'

const source = 'retext-repeated-words'
const url = 'https://github.com/retextjs/retext-repeated-words#readme'

// List of words that can legally occur twice.
const list = new Set([
  'had',
  'that',
  'can',
  'blah',
  'beep',
  'yadda',
  'sapiens',
  'tse',
  'mau'
])

/**
 * A retext plugin to check for for repeated words.
 *
 * * Doesn’t warn for some words which *do* occur twice (`the best exhibition
 *   they had had since`)
 * * Doesn’t warn for initialisms (`D. D. will pop up with…`)
 * * Doesn’t warn for capitalised words (`Duran Duran…`)
 *
 * @type {import('unified').Plugin<[], Root>}
 */
export default function retextRepeatedWords() {
  return (tree, file) => {
    visit(tree, 'SentenceNode', (parent) => {
      let index = -1
      /** @type {Info|undefined} */
      let previous
      /** @type {Info|undefined} */
      let current

      while (++index < parent.children.length) {
        const child = parent.children[index]

        if (child.type === 'WordNode') {
          const value = toString(child)

          current = {child, index, value}

          if (
            previous &&
            previous.value.toLowerCase() === value.toLowerCase() &&
            !ignore(value)
          ) {
            Object.assign(
              file.message(
                'Expected `' + value + '` once, not twice',
                {start: pointStart(previous.child), end: pointEnd(child)},
                [source, value.toLowerCase().replace(/\W+/g, '-')].join(':')
              ),
              {
                actual: toString(
                  parent.children.slice(previous.index, index + 1)
                ),
                expected: [value],
                url
              }
            )
          }
        } else if (child.type === 'WhiteSpaceNode') {
          previous = current
          current = undefined
        } else {
          previous = undefined
          current = undefined
        }
      }

      return SKIP
    })
  }
}

/**
 * Check if `value`, a word which occurs twice, should be ignored.
 *
 * @param {string} value
 * @returns {boolean}
 */
function ignore(value) {
  // …the most heartening exhibition they had had since…
  if (list.has(value.toLowerCase())) {
    return true
  }

  const head = value.charAt(0)

  if (head === head.toUpperCase()) {
    // D. D. will pop up with…
    if (value.length === 2 && value.charAt(1) === '.') {
      return true
    }

    const tail = value.slice(1)

    // Duran Duran… Bella Bella…
    if (tail === tail.toLowerCase()) {
      return true
    }
  }

  return false
}
