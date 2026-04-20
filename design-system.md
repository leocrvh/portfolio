# Design System — Portfolio Léo Carvalho

## Positionnement
- **Persona**: Apprenti automaticien, profil TECH professionnel
- **Style mix**: Glassmorphism moderne + Soft UI Evolution + touches Neubrutalism (contrastes, bordures nettes)

## Tokens principaux
- Voir `css/tokens.css`
- Typographies: **Space Grotesk** (display), **Inter** (body)
- Contrastes calibrés pour WCAG AA (texte principal/fond)

## Architecture CSS
- `css/tokens.css`: variables, palettes, typography
- `css/main.css`: base, layout, navigation, accessibilité, progress bar
- `css/components.css`: boutons, cards, timeline, bento, formulaires, lightbox
- `css/animations.css`: keyframes, reveals, reduced-motion
- `css/responsive.css`: breakpoints 375 / 768 / 1024 / 1440+

## Architecture JS
- `js/core.js`: thème persistant, anti-flash, nav sticky, menu mobile, scroll progress
- `js/animations.js`: reveal on scroll, compteurs, parallax hero
- `js/interactions.js`: filtrage projets, lightbox, boutons magnétiques
- `js/performance.js`: lazy loading renforcé, envoi asynchrone formulaire

## Principes UX appliqués
- Focus states visibles clavier
- `prefers-reduced-motion` respecté
- Dark mode persisté (localStorage)
- Micro-interactions 150–300ms
- Clic/hover explicites sur éléments interactifs

## SEO technique
- JSON-LD (Person, BreadcrumbList)
- OpenGraph / Twitter Card
- `sitemap.xml` + `robots.txt`
