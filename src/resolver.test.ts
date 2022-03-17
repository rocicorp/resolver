import {expect} from 'chai';
import {resolver} from './resolver.js';

test('Basic resolve', async () => {
  const {promise, resolve} = resolver<number>();

  resolve(123);
  expect(await promise).to.equal(123);
});

test('Basic reject', async () => {
  const {promise, reject} = resolver<number, string>();

  reject('hi');
  let err: unknown;
  try {
    await promise;
  } catch (e) {
    err = e;
  }
  expect(err).to.equal('hi');
});

test.skip('type checking', async () => {
  const {resolve, reject} = resolver<number, string>();

  // @ts-expect-error Argument of type 'boolean' is not assignable to parameter of type 'number'.ts(2345)
  resolve(true);

  // @ts-expect-error Argument of type 'number' is not assignable to parameter of type 'string'.ts(2345)
  reject(42);
});

test.skip('type checking resolved promise', async () => {
  const {promise, resolve} = resolver<boolean>();

  resolve(true);

  // @ts-expect-error Type 'boolean' is not assignable to type 'number'.ts(2322)
  const x: number = await promise;
  x;
});
