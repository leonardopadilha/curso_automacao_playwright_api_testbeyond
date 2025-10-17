export const registerService = (request) => {

    const createUser = async (user) => {
        return await request.post('/api/auth/register', {
            data: user
        })
    }

    return {
        createUser
    }
}