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

Automatic release flow:

1. Merge to `main`
2. GitHub Actions opens or updates a release PR
3. Merging the release PR creates a Git tag and GitHub Release
4. The npm publish workflow fires from that release

Override the destination if needed:

```bash
npx github:netzam/nz-carousell-skill skills add --target /custom/path/SKILL.md
```

## Contents

- `SKILL.md` — the distributable skill instructions
- `bin/cli.js` — small installer / printer CLI
