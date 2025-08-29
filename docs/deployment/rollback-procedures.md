# Deployment Rollback Guide

## Overview

This guide provides comprehensive instructions for performing rollbacks in the shooting-star application deployment system. The rollback mechanism uses Fly.io's deployment capabilities to redeploy previous versions safely and efficiently.

## Quick Start

### Emergency Rollback (Production)

For critical production issues requiring immediate rollback:

1. **GitHub Actions UI**:
   - Go to GitHub → Actions → "Deployment Automation"
   - Click "Run workflow"
   - Set Operation: "rollback"
   - Set Environment: "production" 
   - Leave Rollback Target empty for automatic rollback
   - Click "Run workflow"

2. **Command Line** (requires GitHub CLI):
   ```bash
   gh workflow run deployment-automation.yml \
     -f operation=rollback \
     -f environment=production \
     -f rollback_target=""
   ```

## Rollback Strategies

### 1. Automatic Rollback
**When to use**: Quick recovery from failed deployments
- Automatically rolls back to the most recent successful release
- No version specification required
- Fastest rollback method

**Usage**:
- Leave "Rollback Target" field empty
- System discovers and deploys previous working version

### 2. Version-Specific Rollback
**When to use**: Rolling back to a known good version
- Target a specific release version (e.g., v1.2.3)
- Useful when you know exactly which version was working

**Usage**:
- Set "Rollback Target" to version number: `v1.2.3`
- System validates version exists before deployment

### 3. Image-Specific Rollback
**When to use**: Advanced scenarios with specific Docker image references
- Roll back to a specific Docker image SHA
- Most precise rollback method

**Usage**:
- Set "Rollback Target" to full image reference
- Example: `registry.fly.io/shooting-star:deployment-01234567`

## Step-by-Step Rollback Process

### Phase 1: Preparation
1. **Identify the Issue**: Confirm that a rollback is necessary
2. **Determine Target**: Choose rollback strategy (automatic, version, or image)
3. **Alert Team**: Notify team members of planned rollback

### Phase 2: Execution
1. **Access Workflow**:
   ```
   GitHub Repository → Actions → Deployment Automation → Run workflow
   ```

2. **Configure Parameters**:
   - **Operation**: Select "rollback"
   - **Environment**: Choose target environment
   - **Rollback Target**: Specify target or leave empty

3. **Monitor Execution**:
   - Watch workflow logs in real-time
   - Verify each step completes successfully
   - Check for any error messages

### Phase 3: Validation
1. **Automatic Health Check**: Workflow performs health endpoint verification
2. **Manual Verification**: 
   - Test critical application functionality
   - Verify user-facing features work correctly
   - Check application logs for errors

3. **Team Notification**: Workflow sends notification with rollback status

## Environment-Specific Considerations

### Staging Environment
- Lower risk environment for testing rollback procedures
- Can be used to validate rollback process before production
- Automatic rollbacks triggered on deployment failures

### Production Environment
- Requires environment approval in GitHub
- Manual verification highly recommended after rollback
- Emergency procedures available for critical incidents

## Technical Implementation

### Rollback Mechanism
The system uses Fly.io's deployment mechanism rather than traditional rollback commands:

```bash
# Discovery of available releases
flyctl releases --image -j --app $APP_NAME

# Rollback execution
flyctl deploy --image $PREVIOUS_IMAGE --app $APP_NAME
```

### Health Check Integration
Post-rollback health checks verify:
- Application responds to HTTP requests
- Health endpoint returns proper status
- System resources are stable
- No critical errors in logs

## Troubleshooting

### Common Issues

**1. "No previous releases found"**
- **Cause**: First deployment or no successful previous deployments
- **Solution**: Deploy a working version first, then rollback capability will be available

**2. "Rollback target not found"**
- **Cause**: Specified version or image doesn't exist
- **Solution**: Check available releases with `flyctl releases list --app $APP_NAME`

**3. "Health check failed after rollback"**
- **Cause**: Rolled-back version also has issues
- **Solution**: Try rolling back to an earlier known-good version

**4. "Workflow fails with authentication error"**
- **Cause**: Invalid or expired FLY_API_TOKEN
- **Solution**: Generate new deploy token and update repository secret

### Recovery Procedures

If rollback fails:
1. **Manual Fly.io Deployment**:
   ```bash
   flyctl deploy --app $APP_NAME --image $WORKING_IMAGE
   ```

2. **Local Emergency Deployment**:
   ```bash
   npm run build
   flyctl deploy --app $APP_NAME
   ```

## Best Practices

### Pre-Rollback
- **Document the Issue**: Record what triggered the rollback need
- **Communicate**: Alert team and stakeholders
- **Backup Check**: Ensure data consistency if applicable

### During Rollback
- **Monitor Closely**: Watch all workflow steps
- **Stay Available**: Be ready to take manual action if needed
- **Document Progress**: Keep notes on rollback execution

### Post-Rollback
- **Verify Functionality**: Test critical user paths
- **Monitor Metrics**: Watch error rates and performance
- **Plan Forward Fix**: Address root cause of original issue
- **Update Documentation**: Record lessons learned

## Emergency Contacts

### Escalation Path
1. **Technical Lead**: Primary contact for rollback decisions
2. **DevOps Team**: Infrastructure and deployment issues  
3. **Product Team**: Business impact assessment

### Monitoring Resources
- **Health Endpoint**: `/health` - Application status
- **Fly.io Dashboard**: Real-time application metrics
- **GitHub Actions**: Deployment workflow status
- **Application Logs**: `flyctl logs --app $APP_NAME`

## Related Documentation

- [DEPLOYMENT.md](./DEPLOYMENT.md) - General deployment configuration
- [GitHub Actions Workflow](./.github/workflows/deployment-automation.yml) - Technical implementation
- [Fly.io Configuration](./fly.toml) - Application configuration