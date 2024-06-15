import axios from 'axios'

const apiKey = import.meta.env.VITE_API_KEY;

if (!apiKey) {
    console.error('API key is missing');
}

const openai = axios.create({
    baseURL: 'https://api.openai.com/v1',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    }
  });

  export const fetchGPT4Response = async (prompt) => {
    try {
      const response = await openai.post('/chat/completions', {
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 150,
      });
  
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Error fetching GPT-4 response:', error);
      throw error;
    }
  };