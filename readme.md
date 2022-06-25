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
In Node.js (version 12.20+, 14.14+, 16.0+, or 18.0+), install with [npm][]:

```sh
npm install retext-repeated-words
```

In Deno with [`esm.sh`][esmsh]:

```js
import retextRepeatedWords from 'https://esm.sh/retext-repeated-words@4'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import retextRepeatedWords from 'https://esm.sh/retext-repeated-words@4?bundle'
</script>
```

## Use

Say our document `example.txt` contains:

```txt
Well, it it doesn’t have to to be. Like a fish in the
the sea.
```

…and our module `example.js` looks as follows:

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

…now running `node example.js` yields:

```txt
example.txt
   1:7-1:12  warning  Expected `it` once, not twice   it   retext-repeated-words
  1:26-1:31  warning  Expected `to` once, not twice   to   retext-repeated-words
   1:51-2:4  warning  Expected `the` once, not twice  the  retext-repeated-words

⚠ 3 warnings
```

## API

This package exports no identifiers.
The default export is `retextRepeatedWords`.

### `unified().use(retextRepeatedWords)`

Check for repeated words.

*   doesn’t warn for some words which *do* occur twice (`the best exhibition
    they had had since`)
*   doesn’t warn for initialisms (`D. D. will pop up with…`)
*   doesn’t warn for capitalised words (`Duran Duran…`)

There are no options.

## Messages

Each message is emitted as a [`VFileMessage`][vfile-message] on `file`, with
the following fields:

###### `message.source`

Name of this plugin (`'retext-repeated-words'`).

###### `message.ruleId`

Repeated word (normalized) (`string`, such as `the`).

###### `message.actual`

Current not ok phrase (`string`).

###### `message.expected`

List of suggestions (`Array<string>`, such as `['the']`).

## Types

This package is fully typed with [TypeScript][].
It exports no additional types.

## Compatibility

Projects maintained by the unified collective are compatible with all maintained
versions of Node.js.
As of now, that is Node.js 12.20+, 14.14+, 16.0+, and 18.0+.
Our projects sometimes work with older versions, but this is not guaranteed.

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

[size-badge]: https://img.shields.io/bundlephobia/minzip/retext-repeated-words.svg

[size]: https://bundlephobia.com/result?p=retext-repeated-words

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

[unified]: https://github.com/unifiedjs/unified

[retext]: https://github.com/retextjs/retext

[vfile-message]: https://github.com/vfile/vfile-message
