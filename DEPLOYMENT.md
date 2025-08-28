# Deployment Configuration

This document outlines the deployment configuration for the yoga instructor website.

## Fly.io Deployment

### Prerequisites

1. Install Fly.io CLI: `brew install flyctl`
2. Login to Fly.io: `flyctl auth login`
3. Create applications for staging and production environments

### Required GitHub Secrets

Configure the following secrets in your GitHub repository settings:

#### Fly.io Configuration
- `FLY_API_TOKEN`: Your Fly.io API token (get from `flyctl auth token`)
- `FLYIO_STAGING_APP_NAME`: Name of your staging app on Fly.io
- `FLYIO_PRODUCTION_APP_NAME`: Name of your production app on Fly.io

#### Health Check URLs
- `STAGING_HEALTH_URL`: Health check endpoint for staging (e.g., `https://your-staging-app.fly.dev/health`)
- `PRODUCTION_HEALTH_URL`: Health check endpoint for production (e.g., `https://your-production-app.fly.dev/health`)

### Creating Fly.io Applications

```bash
# Create staging app
flyctl apps create your-staging-app-name --region fra

# Create production app  
flyctl apps create your-production-app-name --region fra

# Deploy staging
flyctl deploy --app your-staging-app-name

# Deploy production
flyctl deploy --app your-production-app-name
```

### Application Configuration

The `fly.toml` configuration includes:
- **Region**: `fra` (Frankfurt) for European deployment
- **Health checks**: Automatic health monitoring on `/health` endpoint
- **Auto scaling**: Machines stop when idle, start on demand
- **Static assets**: Served from `/assets/` path
- **Resources**: 1 shared CPU, 512MB memory

### Health Check Endpoint

The application includes a health check endpoint at `/health` that returns:
```json
{
  "status": "ok",
  "timestamp": "2025-08-28T12:00:00.000Z",
  "environment": "production"
}
```

### Deployment Workflow

1. **Staging**: Triggered on push to `main` branch
2. **Production**: Triggered on release publication or manual dispatch
3. **Rollback**: Available via workflow dispatch with rollback version
4. **Health checks**: Automated post-deployment verification

### Security

- Docker image runs as non-root user (`reactuser`)
- HTTPS enforced via Fly.io configuration  
- Environment variables used instead of hardcoded values
- Secrets managed through GitHub repository settings