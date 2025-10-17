export const linksService = (request) => {
    const createLink = async (link, token) => {
        return await request.post('/api/links', {
            headers: {
                Authorization: `Bearer ${token}` 
            },
            data: link
        })
    }

    return {
        createLink
    }
}