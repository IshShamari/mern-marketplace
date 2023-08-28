import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import {IUser, IUserLoginRequest, IUserRegisterRequest} from '../models/interfaces';
import {ICustomRequest} from '@shamariishmael/shared';

export const registerUser = async (req: Request<any, any, IUserRegisterRequest>, res: Response) => {
    try {
        // Registration logic
        const { username, email, password, confirmPassword } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(409).json({message: 'User already exists'});
        }

        if (username == undefined || email == undefined || password == undefined || confirmPassword == undefined) {
            return res.status(400).json({message: 'Invalid request'})
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({message: 'Passwords do not match'});
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create a new user
        let newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        newUser = await newUser.save();

        const token = getJWToken(newUser.id, newUser.username);

        res.status(201).json({message: 'User registered successfully', token});
    } catch (err) {
        res.status(500).json({message: 'Server error'})
    }
}

export const loginUser = async (req: Request<any, any, IUserLoginRequest>, res: Response) => {
    try {
        // Login logic
        const { email, password } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({email});
        if (!existingUser) {
            return res.status(404).json({message: 'User does not exist'});
        }

        // Check if password hash matches
        const passwordHashMatch = await bcrypt.compare(password, existingUser.password);

        if (!passwordHashMatch) {
            return res.status(401).json({message: 'Unauthorized'});
        }

        const token = getJWToken(existingUser.id, existingUser.username);

        res.status(200).json({message: 'User logged in successfully', token: token});

    } catch (err) {
        res.status(500).json({message: 'Server error 3'})
    }
}

export const getMe = async (req: ICustomRequest, res: Response) => {
    try {
        // getMe logic
        const userId = req.userId;

        if (!userId) {
            return res.status(400).json({message: 'Invalid request'});
        }

        // Fetch user details from database
        const user = await User.findById(userId).select('-password'); // Ensure password is not returned

        if (!user) {
            return res.status(404).json({message: 'User does not exist'});
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({message: 'Server error 4'});
    }
}

const getJWToken = (id: string, username: string) => {
    const payload = {
        id,
        username
    };

    const JWT_SECRET: Secret = process.env.JWT_SECRET ?? '';

    const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn: '1h' // token will expire in 1 hour
    });

    return token;
}