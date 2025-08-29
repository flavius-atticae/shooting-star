# Troubleshooting Guide

This guide covers common issues you might encounter while developing or deploying the Shooting Star project, along with their solutions.

## Development Issues

### Server and Build Problems

#### Development Server Won't Start

**Problem**: `npm run dev` fails or server doesn't start

**Solutions**:
```bash
# Clear node modules and reinstall
rm -rf node_modules/
npm install

# Check Node.js version (must be 18+)
node --version

# Clear build cache
rm -rf build/
rm -rf .react-router/

# Check for port conflicts (default: 5173)
lsof -ti:5173 | xargs kill -9  # Kill processes using port 5173
```

#### Build Failures

**Problem**: `npm run build` fails with errors

**Common Causes & Solutions**:

1. **TypeScript Errors**:
   ```bash
   # Run type checking to see specific errors
   npm run typecheck
   
   # Regenerate route types
   rm -rf .react-router/types/
   npm run typecheck
   ```

2. **Missing Dependencies**:
   ```bash
   # Ensure all dependencies are installed
   npm install
   
   # Check for peer dependency warnings
   npm install --save-dev <missing-dependency>
   ```

3. **Asset Loading Issues**:
   ```bash
   # Check public directory structure
   ls -la public/
   
   # Verify font files exist
   ls -la public/fonts/
   ```

### TypeScript Issues

#### Path Alias Not Working

**Problem**: Imports using `~/` don't work

**Solutions**:
1. Check `tsconfig.json` paths configuration:
   ```json
   {
     "compilerOptions": {
       "paths": {
         "~/*": ["./app/*"]
       }
     }
   }
   ```

2. Verify `vite.config.ts` includes the plugin:
   ```typescript
   import tsconfigPaths from "vite-tsconfig-paths";
   
   export default defineConfig({
     plugins: [tsconfigPaths()]
   });
   ```

3. Restart the development server after configuration changes

#### Type Generation Issues

**Problem**: Route types not generating or outdated

**Solutions**:
```bash
# Force regenerate types
rm -rf .react-router/types/
npm run typecheck

# Check route file structure
ls -la app/routes/

# Ensure routes.ts is properly configured
cat app/routes.ts
```

### Styling and CSS Issues

#### TailwindCSS Classes Not Working

**Problem**: TailwindCSS utilities not applying

**Solutions**:
1. Check CSS import in `app/root.tsx`:
   ```typescript
   import "./app.css";
   ```

2. Verify Vite configuration includes TailwindCSS plugin:
   ```typescript
   import tailwindcss from "@tailwindcss/vite";
   
   export default defineConfig({
     plugins: [tailwindcss()]
   });
   ```

3. Check for CSS syntax errors in `app/app.css`

#### Font Loading Issues

**Problem**: Custom fonts not loading

**Solutions**:
1. Verify font files exist:
   ```bash
   ls -la public/fonts/
   ```

2. Check font declarations in CSS:
   ```css
   @font-face {
     font-family: "Barlow";
     src: url("/fonts/barlow-regular.ttf") format("truetype");
   }
   ```

3. Check network tab in browser dev tools for 404 errors

#### Dark Mode Not Working

**Problem**: Dark mode toggle not functioning

**Solutions**:
1. Check CSS custom properties are defined for both themes
2. Verify JavaScript theme toggle implementation
3. Test system preference detection
4. Check localStorage for theme persistence

## Production and Deployment Issues

### Docker Build Problems

#### Container Build Failures

**Problem**: Docker build fails

**Solutions**:
```bash
# Check Dockerfile syntax
docker build --no-cache -t shooting-star .

# Build with verbose output
docker build --progress=plain -t shooting-star .

# Check for missing files in build context
cat .dockerignore
```

#### Container Runtime Issues

**Problem**: Container starts but application not accessible

**Solutions**:
1. Check port mapping:
   ```bash
   docker run -p 3000:3000 shooting-star
   ```

2. Verify internal port configuration in application
3. Check container logs:
   ```bash
   docker logs <container-id>
   ```

### Fly.io Deployment Issues

#### Deployment Failures

**Problem**: `fly deploy` fails

**Common Solutions**:
```bash
# Check fly.toml configuration
cat fly.toml

# Verify Fly.io CLI is authenticated
fly auth whoami

# Check deployment logs
fly logs

# Scale down and redeploy if needed
fly scale count 0
fly deploy
fly scale count 1
```

#### Application Not Responding

**Problem**: Deployment succeeds but app not accessible

**Solutions**:
1. Check application logs:
   ```bash
   fly logs --app shooting-star
   ```

2. Verify health check endpoint:
   ```bash
   curl https://your-app.fly.dev/health
   ```

3. Check internal port configuration:
   ```toml
   [http_service]
     internal_port = 3000
   ```

### Performance Issues

#### Slow Page Loading

**Problem**: Pages load slowly in production

**Diagnostics**:
1. Check Lighthouse scores
2. Analyze bundle size
3. Review network waterfall in dev tools

