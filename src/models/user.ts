import { observable } from 'mobx';
import type { UserPrincipal } from 'infra-sdk-core';

export interface UserModel {
  current?: UserPrincipal;
}

export const userStore = observable<UserModel>({
  current: undefined,
}, undefined, { deep: false });
