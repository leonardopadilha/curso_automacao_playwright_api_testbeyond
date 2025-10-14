import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('POST /auth/register', () => {
    test('deve cadastrar um novo usuário', async ({ request }) => {
        const firstName = faker.person.firstName()
        const lastName = faker.person.lastName()

        const user = {
            name: `${firstName} ${lastName}`,
            email: faker.internet.email({ firstName, lastName }).toLowerCase(),
            password: 'pwd123'
        }

       const response =  await request.post('http://localhost:3333/api/auth/register', {
        data: user
       })
       expect(response.status()).toBe(201)

       const responseBody = await response.json()
       expect(responseBody.message).toBe('Usuário cadastrado com sucesso!')
       expect(responseBody.user.id).not.toBeNull()
       expect(responseBody.user.name).toBe(user.name)
       expect(responseBody.user.email).toBe(user.email)
       expect(responseBody.user).not.toHaveProperty('password')
    })

    test('não deve cadastrar quando o email já estiver em uso', async ({ request }) => {
        const firstName = faker.person.firstName()
        const lastName = faker.person.lastName()

        const user = {
            name: `${firstName} ${lastName}`,
            email: faker.internet.email({ firstName, lastName }).toLowerCase(),
            password: 'pwd123'
        }

       const preCondition =  await request.post('http://localhost:3333/api/auth/register', {
        data: user
       })
       expect(preCondition.status()).toBe(201)

       const response =  await request.post('http://localhost:3333/api/auth/register', {
        data: user
       })
       expect(response.status()).toBe(400)

       const responseBody = await response.json()
       expect(responseBody.message).toBe('Este e-mail já está em uso. Por favor, tente outro.')
    })

    test('não deve cadastrar quando o email estiver com formato inválido', async ({ request }) => {
        const user = {
            name: `Leonardo Padilha`,
            email: `leonardo*email.com`,
            password: 'pwd123'
        }

       const response =  await request.post('http://localhost:3333/api/auth/register', {
        data: user
       })
       expect(response.status()).toBe(400)

       const responseBody = await response.json()
       expect(responseBody).toHaveProperty("message", "O campo 'Email' deve ser um email válido")
    })
})