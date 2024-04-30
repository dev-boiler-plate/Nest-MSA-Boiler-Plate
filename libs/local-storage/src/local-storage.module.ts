import { Module, Provider } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { RequestIdStorageToken } from '@app/local-storage/async-local-storage.type';

const providers: Provider[] = [
  {
    provide: RequestIdStorageToken,
    useValue: new AsyncLocalStorage(),
  },
];

@Module({
  providers: [...providers],
  exports: [...providers],
})
export class LocalStorageModule {}
