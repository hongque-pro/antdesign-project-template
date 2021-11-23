import type { IReactionPublic } from 'mobx';
import { reaction } from 'mobx';
import type { DependencyList } from 'react';
import { useEffect } from 'react';

export function useEffectAsync(
  callback: () => Promise<void>,
  deps?: DependencyList,
  unsubscription?: () => void,
) {
  useEffect(() => {
    const m = callback;
    m.call(null);
    return unsubscription;
  }, deps ?? []);
}

export function useStoreEffect<TValue>(
  callback: () => void | Promise<void>,
  storeExpression: (r: IReactionPublic) => TValue,
) {
  useEffect(() => {
    const m = callback;
    const dis = reaction(storeExpression, () => {
      m();
    });
    return dis;
  }, []);
}
