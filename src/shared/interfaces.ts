// shared/interfaces.ts → Tipagem do TypeScript.
import { Request } from "express";

export interface IUser {
    id?: number;
    name: string;
    email: string;
    password: string;
}

export interface AuthRequest extends Request {
    user?: { id: number; role: string };
}
