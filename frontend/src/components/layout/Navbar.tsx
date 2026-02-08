'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: '/spectate', label: 'Spectate', icon: '👁️' },
    { href: '/characters', label: 'Characters', icon: '🤠' },
    { href: '/leaderboard', label: 'Leaderboard', icon: '🏆' },
    { href: '/graveyard', label: 'Graveyard', icon: '⚰️' },
  ];

  return (
    <nav className="wood-panel mx-4 mt-4 relative">
      {/* Corner decorations */}
      <div className="corner-decor tl" />
      <div className="corner-decor tr" />

      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="text-4xl">🤠</div>
            <div>
              <span className="font-western text-3xl text-gold block leading-none">
                Deadwood
              </span>
              <span className="text-xs text-parchment/60 font-fell italic">
                Est. 1878
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`western-btn text-sm flex items-center space-x-2 ${
                  pathname === link.href ? 'western-btn-gold' : ''
                }`}
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}

            {/* $DWOOD Token Link */}
            <a
              href="https://www.clanker.world/clanker/0xE804Af65994f66A1F9aCB22ffe4e8C00b68E4b07"
              target="_blank"
              rel="noopener noreferrer"
              className="western-btn text-sm flex items-center space-x-2 bg-gold/10 border-gold/40 hover:bg-gold/20"
            >
              <span>💰</span>
              <span>$DWOOD</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
