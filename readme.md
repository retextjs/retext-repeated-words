# retext-repeated-words [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

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
    exhibition they had had since`);
*   Doesn’t warn for initialisms (`D. D. will pop up with...`);
*   Doesn’t warn for capitalised words (`Duran Duran...`).

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/wooorm/retext-repeated-words.svg

[travis]: https://travis-ci.org/wooorm/retext-repeated-words

[codecov-badge]: https://img.shields.io/codecov/c/github/wooorm/retext-repeated-words.svg

[codecov]: https://codecov.io/github/wooorm/retext-repeated-words

[npm-install]: https://docs.npmjs.com/cli/install

[license]: LICENSE

[author]: http://wooorm.com

[retext]: https://github.com/wooorm/retext
