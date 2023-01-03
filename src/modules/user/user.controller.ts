import { Request, Response, NextFunction } from 'express';

import {
  createUser,
  deleteUser,
  getUserByEmail,
  getUserByID,
  getUsers,
  updateUser,
} from './user.services';

export async function listUserHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await getUsers();
    return res.status(200).json(users);
  } catch (e: any) {
    return next(e);
  }
}

export async function createUserHandler(req: Request, res: Response, next: NextFunction) {
  const data = req.body;
  try {
    const user = await createUser(data);
    return res.status(201).json(user);
  } catch (e: any) {
    return next(e);
  }
}

export async function getUserHandler(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  try {
    const user = await getUserByID(id);
    if (!user) {
      res.status(404).json({ msg: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (e: any) {
    return next(e);
  }
}

export async function updateUserHandler(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const data = req.body;

  try {
    const user = await getUserByID(id);
    if (!user) {
      res.status(404).json({ msg: 'User not found' });
    }
    const updatedUser = await updateUser({ _id: id }, data);
    return res.status(200).json(updatedUser);
  } catch (e: any) {
    return next(e);
  }
}

export async function deleteUserHandler(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  try {
    const query = { _id: id };
    const user = await deleteUser(query);
    if (!user) {
      res.status(404).json({ msg: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (e: any) {
    return next(e);
  }
}

export async function authenticateUserHandler(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    const validPassword = await user.comparePassword(password);
    return res.status(200).json({ user, validPassword });
  } catch (e: any) {
    return next(e);
  }
}
