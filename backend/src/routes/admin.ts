import { Router } from 'express';
import { store } from '../store/index.js';
import { success, error } from '../lib/response.js';
import { v4 as uuid } from 'uuid';

const router = Router();

/**
 * Admin authentication middleware
 * Uses X-Admin-Secret header or query param ?secret=
 */
function adminAuth(req: any, res: any, next: any) {
  const secret =
    req.headers['x-admin-secret'] ||
    req.query.secret;

  const adminSecret = process.env.ADMIN_SECRET || 'deadwood-admin-2026';

  if (secret !== adminSecret) {
    return error(res, {
      code: 'FORBIDDEN',
      message: 'Invalid admin secret',
      status: 403,
    });
  }
  next();
}

/**
 * POST /api/admin/world-event
 * Bulk modify character states to make the world feel alive
 *
 * Body: {
 *   updates: Array<{
 *     characterName: string,
 *     changes?: Partial<Character>,   // health, reputation, wantedLevel, status, gold, currentRoom, intoxication
 *     kill?: { causeOfDeath: string },
 *     narrative?: string               // optional event narrative
 *   }>,
 *   events?: Array<{
 *     type: string,
 *     room: string,
 *     narrative: string,
 *     involvedCharacters?: string[]
 *   }>,
 *   bounties?: Array<{
 *     targetName: string,
 *     reward: number,
 *     reason: string,
 *     postedBy: string
 *   }>
 * }
 */
router.post('/world-event', adminAuth, async (req, res) => {
  try {
    const { updates = [], events = [], bounties = [] } = req.body;
    const results: any[] = [];
    const tick = store.getTick();

    // Process character updates
    for (const update of updates) {
      const character = store.getCharacterByName(update.characterName);
      if (!character) {
        results.push({
          characterName: update.characterName,
          success: false,
          error: 'Character not found',
        });
        continue;
      }

      if (update.kill) {
        const killed = store.killCharacter(character.id, update.kill.causeOfDeath);
        if (killed && update.narrative) {
          store.createEvent({
            id: uuid(),
            type: 'combat',
            room: killed.currentRoom as any,
            narrative: update.narrative,
            actor: killed.name,
            data: { characters: [killed.name] },
            tick,
            timestamp: Date.now(),
          });
        }
        results.push({
          characterName: update.characterName,
          success: true,
          action: 'killed',
          causeOfDeath: update.kill.causeOfDeath,
        });
      } else if (update.changes) {
        const updated = store.updateCharacter(character.id, update.changes);
        if (updated && update.narrative) {
          store.createEvent({
            id: uuid(),
            type: update.changes.status === 'arrested' ? 'action' : 'combat',
            room: (update.changes.currentRoom || updated.currentRoom) as any,
            narrative: update.narrative,
            actor: updated.name,
            data: { characters: [updated.name] },
            tick,
            timestamp: Date.now(),
          });
        }
        results.push({
          characterName: update.characterName,
          success: true,
          action: 'updated',
          changes: update.changes,
        });
      }
    }

    // Process custom events
    for (const event of events) {
      store.createEvent({
        id: uuid(),
        type: event.type as any,
        room: event.room as any,
        narrative: event.narrative,
        actor: event.involvedCharacters?.[0] || 'World',
        data: { characters: event.involvedCharacters || [] },
        tick,
        timestamp: Date.now(),
      });
    }

    // Process bounties
    for (const bounty of bounties) {
      store.createBounty({
        id: uuid(),
        targetName: bounty.targetName,
        reward: bounty.reward,
        reason: bounty.reason,
        postedBy: bounty.postedBy,
        isActive: true,
        createdAt: Date.now(),
      } as any);
    }

    // Force flush to Redis
    await store.flushToRedis();

    return success(res, {
      data: {
        results,
        eventsCreated: events.length,
        bountiesCreated: bounties.length,
      },
    });
  } catch (err: any) {
    return error(res, {
      code: 'INTERNAL_ERROR',
      message: err.message || 'Failed to process world event',
      status: 500,
    });
  }
});

/**
 * GET /api/admin/characters
 * Get all characters with full details (including IDs)
 */
router.get('/characters', adminAuth, async (req, res) => {
  const characters = store.getAllCharacters();
  return success(res, {
    data: {
      characters: characters.map((c) => ({
        id: c.id,
        name: c.name,
        role: c.role,
        health: c.health,
        reputation: c.reputation,
        wantedLevel: c.wantedLevel,
        gold: c.gold,
        status: c.status,
        currentRoom: c.currentRoom,
        isNpc: c.isNpc,
        intoxication: c.intoxication,
      })),
      total: characters.length,
      living: characters.filter((c) => c.status !== 'dead').length,
      dead: characters.filter((c) => c.status === 'dead').length,
    },
  });
});

/**
 * POST /api/admin/scatter
 * Scatter agents across rooms to make the world look active
 */
router.post('/scatter', adminAuth, async (req, res) => {
  const rooms = ['rusty_spur_saloon', 'street', 'jail'];
  const characters = store.getLivingCharacters().filter((c) => !c.isNpc);
  const results: any[] = [];

  for (const character of characters) {
    const room = rooms[Math.floor(Math.random() * rooms.length)];
    store.updateCharacter(character.id, { currentRoom: room as any });
    results.push({ name: character.name, room });
  }

  await store.flushToRedis();

  return success(res, {
    data: { scattered: results.length, results },
  });
});

export default router;
