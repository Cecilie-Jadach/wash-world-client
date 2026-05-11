export const fetchUserQuery = async (token: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/profile`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    const data = await response.json()
    return data
}