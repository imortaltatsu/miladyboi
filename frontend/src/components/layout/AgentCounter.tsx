'use client';

import { useAgentCount } from '@/hooks/useAgentCount';
import { useWorldState } from '@/hooks/useWorldState';

function getDayPhaseIcon(phase: string): string {
  switch (phase) {
    case 'morning': return '☀️';
    case 'afternoon': return '🌤️';
    case 'evening': return '🌅';
    case 'night': return '🌙';
    default: return '🕐';
  }
}

export default function AgentCounter() {
  const { agentCount, isConnected } = useAgentCount();
  const { time } = useWorldState();

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50">
      <div className="wood-panel mx-auto max-w-2xl">
        <div className="px-6 py-3 flex items-center justify-between">
          {/* Live indicator */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <span
                className={`w-3 h-3 rounded-full ${
                  isConnected ? 'bg-green-500 animate-pulse-slow glow-gold' : 'bg-red-500'
                }`}
              />
              <span className="font-western text-sm text-parchment">
                {isConnected ? 'LIVE' : 'OFFLINE'}
              </span>
            </div>
          </div>

          {/* World Time */}
          {time && (
            <div className="flex items-center space-x-2 px-4 py-1 bg-wood-dark/50 rounded-lg">
              <span className="text-xl">{getDayPhaseIcon(time.dayPhase)}</span>
              <div className="text-center">
                <div className="font-western text-gold text-sm">{time.inGameTime}</div>
                <div className="text-xs text-parchment/50 capitalize">{time.dayPhase}</div>
              </div>
            </div>
          )}

          {/* $DWOOD Token */}
          <a
            href="https://www.clanker.world/clanker/0xE804Af65994f66A1F9aCB22ffe4e8C00b68E4b07"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-3 py-1 bg-gold/10 rounded-lg hover:bg-gold/20 transition-colors"
          >
            <span className="text-lg">💰</span>
            <div className="text-center">
              <div className="font-western text-gold text-sm">$DWOOD</div>
              <div className="text-xs text-parchment/50">Base</div>
            </div>
          </a>

          {/* Agent count */}
          <div className="flex items-center space-x-3">
            <div className="gold-bar w-8" />
            <div className="text-center">
              <div className="font-western text-2xl text-gold">{agentCount}</div>
              <div className="text-xs text-parchment/60">Agents</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
