import { test, expect } from "@playwright/test"
import { authService } from "../../support/services/auth"
import { linksService } from "../../support/services/links"
import { getUserWithLink } from "../../support/factories/user"

test.describe('POST /api/links', () => {
    let auth
    let link
    let token

    const user = getUserWithLink()

    test.beforeEach(async ({ request }) => {
        auth = authService(request)
        link = linksService(request)

        await auth.createUser(user)
        token = await auth.getToken(user)
    })

    test('deve encurtar um novo link', async () => {
        const response = await link.createLink(user.link, token)
        expect(response.status()).toBe(201)

        const { data, message } = await response.json()
        expect(data).toHaveProperty('id')
        expect(data).toHaveProperty('original_url', user.link.original_url)
        expect(data.short_code).toMatch(/^[A-Za-z0-9]{5}$/)
        expect(data).toHaveProperty('title', user.link.title)
        expect(message).toBe('Link criado com sucesso')
    })
})