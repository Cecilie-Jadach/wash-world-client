export const fetchLicensePlatesQuery = async (token: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/license-plates`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    if (!response.ok) throw new Error((await response.json()).error)
    const data = await response.json()
    return data.license_plates 
}