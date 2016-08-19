# retext-repeated-words [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

Check for ~~for~~ repeated words with [**retext**][retext].

## Installation

[npm][npm-install]:

```bash
npm install retext-repeated-words
```

## Usage

```javascript
var retext = require('retext');
var english = require('retext-english');
var repeated = require('retext-repeated-words');
var report = require('vfile-reporter');

retext().use(english).use(repeated).process([
  'Well, it it doesn’t have to to be. Like a fish in the',
  'the sea.'
].join('\n'), function (err, file) {
  console.log(report(err || file));
});
```

Yields:

```text
   1:7-1:12  warning  Expected `it` once, not twice   retext-repeated-words
  1:26-1:31  warning  Expected `to` once, not twice   retext-repeated-words
   1:51-2:4  warning  Expected `the` once, not twice  retext-repeated-words

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

[travis-badge]: https://img.shields.io/travis/wooorm/.svg

[travis]: https://travis-ci.org/wooorm/

[codecov-badge]: https://img.shields.io/codecov/c/github/wooorm/.svg

[codecov]: https://codecov.io/github/wooorm/

[npm-install]: https://docs.npmjs.com/cli/install

[license]: LICENSE

[author]: http://wooorm.com

[retext]: https://github.com/wooorm/retext
