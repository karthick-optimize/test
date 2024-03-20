
const WEBHOOK_URL = 'https://webhook.site/c8bac15a-beae-4fc7-93b2-2c13f2dc4eae'; // Replace with your webhook.site URL

export const saveSegment = async (data) => {
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response;
  } catch (error) {
    console.error('Error saving segment:', error);
    throw error;
  }
};
