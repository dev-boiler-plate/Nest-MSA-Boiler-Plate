import { EventsHandler } from '@nestjs/cqrs';
import { applyDecorators, SetMetadata } from '@nestjs/common';
import { IEvent } from '@nestjs/cqrs/dist';

export const CUSTOM_EVENT_HANDLER = Symbol('CUSTOM_EVENT_HANDLER');

export const CustomEventsHandler = (...eventType: IEvent[]) =>
  applyDecorators(SetMetadata(CUSTOM_EVENT_HANDLER, true), EventsHandler(...eventType));
