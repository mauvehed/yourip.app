# Development Guide

This guide explains how to set up and contribute to the yourIP.app project.

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

## Production Build

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

## Branch Strategy and CI/CD

We use a Git Flow-inspired branching strategy with automated CI/CD pipelines.

### Branch Structure

- `main`: Production branch
- `develop`: Development/staging branch
- `feature/*`: Feature branches
- `release/*`: Release branches (optional)

### Feature Development

1. **Create a Feature Branch**

```bash
# Start from develop branch
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name
```

2. **Develop and Commit Changes**

```bash
# Make your changes and commit them
git add .
git commit -m "feat: description of your changes"
```

3. **Push Feature Branch**

```bash
git push origin feature/your-feature-name
```

4. **Create Pull Request**

- Create a PR from `feature/your-feature-name` to `develop`
- The CI pipeline will automatically:
  - Build the application
  - Run tests
  - Generate build version
- Get code review and address any feedback
- Once approved, merge into `develop`

### Release Process

1. **Prepare for Release**

```bash
# Ensure develop is up to date
git checkout develop
git pull origin develop

# Create a release branch (optional but recommended)
git checkout -b release/v1.0.0
```

2. **Create and Push Tag**

```bash
# Create an annotated tag
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

3. **Automated Release Process**
   When you push the tag, the CI/CD pipeline will:

- Build the application
- Generate build version
- Build and publish Docker images with both `latest` and version tags
- Automatically merge `develop` into `main`

### Best Practices

1. **Keep Branches Updated**

```bash
# Keep your branches up to date
git checkout develop
git pull origin develop
git checkout feature/your-feature
git rebase develop
```

2. **Clean Up**

```bash
# After merging PRs, delete feature branches
git branch -d feature/your-feature
git push origin --delete feature/your-feature
```

3. **Commit Messages**
   Use conventional commits:

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation
- `style:` for formatting
- `refactor:` for code changes
- `test:` for adding tests
- `chore:` for maintenance

4. **Versioning**

- Use semantic versioning (MAJOR.MINOR.PATCH)
- Example: v1.0.0, v1.0.1, v1.1.0

### CI/CD Pipeline

The project uses GitHub Actions for continuous integration and deployment:

1. **Build Job**

- Runs on all pushes and pull requests
- Installs dependencies
- Generates build version
- Builds the application

2. **Docker Job**

- Runs only on tag pushes
- Builds Docker images
- Publishes to GitHub Container Registry (ghcr.io)
- Tags images with both `latest` and version number

3. **Merge Job**

- Runs only on tag pushes
- Automatically merges `develop` into `main`
- Ensures production branch is up to date

## Docker Development

To build and run the Docker container locally:

```bash
# Build the image
docker build -t yourip-app .

# Run the container
docker run -p 3000:3000 yourip-app
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
