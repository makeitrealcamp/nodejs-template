import { Request } from 'express';

import { UserDocument } from '../user/user.model';

export interface AuthRequest extends Request {
  user?: UserDocument;
}

export type Role = 'ADMIN' | 'INSTRUCTOR' | 'MAKER';

export type Roles = Role[];
