import type { IReactionPublic } from 'mobx';
import { reaction } from 'mobx';
import { DependencyList, Dispatch, SetStateAction, useState } from 'react';
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
  callback: (value: TValue) => void | Promise<void>,
  storeExpression: (r: IReactionPublic) => TValue,
) {
  useEffect(() => {
    const m = callback;
    const dis = reaction(storeExpression, (v) => {
      m(v);
    });
    return dis;
  }, []);
}

export function useStoreState<TStore, TKey extends keyof TStore>(store: TStore, key: TKey): [TStore[TKey], Dispatch<TStore[TKey]>] {
  const v = store[key];
  const states = useState(v);
  useStoreEffect((v)=>{
    console.log("value changed", v);
    states[1](v);
  }, ()=>store[key]);

  const setter: Dispatch<TStore[TKey]> = (v)=>{
    store[key] = v
  };

  return [v, setter]
}
