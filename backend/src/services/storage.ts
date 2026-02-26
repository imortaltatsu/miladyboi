import type { GenerateResponse } from 'shared'

// In-memory storage (MVP)
// TODO: Replace with PostgreSQL/Redis for production
class StorageService {
  private generations: Map<string, GenerateResponse> = new Map()
  private userHistory: Map<string, string[]> = new Map() // address -> generation IDs

  saveGeneration(generation: GenerateResponse): void {
    this.generations.set(generation.id, generation)

    const userGens = this.userHistory.get(generation.userAddress) || []
    userGens.unshift(generation.id)
    this.userHistory.set(generation.userAddress, userGens)
  }

  getGeneration(id: string): GenerateResponse | undefined {
    return this.generations.get(id)
  }

  getUserHistory(address: string, limit = 20): GenerateResponse[] {
    const genIds = this.userHistory.get(address.toLowerCase()) || []
    return genIds
      .slice(0, limit)
      .map(id => this.generations.get(id))
      .filter(Boolean) as GenerateResponse[]
  }

  getAllGenerations(limit = 50): GenerateResponse[] {
    return Array.from(this.generations.values())
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, limit)
  }
}

export const storage = new StorageService()
