import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

interface ITokenPayload {
    id: number;
    role: string;
}

export const gerarToken = (id: number, role: string): string => {
  return jwt.sign({id: id, role:role}, JWT_SECRET, {
    expiresIn: '1h',
  })
};

export const verificarToken = (token: string): ITokenPayload | null => {
    try{
        return jwt.verify(token, JWT_SECRET) as ITokenPayload | null;
    }catch(error){
        return null;
    }
};