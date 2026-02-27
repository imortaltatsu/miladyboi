const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mangaapi.miladyboi.fun'

export interface MangaResult {
  // Single page: the image URL (blob URL created from PNG response)
  singleImage?: string
  // Multi page: array of base64 data URIs
  pages?: string[]
}

/**
 * Generate manga panel(s) from a story prompt.
 * - num_pages=1: backend returns raw PNG (image/png)
 * - num_pages>=2: backend returns JSON { pages: ["data:image/png;base64,...", ...] }
 */
export async function generateManga(story: string, numPages: number = 1): Promise<MangaResult> {
  const res = await fetch(`${API_URL}/generate-manga`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ story, num_pages: numPages }),
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => null)
    const msg = errorData?.detail?.[0]?.msg || errorData?.detail || 'Generation failed'
    throw new Error(typeof msg === 'string' ? msg : JSON.stringify(msg))
  }

  if (numPages === 1) {
    // Response is raw PNG — create a blob URL
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    return { singleImage: url }
  } else {
    // Response is JSON with base64 pages
    const data = await res.json()
    return { pages: data.pages }
  }
}

export async function checkHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/health`)
    return res.ok
  } catch {
    return false
  }
}
