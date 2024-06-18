import axios from 'axios';

const API_KEY = "KM3PTTHZNI45GUWJ";

export const alphaVantageGlobalQuote = async (symbol: string) => {
  try {
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
      // `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=demo`
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar os dados da API:", error);
    return null;
  }
};

