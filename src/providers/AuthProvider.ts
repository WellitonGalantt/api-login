import { IUser } from "../shared/interfaces";
import { Knex } from '../database/knex';

// Arquivos onde ficarao os CRUDS do projeto.

export class AuthProvider {

    static async loginUser(user: Omit<IUser, 'name'>): Promise<number | Error> {

        const existingUser = await Knex('users').where('email', user.email).first();
        if (!existingUser) {
            return Error('Usuário não encontrado.');
        }

        if( existingUser.password !== user.password) {
            return Error('Senha incorreta.');
        }

        return existingUser.id;

    }

    static async registerUser(user: IUser): Promise<number | Error> {
        console.log('registerUser:');
        console.log(user);
        try {
        
            // Verifica se o e-mail já existe
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