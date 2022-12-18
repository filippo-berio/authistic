import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { RequestInterface } from '../request.interface';
import { PasswordEncoder } from '../../service/password.encoder';

@Injectable()
export class EncodePasswordInterceptor implements NestInterceptor {
    constructor(
        private passwordEncoder: PasswordEncoder
    ) {
    }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        const request: RequestInterface = context.switchToHttp().getRequest();
        request.body.password = this.passwordEncoder.encode(request.body.password, request.app.getApiKey());
        return next.handle();
    }
}
