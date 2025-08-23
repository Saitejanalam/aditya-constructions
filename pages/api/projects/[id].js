export default async function handler(req, res) {
  const { id } = req.query;
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:8001';
  
  try {
    const response = await fetch(`${backendUrl}/api/projects/${id}`, {
      method: req.method,
      headers: {
        'Content-Type': req.headers['content-type'] || 'application/json',
      },
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.json();
    
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
