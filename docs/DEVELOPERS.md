# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Branch Strategy

We use a simple variation of Git and GitHub Flow for branch control.

### Create and switch to a develop branch

```bash
git checkout -b develop
```

#### Create a feature branch from develop

```bash
git checkout -b feature-branch develop
```

#### Make changes and commit

```bash
git add .

git commit -m "Implement new feature"
```

### Developers

Submit a PR to merge your feature changes to the `origin/develop` branch

### Maintainers

#### Merge feature branch back to develop

```bash
git checkout develop

git merge feature-branch
```

#### When ready for release, merge develop to master

```bash
git checkout master

git merge develop
```

### Tag the release

```bash
git tag -a v1.0 -m "Release version 1.0"

git push origin v1.0
```
