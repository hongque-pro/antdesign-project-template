import { observable } from 'mobx';
import type { ApplicationError } from 'infra-sdk-core';

export interface UIModel {
  isLoading: boolean;
  error?: ApplicationError;
  routePath: string;
}

export const uiStore = observable<UIModel>({
  error: undefined,
  isLoading: false,
  routePath: window.location.pathname,
});
