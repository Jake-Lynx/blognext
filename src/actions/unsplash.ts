'use server'

export const generateUnsplashImage = async (prompt: string) => {
    try {
        const response = await fetch(`
            https://api.unsplash.com/photos/random?query=${prompt}&client_id=${process.env.UNSPLASH_API_KEY}
        `)

        const data = await response.json()
        return data.urls.regular
    } catch (error: any) {
        throw new Error(error as string);        
    }
}