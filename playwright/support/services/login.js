export const loginService = (request) => {

    const auth = async (user) => {
        return await request.post('/api/auth/login', {
            data: {
                email: user.email,
                password: user.password
            }
        })
    }

    return {
        auth
    }
}