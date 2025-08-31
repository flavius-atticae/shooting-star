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
3. **Rollback**: Available via workflow dispatch with rollback options
4. **Health checks**: Automated post-deployment verification

### Rollback Guide

#### Overview
The deployment system supports robust rollback capabilities using Fly.io's deployment mechanism. Rollbacks redeploy a previous version of your application using `flyctl deploy --image`.

#### Performing a Rollback

1. **Access GitHub Actions**:
   - Go to your repository → Actions tab
   - Select "Deployment Automation" workflow
   - Click "Run workflow"

2. **Configure Rollback**:
   - **Operation**: Select "rollback"
   - **Environment**: Choose "staging" or "production"
   - **Rollback Target** (optional):
     - Leave empty for automatic rollback to previous successful release
     - Specify version number (e.g., "v1.2.3")
     - Specify Docker image reference for specific image rollback

3. **Execution Process**:
   - Workflow discovers available releases using `flyctl releases --image`
   - Validates rollback target exists
   - Deploys previous version using `flyctl deploy --image`
   - Performs health checks to verify rollback success
   - Sends team notification with rollback details

#### Rollback Strategies

- **Automatic**: Rolls back to the most recent successful deployment
- **Version-specific**: Rolls back to a specific version tag
- **Image-specific**: Rolls back to a specific Docker image reference

#### Emergency Rollback

For critical incidents, the workflow can be triggered immediately:
```bash
# Manual rollback via GitHub CLI
gh workflow run deployment-automation.yml \
  -f operation=rollback \
  -f environment=production \
  -f rollback_target=""  # Empty for automatic
```

#### Rollback Validation

After rollback execution:
- Health endpoint is checked for service availability
- Application logs are monitored for errors
- Team receives notification with rollback status
- Manual verification recommended for production rollbacks

### Security

- Docker image runs as non-root user (`reactuser`)
- HTTPS enforced via Fly.io configuration  
- Environment variables used instead of hardcoded values
- Secrets managed through GitHub repository settings