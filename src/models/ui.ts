import { observable } from 'mobx';
import type { ApplicationError } from 'infra-sdk-core';

export interface UIModel {
  isLoading: boolean;
  error?: ApplicationError;
}

export const uiStore = observable<UIModel>({
  error: undefined,
  isLoading: false,
}, undefined, { deep: false});
