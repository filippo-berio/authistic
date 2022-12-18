import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventInterface } from '../event/event.interface';

@Injectable()
export class EventEmitter {
    constructor(
        private emitter: EventEmitter2,
        private logger: Logger
    ) {
    }

    emit(event: EventInterface) {
        this.logger.log(`EVENT_EMITTED: ${event.getEvent()}, ${JSON.stringify(event)}`);
        this.emitter.emit(event.getEvent(), event);
    }
}
