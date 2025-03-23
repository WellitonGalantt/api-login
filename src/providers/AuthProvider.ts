import { IUser } from "../shared/interfaces";
import { Knex } from '../database/knex';
import { EncriptionProvider } from "./EncriptionProvider";

// Arquivos onde ficarao os CRUDS do projeto.

export class AuthProvider {

    static async getUser(id: number): Promise<IUser | Error> {
        
        const user = await Knex('users').where('id', id).first();
        if (!user) {
            return Error('Usuário não encontrado.');
        }
        return user;
    }

    static async loginUser(user: Omit<IUser, 'name'>): Promise<number | Error> {

        const existingUser = await Knex('users').where('email', user.email).first();
        if (!existingUser) {
            return Error('Email incorreto, usuário não encontrado.');
        }

        const comparePassword = await EncriptionProvider.comparePassword(user.password, existingUser.password)

        if( !comparePassword ) {
            return Error('Senha incorreta.');
        }

        return existingUser.id;

    }

    static async registerUser(user: IUser): Promise<number | Error> {
        console.log('registerUser:');
        console.log(user);

        const hashedPassword = await EncriptionProvider.encryptPassword(user.password);
        user.password = hashedPassword;
        try {
        
            // Verifica se o e-mail já existe, se ja existir ele rotorna os dados do usuario.
            const existingUser = await Knex('users').where('email', user.email).first();

            console.log('Provider')
            console.log(existingUser)
            if (existingUser) {
                return Error('O e-mail já está registrado.');
            }
            
            const [ idUser ] = await Knex('users').insert(user).returning('id');
            console.log('Sucesso ao criar um usuario!');
            return idUser;
        }
        catch (error) {
            console.error(error);
            return Error('Erro ao tentar criar um usuário!'); // Lance o erro para que o middleware de erro capture e retorne uma resposta de erro.
        }
    }
}