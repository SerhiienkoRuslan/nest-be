import { createParamDecorator, ExecutionContext, HttpStatus } from '@nestjs/common';
// @ts-ignore
import * as jwt from 'jsonwebtoken';

import { SECRET } from '../../config';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();

  // if route is protected, there is a user set in auth.middleware
  if (!!req.user) return !!data ? req.user[data] : req.user;

  // in case a route is not protected, we still want to get the optional auth user from jwt
  const token = req.headers.authorization ? (req.headers.authorization as string).split(' ') : null;

  if (token && token[1]) {
    const decoded: any = jwt.verify(token[1], SECRET);
    return !!data ? decoded[data] : decoded;
  }
});
