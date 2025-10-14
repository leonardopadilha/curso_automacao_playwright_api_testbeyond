import { test, expect } from '@playwright/test';

test.describe('POST /auth/register', () => {
    test('deve cadastrar um novo usuário', async ({ request }) => {
        const user = {
            name: 'John Doe',
            email: 'john@shortbeyond.com',
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
})