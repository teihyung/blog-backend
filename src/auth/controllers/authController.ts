import {NextFunction, Request, Response} from 'express';
import {supabase} from "../../db";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'defaultsecret';

interface User {
  id: string;
  email: string;
  password: string;
}

export const signup = async (req: Request, res: Response): Promise<void> => {
  const {email, password, username} = req.body;

  const {data: existingUser} = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

  console.log(`Existing user: ${existingUser}`);
  // console.log(`Fetch error: ${fetchError}`);

  if (existingUser) {
    res.status(400).json({error: 'Email already taken'});
    return;
  }

  // bcrypt password before storing
  const hashedPassword = await bcrypt.hash(password, 10);



  const {data, error} = await supabase
      .from('users')
      .insert([{email, password: hashedPassword, username}])
      .single();

  if (error) {
    res.status(500).json({error: error.message});
    return;
  }

  res.status(201).json({message: 'User created successfully', data});
};

export const signin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {email, password} = req.body;

  try {
    const {data, error} = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

    const user = data as User | null;

    if (error || !user) {
      res.status(400).json({error: 'Invalid credentials'});
      return;
    }

    if (!(await bcrypt.compare(password, user.password))) {
      res.status(400).json({error: 'Incorrect password'});
      return;
    }

    const token = jwt.sign({userId: user.id}, JWT_SECRET, {expiresIn: '1h'});

    res.status(200).json({message: 'Login successful', token});
  } catch (err) {
    next(err);
  }
};

export const editUserInfo = async (req: Request, res: Response): Promise<void> => {
  const {userId} = req.body;
  const {username, email, password} = req.body;

  const {data, error} = await supabase
      .from('users')
      .update({username, email, password})
      .eq('id', userId)
      .single();

  if (error) {
    res.status(500).json({error: error.message});
    return;
  }

  res.status(200).json({message: 'User updated successfully', data});
};
