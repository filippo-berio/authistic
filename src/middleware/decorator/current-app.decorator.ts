import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestInterface } from '../request.interface';

export const CurrentApp = createParamDecorator((_, ctx: ExecutionContext) => {
    const request: RequestInterface = ctx.switchToHttp().getRequest();
    return request.app;
});
