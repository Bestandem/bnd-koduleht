# BND koduleht

Bestandem OÜ kodulehe lähtekood ja sõltumatu testversioon.

## Testversioon

GitHub Pagesi aadress:

https://bestandem.github.io/bnd-koduleht/

Testversioon avaldatakse automaatselt iga kord, kui `main` harusse jõuab uus muudatus.

## Kohalik käivitamine

Vajalik on Node.js 22.13 või uuem.

```bash
npm ci
npm run dev
```

Seejärel ava terminalis kuvatud kohalik aadress.

## Projekti põhifailid

- `app/page.tsx` – lehe sisu ja struktuur
- `app/globals.css` – kujundus ja mobiilivaade
- `public/assets/` – logo, pilt ja kirjafailid
- `docs/` – GitHub Pagesi staatiline testversioon
