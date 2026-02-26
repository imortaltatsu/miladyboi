const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export async function generatePanel(prompt: string, txHash: string, style?: string) {
  const res = await fetch(`${API_URL}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, txHash, style }),
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.error || 'Generation failed')
  }

  return res.json()
}

export async function getUserHistory(address: string) {
  const res = await fetch(`${API_URL}/api/history/${address}`)
  if (!res.ok) throw new Error('Failed to fetch history')
  return res.json()
}

export async function getGallery(limit = 50) {
  const res = await fetch(`${API_URL}/api/gallery?limit=${limit}`)
  if (!res.ok) throw new Error('Failed to fetch gallery')
  return res.json()
}
