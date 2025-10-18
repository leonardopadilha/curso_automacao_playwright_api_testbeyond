export const linksService = (request) => {
    const createLink = async (link, token) => {
        return await request.post('/api/links', {
            headers: {
                Authorization: `Bearer ${token}` 
            },
            data: link
        })
    }

    const getLinks = async (token) => {
        return await request.get('/api/links', {
            headers: {
                Authorization: `Bearer ${token}`	
            }
        })
    }

    return {
        createLink,
        getLinks
    }
}