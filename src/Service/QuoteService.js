import axios from "axios"

export class QuoteService {
    getQuotes = () => {
        return axios({
            url: "http://quotes.stormconsultancy.co.uk/quotes.json",
            method: 'GET',
        })
    }
}

export const randomQuoteService = new QuoteService();