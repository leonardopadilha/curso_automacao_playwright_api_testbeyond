import { test, expect } from "@playwright/test"
import { authService } from "../../support/services/auth"

test.describe('POST /api/links', () => {
    test('deve encurtar um novo link', async ({ request }) => {

        const auth = authService(request)

        const user = {
            name: 'Leonardo Padilha',
            email: 'leonardo@email.com',
            password: 'pwd123',
            link: {
                original_url: 'https://www.youtube.com/watch?v=KwX1f2gYKZ4&list=RDKwX1f2gYKZ4&start_radio=1',
                title: 'Graves Into Gardens'
            }
        }
        const token = await auth.getToken(user)

        const response = await request.post('http://localhost:3333/api/links', {
            headers: {
                Authorization: `Bearer ${token}` 
            },
            data: user.link
        })

        expect(response.status()).toBe(201)
    })
})