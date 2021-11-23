import type { UserPrincipal } from 'infra-sdk-core';
import type { HttpResponse } from 'infra-sdk-core/lib/request/types';
import { runInAction } from 'mobx';
import React from 'react';
import type { UIModel } from './ui';
import { uiStore } from './ui';
import type { UserModel } from './user';
import { userStore } from './user';

export interface GlobalStore {
  ui: UIModel;
  user: UserModel;
}

type InitData = {
  user?: UserPrincipal;
};

type RemoteFetch = () => Promise<HttpResponse<InitData>>;

const defaultStore: GlobalStore = {
  ui: uiStore,
  user: userStore,
};

export const MobxContext = React.createContext<GlobalStore>(defaultStore);

export const useStores = () => React.useContext(MobxContext);

export const configureStore = (fetchData?: RemoteFetch) => {
  runInAction(() => {
    defaultStore.ui.isLoading = true;
  });
  if (fetchData) {
    fetchData().then(({ response, data }) => {
      if (response.ok) {
        runInAction(() => {
          defaultStore.user.current = data.user;
        });
      }
    });
  }
  return defaultStore;
};
