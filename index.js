import {toString} from 'nlcst-to-string'
import {convert} from 'unist-util-is'
import {visit} from 'unist-util-visit'
import {pointStart, pointEnd} from 'unist-util-position'

const source = 'retext-repeated-words'

const word = convert('WordNode')
const whiteSpace = convert('WhiteSpaceNode')

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

// Check for for repeated words.
export default function retextRepeatedWords() {
  return (tree, file) => {
    visit(tree, 'SentenceNode', (parent) => {
      let index = -1
      let previous
      let current

      while (++index < parent.children.length) {
        const child = parent.children[index]

        if (word(child)) {
          const value = toString(child)

          current = {child, index, value}

          if (previous && previous.value === value && !ignore(value)) {
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
                expected: [value]
              }
            )
          }
        } else if (whiteSpace(child)) {
          previous = current
          current = undefined
        } else {
          previous = undefined
          current = undefined
        }
      }

      return visit.SKIP
    })
  }
}

// Check if `value`, a word which occurs twice, should be ignored.
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
