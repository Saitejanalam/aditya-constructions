export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:8001';
  
  try {
    // Forward the multipart form data to the backend
    const response = await fetch(`${backendUrl}/api/projects/${id}/upload-image`, {
      method: 'POST',
      body: req.body,
    });

    const data = await response.json();
    
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
