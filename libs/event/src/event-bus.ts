import { Inject, Injectable, Logger } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { EventType } from '@app/event/event.type';
import { ClassType } from '@app/util';
import { RequestIdStorage, RequestIdStorageToken } from '@app/local-storage/async-local-storage.type';

@Injectable()
export class CustomEventBus {
  constructor(
    private readonly eventBus: EventBus,
    private readonly logger: Logger,
    @Inject(RequestIdStorageToken)
    private readonly requestIdStorage: RequestIdStorage,
  ) {}

  publish<T extends EventType>(eventClass: ClassType<T>, value: Omit<T, keyof EventType>): any {
    const defaultValue: EventType = {
      publishedDate: new Date(),
      _requestId: this.requestIdStorage.getStore()?.requestId || '',
    };

    const event: T = Object.assign(new eventClass(), defaultValue, value);

    const runEvent = () => {
      this.eventBus.publish(event);
      this.logger.debug(`[EVENT PUBLISHED] ${eventClass.name}`);
    };

    // TODO : Transaction에 대한 예외처리 필요
    // if (MysqlUtil.isInTransactional()) {
    //   MysqlUtil.runOnCommit(runEvent);
    //   return;
    // }

    runEvent();
  }
}
