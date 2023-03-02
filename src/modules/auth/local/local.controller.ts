import { Request, Response, NextFunction } from 'express';

import { getUser } from '../../user/user.services';
import { signToken } from '../auth.services';

/**
 * Returns a user profile and a JWT token signed by the app secret
 * @param req Request Request object
 * @param res Response Response object
 * @returns Promise<Response> Response object
 */
export async function handleLoginUser(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;

  try {
    const user = await getUser({ email });

    if (!user) {
      return res.status(404).json({ message: 'Invalid email or password' });
    }

    const validPassword = await user.comparePassword(password);

    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const payload = user.profile;

    // Generate token JWT
    const token = signToken(payload);

    return res.status(200).json({ profile: user.profile, token });
  } catch (error: any) {
    return next(error);
  }
}

export async function handleValidateUser(req: Request, res: Response, next: NextFunction) {
  const { token } = req.params;

  try {
    const user = await getUser({ passwordResetToken: token });

    if (!user) {
      return res.status(404).json({ message: 'Invalid token' });
    }

    if (Date.now() > Number(user.resetExpires)) {
      return res.status(400).json({ message: 'Token expired' });
    }

    user.isActive = true;
    user.resetToken = undefined;
    user.resetExpires = undefined;

    await user.save();

    const jwt = signToken(user.profile);

    return res.status(200).json({ profile: user.profile, token: jwt });
  } catch (error: any) {
    return next(error);
  }
}
