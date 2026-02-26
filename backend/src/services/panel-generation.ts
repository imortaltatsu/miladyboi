import Anthropic from '@anthropic-ai/sdk'
import type { GenerateRequest } from 'shared'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
})

export async function generateMangaPanel(request: GenerateRequest): Promise<string> {
  // For MVP, we generate dramatic manga-style narrative text
  // TODO: Integrate with DALL-E/Midjourney for actual image generation

  const stylePrompts = {
    shonen: 'action-packed, intense, heroic',
    seinen: 'mature, gritty, realistic',
    shoujo: 'romantic, emotional, elegant',
    chibi: 'cute, comedic, exaggerated'
  }

  const styleDesc = stylePrompts[request.style || 'shonen' as keyof typeof stylePrompts]

  const prompt = `You are a manga writer creating a single manga panel description.
Transform the following story into a vivid, ${styleDesc} manga panel narration.
Write 2-3 sentences capturing the visual essence, character emotions, and dramatic moment.
Use manga storytelling techniques: sound effects (in caps), emotional beats, dynamic action.

Story: ${request.prompt}

Panel narration:`

  try {
    const message = await anthropic.messages.create({
      model: 'claude-haiku-4',
      max_tokens: 200,
      messages: [{ role: 'user', content: prompt }]
    })

    const text = message.content[0]?.type === 'text' ? message.content[0].text : ''
    return text.trim()
  } catch (err) {
    console.error('AI generation error:', err)
    throw new Error('Failed to generate manga panel')
  }
}
