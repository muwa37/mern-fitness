import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { createError } from '../error.js';
import User from '../models/User.js';

dotenv.config();

export const UserRegister = async (req, res, next) => {
  try {
    const { email, password, name, img } = req.body;

    const isUserExist = await User.findOne({ email }).exec();

    if (isUserExist) {
      return next(createError(409, 'email already in use'));
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      img,
    });
    const createdUser = await user.save();
    const token = jwt.sign({ id: createdUser._id }, process.env.JWT, {
      expiresIn: '1 year',
    });
    return res.status(200).json({ token, user });
  } catch (error) {
    return next(error);
  }
};
