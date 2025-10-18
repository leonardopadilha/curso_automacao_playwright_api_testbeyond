import { test, expect } from '@playwright/test';
import { getUser } from '../../support/factories/user';
import { registerService } from '../../support/services/register';

test.describe('POST /auth/register', () => {

    let user
    let register

    test.beforeEach(({ request }) => {
        user = getUser()
        register = registerService(request)
    })

    test('deve cadastrar um novo usuário', async () => {

        const response = await register.createUser(user)
        expect(response.status()).toBe(201)

        const responseBody = await response.json()
        expect(responseBody.message).toBe('Usuário cadastrado com sucesso!')
        expect(responseBody.user.id).not.toBeNull()
        expect(responseBody.user.name).toBe(user.name)
        expect(responseBody.user.email).toBe(user.email)
        expect(responseBody.user).not.toHaveProperty('password')
    })

    test('não deve cadastrar quando o email já estiver em uso', async () => {
        const preCondition = await register.createUser(user)
        expect(preCondition.status()).toBe(201)

        const response = await register.createUser(user)
        expect(response.status()).toBe(400)

        const responseBody = await response.json()
        expect(responseBody.message).toBe('Este e-mail já está em uso. Por favor, tente outro.')
    })

    test('não deve cadastrar quando o email estiver com formato inválido', async () => {
        const invalidUser = { ...user, email: 'leonardo*email.com'}
        const response = await register.createUser(invalidUser)
        expect(response.status()).toBe(400)

        const responseBody = await response.json()
        expect(responseBody).toHaveProperty("message", "O campo 'Email' deve ser um email válido")
    })

    test('não deve cadastrar quando o campo nome não é informado', async () => {
        delete user.name

        const response = await register.createUser(user)
        expect(response.status()).toBe(400)

        const responseBody = await response.json()
        expect(responseBody).toHaveProperty("message", "O campo 'Name' é obrigatório")
    })

    test('não deve cadastrar quando o campo email não é informado', async () => {
        delete user.email

        const response = await register.createUser(user)
        expect(response.status()).toBe(400)

        const responseBody = await response.json()
        expect(responseBody).toHaveProperty("message", "O campo 'Email' é obrigatório")
    })

    test('não deve cadastrar quando o campo senha não é informado', async () => {
        delete user.password

        const response = await register.createUser(user)
        expect(response.status()).toBe(400)

        const responseBody = await response.json()
        expect(responseBody).toHaveProperty("message", "O campo 'Password' é obrigatório")
    })
})