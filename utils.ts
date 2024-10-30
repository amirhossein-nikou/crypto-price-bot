export async function getPrice(coin: string): Promise<string> {
    const apiKey: string | undefined = process.env.CRYPTO_API_KEY
    const url = `https://min-api.cryptocompare.com/data/price?fsym=${coin}&tsyms=USD&api_key=${apiKey}`
    const result = await fetch(url)
    const resultBody = await result.json()
    if (result.status !== 200) {
        return 'something went wrong'
    }
    return String(resultBody.USD) + ' USD'
}
