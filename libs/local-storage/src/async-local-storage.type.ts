import { AsyncLocalStorage } from 'async_hooks';

export type RequestStore = {
  requestId: string;
};

export const RequestIdStorageToken = Symbol('RequestIdStorage');
export type RequestIdStorage = AsyncLocalStorage<RequestStore>;
