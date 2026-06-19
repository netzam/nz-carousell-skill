# nz-carousell-skill

npx-distributable package for the `carousell-har-backend-sync` Hermes skill.

## Usage

Print the packaged skill:

```bash
npx github:netzam/nz-carousell-skill skills print
```

Install into the local Hermes skills directory:

```bash
npx github:netzam/nz-carousell-skill skills add
```

One-line installer:

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/netzam/nz-carousell-skill/main/install.sh)"
```

Override the destination if needed:

```bash
npx github:netzam/nz-carousell-skill skills add --target /custom/path/SKILL.md
```

## Contents

- `SKILL.md` — the distributable skill instructions
- `bin/cli.js` — small installer / printer CLI
