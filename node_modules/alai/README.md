# alai, AWS Lambda Account ID

[![npm](https://img.shields.io/npm/v/alai.svg)](https://www.npmjs.com/package/alai)
[![license](https://img.shields.io/github/license/sbstjn/alai.svg)](https://github.com/sbstjn/alai/blob/master/LICENSE.md)
[![CircleCI](https://img.shields.io/circleci/project/github/sbstjn/alai/master.svg)](https://circleci.com/gh/sbstjn/alai)


Parse your AWS AccountID in your AWS Lambda function.

```js
module.exports.handler = function(event, context, callback) {
  callback(null,
    {
      accountId: require('alai').parse(context)
    }
  );
};
```

## License

Feel free to use the code, it's released using the [MIT license](https://github.com/sbstjn/alai/blob/master/LICENSE.md).

## Contributors

- [Sebastian Müller](https://sbstjn.com)
