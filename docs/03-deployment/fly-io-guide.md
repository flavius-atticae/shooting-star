# Fly.io Deployment Guide

This document outlines the deployment configuration for the yoga instructor website on Fly.io.

## Prerequisites

1. Install Fly.io CLI: `brew install flyctl` (or `curl -L https://fly.io/install.sh | sh`)
2. Login to Fly.io: `flyctl auth login`
3. Create applications for staging and production environments

## GitHub Configuration

### Required Secrets

Configure in your GitHub repository settings (Settings → Secrets and variables → Actions):

- `FLY_API_TOKEN`: Your Fly.io API token (get from `flyctl auth token`)

### Required Variables

Configure as repository variables:

- `FLYIO_STAGING_APP_NAME`: Name of your staging app on Fly.io
- `FLYIO_PRODUCTION_APP_NAME`: Name of your production app on Fly.io

## Creating Fly.io Applications

```bash
# Create staging app (Toronto region for Canadian users)
flyctl apps create your-staging-app-name --region yyz

# Create production app
flyctl apps create your-production-app-name --region yyz

# Deploy staging
flyctl deploy --app your-staging-app-name

# Deploy production
flyctl deploy --app your-production-app-name
```

## Application Configuration

The [`fly.toml`](../../fly.toml) configuration includes:

- **Region**: `yyz` (Toronto) for Canadian deployment
- **Health checks**: Automatic monitoring on `/health` endpoint every 30s
- **Auto scaling**: Machines stop when idle, start on demand
- **Static assets**: Served from `/assets/` path
- **Resources**: 1 shared CPU, 512MB memory

## Health Check Endpoint

The application includes a health check endpoint at `/health` that returns:

```json
{
  "status": "ok",
  "timestamp": "2025-08-28T12:00:00.000Z",
  "environment": "production"
}
```

## Deployment Workflow

The deployment is managed by the [`deploy-fly.yml`](../../.github/workflows/deploy-fly.yml) GitHub Actions workflow:

| Trigger | Environment | Action |
|---------|-------------|--------|
| Push to `main` | Staging | Automatic deploy |
| Release published | Production | Automatic deploy |
| Manual dispatch | Staging/Production | Deploy or rollback |

## Rollback Procedures

For detailed rollback instructions, see [Rollback Procedures](./rollback-procedures.md).

Quick rollback via GitHub CLI:

```bash
gh workflow run deploy-fly.yml \
  -f operation=rollback \
  -f environment=production \
  -f rollback_target=""
```

## Security

- Docker image runs as non-root user (`reactuser`)
- HTTPS enforced via Fly.io configuration
- Environment variables used instead of hardcoded values
- Secrets managed through GitHub repository settings