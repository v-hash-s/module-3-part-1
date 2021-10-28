'use strict';

module.exports.parse = ctx => {
  return ctx.invokedFunctionArn.split(':')[4];
}
