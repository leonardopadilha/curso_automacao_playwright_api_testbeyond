import { test, expect } from "../../support/fixtures"
import { getUserWithLink } from "../../support/factories/user"
import { generateULID } from "../../support/functions/utils"

test.describe('DELETE /api/links/:id', () => {
    let token
    const user = getUserWithLink()

    test.beforeEach(async ({ auth }) => {
        await auth.createUser(user)
        token = await auth.getToken(user)
    })

    test('deve remover um link encurtado', async ({ links }) => {
        const linkId = await links.createAndReturnLinkId(user.link, token)

        const response = await links.removeLink(linkId, token)
        expect(response.status()).toBe(200)
        
        const body = await response.json()
        expect(body).toHaveProperty('message', 'Link excluído com sucesso')
    })

    test('não deve remover quando o id não existe', async ({ links }) => {      
        const response = await links.removeLink(generateULID(), token)
        expect(response.status()).toBe(404)
        
        const body = await response.json()
        expect(body).toHaveProperty('message', 'Link não encontrado')
    })
})