**Solutions**:
```bash
# Analyze bundle size
npm run build
ls -la build/client/assets/

# Check for unused dependencies
npx depcheck

# Optimize images and assets
# Consider lazy loading for large components
```

#### Memory Issues

**Problem**: High memory usage or out-of-memory errors

**Solutions**:
1. Monitor memory usage:
   ```bash
   fly status --app shooting-star
   ```

2. Scale up memory if needed:
   ```bash
   fly scale memory 512  # Increase to 512MB
   ```

3. Check for memory leaks in application code

## Development Environment Issues

### Node.js and npm Problems

#### Version Conflicts

**Problem**: Node.js version incompatibility

**Solutions**:
```bash
# Check current version
node --version
npm --version

# Install correct Node.js version (18+)
# Using nvm (recommended):
nvm install 18
nvm use 18

# Or download from nodejs.org
```

#### Package Installation Issues

**Problem**: npm install fails or produces warnings

**Solutions**:
```bash
# Clear npm cache
npm cache clean --force

# Delete lock file and reinstall (last resort)
rm package-lock.json
rm -rf node_modules/
npm install

# Check for peer dependency issues
npm install --legacy-peer-deps
```

### Git and Version Control

#### Branch and Merge Issues

**Problem**: Git conflicts or branch issues

**Solutions**:
```bash
# Check current branch and status
git status
git branch

# Resolve merge conflicts
git mergetool

# Reset to clean state (careful!)
git reset --hard HEAD

# Switch branches safely
git stash
git checkout main
git stash pop
```

## Browser and Client Issues

### JavaScript Errors

#### Runtime Errors in Browser

**Problem**: JavaScript errors in browser console

**Diagnostics**:
1. Open browser dev tools (F12)
2. Check Console tab for errors
3. Check Network tab for failed requests
4. Check Sources tab for debugging

**Common Solutions**:
1. Clear browser cache and reload
2. Disable browser extensions
3. Test in incognito/private mode
4. Check for TypeScript compilation errors

### Accessibility Issues

#### Screen Reader Problems

**Problem**: Content not accessible to screen readers

**Solutions**:
1. Test with screen reader software (VoiceOver, NVDA)
2. Check semantic HTML structure
3. Verify ARIA labels and roles
4. Test keyboard navigation

#### Contrast and Visual Issues

**Problem**: Poor color contrast or visual accessibility

**Solutions**:
1. Use browser accessibility devtools
2. Test with high contrast mode
3. Verify color contrast ratios (4.5:1 minimum)
4. Test with color blindness simulators

## Monitoring and Debugging

### Logging and Error Tracking

#### Enable Debug Logging

**Development**:
```bash
# Enable verbose logging
DEBUG=* npm run dev

# Enable React Router debug mode
DEBUG=react-router:* npm run dev
```

**Production**:
```bash
# Check application logs
fly logs --app shooting-star

# Follow logs in real-time
fly logs --app shooting-star -f
```

### Performance Monitoring

#### Monitor Core Web Vitals

**Tools**:
- Chrome DevTools Lighthouse
- WebPageTest.org
- Google PageSpeed Insights
- Fly.io metrics dashboard

#### Database and Server Monitoring

```bash
# Check server resources
fly status --app shooting-star

# Monitor response times
fly logs --app shooting-star | grep "response time"
```

## Getting Help

### Internal Resources
1. **Documentation**: Check other docs in this folder
2. **Code Comments**: Review inline code documentation
3. **Git History**: Check commit messages for context
4. **Issue Templates**: Use GitHub issue templates for bug reports

### External Resources
1. **React Router v7**: [Official Documentation](https://reactrouter.com/)
2. **TailwindCSS**: [Documentation](https://tailwindcss.com/docs)
3. **Vite**: [Troubleshooting Guide](https://vitejs.dev/guide/troubleshooting.html)
4. **Fly.io**: [Troubleshooting Documentation](https://fly.io/docs/troubleshooting/)

### Community Support
- **GitHub Discussions**: Project-specific discussions
- **Stack Overflow**: General web development questions
- **Discord/Slack**: Framework-specific communities

## Escalation Process

### When to Create an Issue

Create a GitHub issue when:
1. Problem persists after following troubleshooting steps
2. You discover a potential bug in the codebase
3. Documentation is unclear or incorrect
4. You need a new feature to solve your problem

### Issue Templates

Use appropriate GitHub issue templates:
- **Bug Report**: For functional problems
- **Feature Request**: For new functionality
- **Documentation**: For documentation improvements
- **Security**: For security-related issues (use security advisory for sensitive issues)

### Information to Include

When reporting issues, include:
1. **Environment details**: OS, Node.js version, npm version
2. **Steps to reproduce**: Clear, step-by-step instructions
3. **Expected behavior**: What should happen
4. **Actual behavior**: What actually happens
5. **Error messages**: Full error messages and stack traces
6. **Screenshots**: Visual issues or error dialogs
7. **Configuration**: Relevant configuration file contents

---

**Remember**: Always check the [GitHub Issues](../../issues) first to see if your problem has already been reported or solved. Many common issues have solutions in closed issues.