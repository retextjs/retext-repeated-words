# retext-repeated-words

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

**[retext][]** plugin to check for ~~`for`~~ repeated words.

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`unified().use(retextRepeatedWords)`](#unifieduseretextrepeatedwords)
*   [Messages](#messages)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Related](#related)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This package is a [unified][] ([retext][]) plugin to check for repeated words.
For example, `like like` this.

## When should I use this?

You can opt-into this plugin when you’re dealing with content that might contain
grammar mistakes, and have authors that can fix that content.

## Install

This package is [ESM only][esm].
In Node.js (version 16+), install with [npm][]:

```sh
npm install retext-repeated-words
```

In Deno with [`esm.sh`][esmsh]:

```js
import retextRepeatedWords from 'https://esm.sh/retext-repeated-words@5'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import retextRepeatedWords from 'https://esm.sh/retext-repeated-words@5?bundle'
</script>
```

## Use

Say our document `example.txt` contains:

```txt
Well, it it doesn’t have to to be. Like a fish in the
the sea.
```

…and our module `example.js` contains:

```js
import {read} from 'to-vfile'
import {reporter} from 'vfile-reporter'
import {unified} from 'unified'
import retextEnglish from 'retext-english'
import retextStringify from 'retext-stringify'
import retextRepeatedWords from 'retext-repeated-words'

const file = await unified()
  .use(retextEnglish)
  .use(retextRepeatedWords)
  .use(retextStringify)
  .process(await read('example.txt'))

console.error(reporter(file))
```

…then running `node example.js` yields:

```txt
example.txt
1:7-1:12  warning Unexpected repeated `it`, remove one occurrence  it  retext-repeated-words
1:26-1:31 warning Unexpected repeated `to`, remove one occurrence  to  retext-repeated-words
1:51-2:4  warning Unexpected repeated `the`, remove one occurrence the retext-repeated-words

⚠ 3 warnings
```

## API

This package exports no identifiers.
The default export is [`retextRepeatedWords`][api-retext-repeated-words].

### `unified().use(retextRepeatedWords)`

Check for repeated words.

###### Parameters

There are no parameters.

###### Returns

Transform ([`Transformer`][unified-transformer]).

###### Notes

*   Doesn’t warn for certain words which *do* occur twice (`the best exhibition
    they had had since`)
*   Doesn’t warn for initialisms (`D. D. will pop up with…`)
*   Doesn’t warn for capitalised words (`Duran Duran…`)

## Messages

Each message is emitted as a [`VFileMessage`][vfile-message] on `file`, with
`source` set to `'retext-repeated-words'`, `ruleId` to the normalized word,
`actual` to both words, and `expected` to suggestions.

## Types

This package is fully typed with [TypeScript][].
It exports no additional types.

## Compatibility

Projects maintained by the unified collective are compatible with maintained
versions of Node.js.

When we cut a new major release, we drop support for unmaintained versions of
Node.
This means we try to keep the current release line, `retext-repeated-words@^5`,
compatible with Node.js 16.

## Related

*   [`retext-indefinite-article`](https://github.com/retextjs/retext-indefinite-article)
    — check if indefinite articles are used correctly
*   [`retext-redundant-acronyms`](https://github.com/retextjs/retext-redundant-acronyms)
    — check for redundant acronyms

## Contribute

See [`contributing.md`][contributing] in [`retextjs/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/retextjs/retext-repeated-words/workflows/main/badge.svg

[build]: https://github.com/retextjs/retext-repeated-words/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/retextjs/retext-repeated-words.svg

[coverage]: https://codecov.io/github/retextjs/retext-repeated-words

[downloads-badge]: https://img.shields.io/npm/dm/retext-repeated-words.svg

[downloads]: https://www.npmjs.com/package/retext-repeated-words

[size-badge]: https://img.shields.io/bundlejs/size/retext-repeated-words

[size]: https://bundlejs.com/?q=retext-repeated-words

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/retextjs/retext/discussions

[npm]: https://docs.npmjs.com/cli/install

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[typescript]: https://www.typescriptlang.org

[health]: https://github.com/retextjs/.github

[contributing]: https://github.com/retextjs/.github/blob/main/contributing.md

[support]: https://github.com/retextjs/.github/blob/main/support.md

[coc]: https://github.com/retextjs/.github/blob/main/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[retext]: https://github.com/retextjs/retext

[unified]: https://github.com/unifiedjs/unified

[unified-transformer]: https://github.com/unifiedjs/unified#transformer

[vfile-message]: https://github.com/vfile/vfile-message

[api-retext-repeated-words]: #unifieduseretextrepeatedwords
