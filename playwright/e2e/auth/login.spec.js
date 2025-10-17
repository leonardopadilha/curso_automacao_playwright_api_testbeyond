import { test, expect } from '@playwright/test'
import { getUser } from '../../support/factories/user';
import { authService } from '../../support/services/auth';
import { isValidJWT, isValidPostgresId } from '../../support/functions/validInformations';

test.describe('POST /auth/login', () => {
    let auth
    let user

    test.beforeEach(({ request }) => {
        auth = authService(request)
        user = getUser()
    })

    test('deve fazer login com sucesso', async () => {
        const responseBody = await auth.createUser(user)
        expect(responseBody.status()).toBe(201)

        const response = await auth.login(user)
        expect(response.status()).toBe(200)

        const body = await response.json()
        expect(body).toHaveProperty('message', 'Login realizado com sucesso')
        expect(body.data.user).toHaveProperty('name', user.name)
        expect(body.data.user).toHaveProperty('email', user.email)

        expect(body.data).toHaveProperty('token')
        expect(isValidJWT(body.data.token)).toBeTruthy()
        
        expect(body.data.user).toHaveProperty('id')
        expect(isValidPostgresId(body.data.user.id)).toBeTruthy()

        expect(body.data.user).not.toHaveProperty('password')
    })

    test('não deve fazer login com senha incorreta', async () => {
        const responseBody = await auth.createUser(user)
        expect(responseBody.status()).toBe(201)
        
        const response = await auth.login({ ...user, password: 'wrong_password'})
        expect(response.status()).toBe(401)

        const body = await response.json()
        expect(body).toHaveProperty('message', 'Credenciais inválidas')
    })

    test('não deve fazer login com email não cadastrado', async () => {
        const response = await auth.login(user)
        expect(response.status()).toBe(401)

        const body = await response.json()
        expect(body).toHaveProperty('message', 'Credenciais inválidas')
    })

    test('não deve fazer login quando apenas a senha é informada', async () => {
        const response = await auth.login({ ...user, email: ''})
        expect(response.status()).toBe(400)

        const body = await response.json()
        expect(body).toHaveProperty("message", "O campo 'Email' é obrigatório")
    })
})