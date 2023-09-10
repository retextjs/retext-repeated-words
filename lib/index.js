/**
 * @typedef {import('nlcst').Root} Root
 *  @typedef {import('vfile').VFile} VFile
 */

/**
 * @typedef Info
 *   Info on a word.
 * @property {number} index
 *   Index.
 * @property {string} value
 *   Value (lowercase).
 */

import {toString} from 'nlcst-to-string'
import {pointEnd, pointStart} from 'unist-util-position'
import {SKIP, visit} from 'unist-util-visit'

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
 * Check for for repeated words.
 *
 * ###### Notes
 *
 * * Doesn’t warn for certain words which *do* occur twice (`the best exhibition
 *   they had had since`)
 * * Doesn’t warn for initialisms (`D. D. will pop up with…`)
 * * Doesn’t warn for capitalised words (`Duran Duran…`)
 *
 * @returns
 *   Transform.
 */
export default function retextRepeatedWords() {
  /**
   * Transform.
   *
   * @param {Root} tree
   *   Tree.
   * @param {VFile} file
   *   File.
   * @returns {undefined}
   *   Nothing.
   */
  return function (tree, file) {
    visit(tree, 'SentenceNode', function (parent) {
      let index = -1
      /** @type {Info | undefined} */
      let previous
      /** @type {Info | undefined} */
      let current

      while (++index < parent.children.length) {
        const child = parent.children[index]

        if (child.type === 'WordNode') {
          const value = toString(child)

          current = {index, value: value.toLowerCase()}

          if (previous && previous.value === current.value && !ignore(value)) {
            const start = pointStart(parent.children[previous.index])
            const end = pointEnd(child)
            const message = file.message(
              'Unexpected repeated `' + value + '`, remove one occurrence',
              {
                ancestors: [parent, child],
                /* c8 ignore next -- verbose to test */
                place: start && end ? {start, end} : undefined,
                ruleId: current.value.replace(/\W+/g, '-'),
                source: 'retext-repeated-words'
              }
            )

            message.actual = toString(
              parent.children.slice(previous.index, index + 1)
            )
            message.expected = [value]
            message.url =
              'https://github.com/retextjs/retext-repeated-words#readme'
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
 *   Word to check.
 * @returns {boolean}
 *   Whether to ignore `value`.
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
