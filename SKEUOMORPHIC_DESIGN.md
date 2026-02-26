# PanelForge - Skeuomorphic Design Documentation

## 🎨 Design Philosophy

**Skeuomorphism meets Cyberpunk Manga**

This design combines tactile, physical UI elements with futuristic manga aesthetics. Every surface has depth, texture, and realistic lighting—creating an interface that feels like you could reach out and touch it.

## 🌟 Key Design Elements

### 1. **Three.js Interactive 3D Manga Panels**
- Floating manga book with 3 panels
- Mouse-following rotation (lerped for smooth movement)
- Realistic lighting with spotlight and point lights
- Distorted material effects for manga energy
- Cast shadows for depth

### 2. **Skeuomorphic Material Library**

#### **Leather Texture** (`.leather`)
- Stitched pattern overlay
- Dark brown gradient (#2a1810 → #3d2414)
- Subtle highlights for worn effect
- Used for: tech badges, accents

#### **Paper Texture** (`.paper`)
- Fibrous grid pattern
- Cream to off-white gradient (#f5f5dc → #faf8f0)
- Inset highlights for realistic paper feel
- Used for: manga panel backgrounds, text areas

#### **Metallic Surface** (`.metallic`)
- Chrome-like gradient sweep
- Animated shimmer effect
- Silver tones with white highlights
- Used for: dividers, accents

#### **Glass/Crystal** (`.glass-skeuo`, `.btn-crystal`)
- Frosted glass with backdrop blur
- Multi-layer borders (inner glow + outer shadow)
- Transparent with subtle gradients
- Used for: cards, secondary buttons

### 3. **Button Hierarchy**

#### **Primary: Embossed Button** (`.btn-embossed`)
```
Appearance: Raised, beveled, glossy
Colors: Magenta gradient (#E91E63 → #C2185B)
Shadows: 
  - Inset highlight (top)
  - Inset shadow (bottom)
  - Outer glow (magenta)
  - Drop shadow
States:
  - Hover: Lifts up (-2px translate)
  - Active: Pressed in (reversed shadows)
```

#### **Secondary: Crystal Button** (`.btn-crystal`)
```
Appearance: Translucent, glass-like
Colors: White with low opacity
Shadows: Cyan glow (#00BCD4)
States:
  - Hover: Brighter, lifts up (-3px)
  - Glow intensifies
```

### 4. **Typography System**

**Display (Headings):**
- Font: Bebas Neue
- Treatment: Embossed with gradient fill
- Shadow: Multi-layer (highlight + shadow + glow)
- Use: Main titles, section headers

**Serif (Subheadings):**
- Font: Playfair Display
- Weight: 700-900
- Use: Taglines, feature titles

**Body (Content):**
- Font: Crimson Text
- Treatment: Clean, readable
- Use: Descriptions, paragraphs

### 5. **Depth & Shadow System**

**Shallow Depth** (UI elements):
```css
box-shadow: 
  0 2px 4px rgba(0,0,0,0.2),
  inset 0 1px 0 rgba(255,255,255,0.3)
```

**Medium Depth** (cards):
```css
box-shadow:
  0 8px 16px rgba(0,0,0,0.4),
  0 16px 32px rgba(0,0,0,0.3),
  inset 0 1px 0 rgba(255,255,255,0.3)
```

**Deep Depth** (hero elements):
```css
box-shadow:
  0 8px 16px rgba(0,0,0,0.4),
  0 16px 32px rgba(0,0,0,0.3),
  0 24px 48px rgba(0,0,0,0.2)
```

### 6. **Color Palette**

**Primary:**
- Magenta: #E91E63 (CTAs, accents)
- Purple: #9C27B0 (gradients)

**Secondary:**
- Cyan: #00BCD4 (highlights, tech)
- Blue: #3B82F6 (info elements)

**Neutral:**
- Leather Dark: #2a1810
- Leather Medium: #3d2414
- Paper Cream: #f5f5dc
- Paper White: #faf8f0

**Background:**
- Base: #1a1a2e (deep space blue)
- Gradient: #0f0f1e → #1a1a2e

### 7. **Atmospheric Effects**

**Gradient Mesh:**
```css
radial-gradient(ellipse at 20% 20%, rgba(156,39,176,0.15))
radial-gradient(ellipse at 80% 80%, rgba(233,30,99,0.15))
```

**Leather Overlay:**
- 10% opacity over backgrounds
- Adds texture without overwhelming

**Glossy Shine:**
- Animated diagonal highlight sweep
- 4s infinite loop
- Subtle (10% white opacity)

## 📐 Layout Principles

1. **Generous Spacing**: 24px base unit
2. **Rounded Corners**: 16-24px for softness
3. **Asymmetric Composition**: 3D element off-center
4. **Layered Depth**: Multiple z-index levels
5. **Visual Hierarchy**: Size + depth + color

## 🎯 Interactive States

**Hover:**
- Translate up (-2 to -3px)
- Increase shadow depth
- Brighten colors slightly
- Smooth transitions (0.2-0.3s)

**Active/Pressed:**
- Translate down (0px)
- Reverse shadows (inset)
- Darken colors

**Focus:**
- Colored outline (2px)
- Glow effect matching accent

## 🔧 Technical Implementation

**Three.js Setup:**
```tsx
<Canvas
  shadows
  camera={{ position: [0, 0, 8], fov: 50 }}
  gl={{ antialias: true, alpha: true }}
>
  <ambientLight intensity={0.5} />
  <spotLight position={[10, 10, 10]} castShadow />
  <pointLight position={[-10, -10, -10]} color="#9C27B0" />
  <MangaBook />
</Canvas>
```

**Mouse Interaction:**
```tsx
useFrame(() => {
  group.rotation.y = THREE.MathUtils.lerp(
    group.rotation.y,
    mouseX * 0.5,
    0.1
  )
})
```

**CSS Custom Properties:**
- All colors as CSS variables
- Reusable shadow utilities
- Animation keyframes

## 🎬 Animations

1. **Float**: Slow up/down (3s ease-in-out infinite)
2. **Shimmer**: Metallic sweep (3s)
3. **Shine**: Glossy highlight (4s)
4. **Hover Lift**: Quick bounce (0.2s cubic-bezier)

## 📱 Responsive Behavior

- **Desktop**: Full 3D canvas (600px height)
- **Tablet**: Scaled canvas (400px height)
- **Mobile**: Static preview or simplified 3D

## 🎨 Design Inspiration

- **Physical**: Leather-bound manga volumes
- **Material**: Paper, metal, glass, crystal
- **Lighting**: Studio photography with dramatic shadows
- **Movement**: Subtle floating, organic rotation
- **Era**: 1990s skeuomorphic + 2020s glass morphism

## ✨ Unique Touches

1. **Stitched leather** on tech badges
2. **Fibrous paper** texture on panels
3. **Chrome sweep** on dividers
4. **Multi-layer shadows** everywhere
5. **Embossed text** with gradient fills
6. **Interactive 3D** as hero element
7. **Glossy highlights** on buttons
8. **Depth-aware** hover states

---

**Result**: A tactile, luxurious interface that feels both premium and playful. Every interaction has weight, every surface has texture, every shadow tells a story of depth.
