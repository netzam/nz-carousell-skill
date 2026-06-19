# nz-carousell-skill

npx-distributable package for the `carousell-har-backend-sync` Hermes skill.

## Usage

Print the packaged skill:

```bash
npx github:netzam/nz-carousell-skill print
```

Install into the local Hermes skills directory:

```bash
npx github:netzam/nz-carousell-skill install
```

Override the destination if needed:

```bash
npx github:netzam/nz-carousell-skill install --target /custom/path/SKILL.md
```

## Contents

- `SKILL.md` — the distributable skill instructions
- `bin/cli.js` — small installer / printer CLI
