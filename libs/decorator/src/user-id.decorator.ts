import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserId = createParamDecorator(async (data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const userId = request.user ? request.user['userId'] : 0;
  return userId;
});
