# Resolver

Provides a simple `Promise` resolver

# Installation

```
npm install @rocicorp/resolver
```

# Usage

`resolver` returns a triplet of `promise`, `resolve` and `reject` functions.

```ts
import {resolver} from '@rocicorp/resolver';

const {promise, resolve} = resolver<number>();
resolve(42);
await promise; // 42
```

`reject` can be used to reject the promise.

```ts
import {resolver} from '@rocicorp/resolver';

const {promise, resolve, reject} = resolver<number, string>();
reject('fail');
try {
  await promise;
  // unreachable
} catch (e) {
  assert(e === 'fail');
}
```
