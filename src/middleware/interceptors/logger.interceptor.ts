import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { catchError, EMPTY, Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RequestInterface } from '../request.interface';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
    constructor(
        private logger: Logger
    ) {
    }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request: RequestInterface = context.switchToHttp().getRequest();
        this.logger.log('BODY ' + JSON.stringify(request.body));

        return next
            .handle()
            .pipe(
                tap(response => {
                    this.logger.log('RESPONSE ' + JSON.stringify(response))
                }),
                catchError(err => {
                    this.logger.error('ERROR ' + JSON.stringify(err.response));
                    return throwError(err);
                })
            );
    }
}
