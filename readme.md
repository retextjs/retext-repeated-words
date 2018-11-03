# retext-repeated-words [![Build][build-badge]][build] [![Coverage][coverage-badge]][coverage] [![Downloads][downloads-badge]][downloads] [![Chat][chat-badge]][chat]

Check for ~~`for`~~ repeated words with [**retext**][retext].

## Installation

[npm][npm-install]:

```bash
npm install retext-repeated-words
```

## Usage

Say we have the following file, `example.txt`:

```text
Well, it it doesn’t have to to be. Like a fish in the
the sea.
```

And our script, `example.js`, looks like this:

```javascript
var vfile = require('to-vfile');
var report = require('vfile-reporter');
var unified = require('unified');
var english = require('retext-english');
var stringify = require('retext-stringify');
var repeated = require('retext-repeated-words');

unified()
  .use(english)
  .use(repeated)
  .use(stringify)
  .process(vfile.readSync('example.txt'), function (err, file) {
    console.error(report(err || file));
  });
```

Now, running `node example` yields:

```text
example.txt
   1:7-1:12  warning  Expected `it` once, not twice   retext-repeated-words  retext-repeated-words
  1:26-1:31  warning  Expected `to` once, not twice   retext-repeated-words  retext-repeated-words
   1:51-2:4  warning  Expected `the` once, not twice  retext-repeated-words  retext-repeated-words

⚠ 3 warnings
```

## API

### `retext().use(repeatedWords)`

Check for repeated words.

*   Doesn’t warn for some words which _do_ occur twice (`the best
    exhibition they had had since`)
*   Doesn’t warn for initialisms (`D. D. will pop up with...`)
*   Doesn’t warn for capitalised words (`Duran Duran...`)

## Related

*   [`retext-indefinite-article`](https://github.com/retextjs/retext-indefinite-article)
    — Check if indefinite articles are used correctly
*   [`retext-redundant-acronyms`](https://github.com/retextjs/retext-redundant-acronyms)
    — Check for redundant acronyms

## Contribute

See [`contribute.md` in `retextjs/retext`][contribute] for ways to get started.

This organisation has a [Code of Conduct][coc].  By interacting with this
repository, organisation, or community you agree to abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/retextjs/retext-repeated-words.svg

[build]: https://travis-ci.org/retextjs/retext-repeated-words

[coverage-badge]: https://img.shields.io/codecov/c/github/retextjs/retext-repeated-words.svg

[coverage]: https://codecov.io/github/retextjs/retext-repeated-words

[downloads-badge]: https://img.shields.io/npm/dm/retext-repeated-words.svg

[downloads]: https://www.npmjs.com/package/retext-repeated-words

[chat-badge]: https://img.shields.io/badge/join%20the%20community-on%20spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/retext

[npm-install]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com

[retext]: https://github.com/retextjs/retext

[contribute]: https://github.com/retextjs/retext/blob/master/contributing.md

[coc]: https://github.com/retextjs/retext/blob/master/code-of-conduct.md
