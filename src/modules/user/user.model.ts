import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

import { userProfileType, paymentType } from './user.types';
import { Role } from '../auth/auth.types';

export interface UserDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string; // 1234 -> hash - SHA256 -> 64 chars -> 32 bytes ->
  avatar?: string;
  role: Role;
  isActive: boolean;
  resetToken?: string;
  resetExpires?: Date;
  payment?: paymentType;
  createdAt: Date;
  updatedAt: Date;

  fullName: string;
  profile: userProfileType;
  // eslint-disable-next-line no-unused-vars
  comparePassword: (password: string) => Promise<boolean>;
}

const Payment = new Schema({
  customerId: String,
  cards: [
    {
      paymentMethodId: String,
      brand: String,
      country: String,
      expMonth: Number,
      expYear: Number,
      funding: String,
      last4: String,
    },
  ],
});

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  avatar: {
    type: String,
    default: '',
  },
  role: {
    type: String,
    enum: ['ADMIN', 'INSTRUCTOR', 'MAKER'],
    default: 'MAKER',
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  resetToken: String,
  resetExpires: Date,
  payment: Payment,
}, {
  timestamps: true,
  versionKey: false,
});

// Middlewares
UserSchema.pre<UserDocument>('save', async function save(next: Function) {
  const user = this;

  try {
    if (!this.isModified('password')) {
      next();
    }

    if (user.password) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);

      user.password = hash;
    }
  } catch (error: any) {
    next(error);
  }
});

// Virtuals
UserSchema.virtual('fullName').get(function fullName() {
  const { firstName, lastName } = this;

  return `${firstName} ${lastName}`;
});

UserSchema.virtual('profile').get(function profile() {
  const {
    firstName, lastName, email, avatar, role,
  } = this;

  return {
    firstName,
    lastName,
    email,
    avatar,
    role,
  };
});

// Methods
async function comparePassword(this: UserDocument, candidatePassword: string, next: Function) {
  const user = this;

  try {
    if (user.password) {
      const isMatch = await bcrypt.compare(candidatePassword, user.password);

      return isMatch;
    }

    return false;
  } catch (error) {
    next(error);
    return false;
  }
}

UserSchema.methods.comparePassword = comparePassword;

const User = model<UserDocument>('User', UserSchema);

export default User;
