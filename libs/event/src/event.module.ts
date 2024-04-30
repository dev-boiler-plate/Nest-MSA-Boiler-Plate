import { Inject, Logger, Module, OnModuleInit } from '@nestjs/common';
import { DiscoveryModule, DiscoveryService, Reflector } from '@nestjs/core';
import { EventBus, IEventHandler } from '@nestjs/cqrs';
import { CUSTOM_EVENT_HANDLER } from '@app/event/event.handler';
import { ClassType } from '@app/util/type.util';
import { EventType } from '@app/event/event.type';
import { RequestIdStorage, RequestIdStorageToken } from '@app/local-storage/async-local-storage.type';

@Module({
  imports: [DiscoveryModule],
  providers: [EventBus],
  exports: [EventBus],
})
export class EventModule implements OnModuleInit {
  constructor(
    private readonly logger: Logger,
    private readonly discovery: DiscoveryService,
    private readonly reflector: Reflector,
    @Inject(RequestIdStorageToken)
    private readonly requestIdAls: RequestIdStorage,
  ) {}

  onModuleInit(): any {
    this.discovery
      .getProviders()
      .filter((wrapper) => wrapper.isDependencyTreeStatic())
      .filter(({ metatype, instance }) => {
        if (!instance || !metatype) {
          return false;
        }

        return this.reflector.get<boolean>(CUSTOM_EVENT_HANDLER, metatype);
      })
      .forEach(({ metatype }) => {
        this.wrap(metatype as ClassType<IEventHandler>);
      });
  }

  private wrap(handlerClass: ClassType<IEventHandler>) {
    const originFunction = handlerClass.prototype.handle;
    const _this = this;

    handlerClass.prototype.handle = async function (event: EventType) {
      const className = handlerClass.name;
      const eventName = event.constructor.name;

      await _this.requestIdAls.run(
        {
          requestId: event._requestId,
        },
        async () => {
          try {
            await originFunction.call(this, event);
          } catch (e: any) {
            _this.logger.warn(`[${eventName}].[${className}] ${e}`);
          }
        },
      );
    };
  }
}
