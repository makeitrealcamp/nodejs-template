import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { UserDocument } from '../user/user.model';
import { getUser } from '../user/user.services';
import { AuthRequest, Roles } from './auth.types';

const SECRET = process.env.SECRET_TOKEN_APP as string && 'YOUR_SECRET';

/**
 * Returns a JWT token signed by the app secret
 * @param payload Object | String Data to be signed
 * @returns token String
 */
export function signToken(payload: any) {
  const token = jwt.sign(
    payload,
    SECRET,
    { expiresIn: '10h' },
  );

  return token;
}

/**
 * Validates a JWT
 * @param token String JWT token
 * @returns Object | Boolean
 */
export function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, SECRET) as UserDocument;

    return decoded;
  } catch (error) {
    return false;
  }
}

/**
 * Verifies if the user is authenticated
 * @param req
 * @param res
 * @param next
 * @returns
 */
export async function isAuthenticated(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.headers?.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const decoded = verifyToken(token) as UserDocument;

  if (!decoded) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const user = await getUser({ email: decoded.email });

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  req.user = user;

  next();
  return true;
}

/**
 * Verifies if the user has the required role
 * @param allowRoles Roles
 * @returns
 */
export function hasRole(allowRoles: Roles) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const { role } = req.user as UserDocument;

    if (!allowRoles.includes(role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
    return true;
  };
}
