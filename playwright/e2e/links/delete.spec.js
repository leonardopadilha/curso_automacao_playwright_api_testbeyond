import { test, expect } from "../../support/fixtures"
import { getUserWithLink } from "../../support/factories/user"

test.describe('DELETE /api/links/:id', () => {
    test('deve remover um link encurtado', async ({ auth, links }) => {
        const user = getUserWithLink()
        await auth.createUser(user)
        const token = await auth.getToken(user)
        const linkId = await links.createAndReturnLinkId(user.link, token)

        const response = await links.removeLink(linkId, token)
        expect(response.status()).toBe(200)
        
        const body = await response.json()
        expect(body).toHaveProperty('message', 'Link excluído com sucesso')
    })
})