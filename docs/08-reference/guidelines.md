# Security Guidelines

This document outlines security best practices and GDPR compliance guidelines for the Shooting Star project.

## Security Overview

As a website serving pregnant women and new mothers, security and privacy are paramount. This document covers essential security practices and compliance requirements.

## GDPR Compliance

### Data Protection Principles

The website must comply with GDPR (General Data Protection Regulation) as it serves European users:

#### 1. Lawfulness, Fairness, and Transparency
- **Clear consent mechanisms** for data collection
- **Transparent privacy policies** in French and English
- **Explicit consent** for marketing communications

#### 2. Purpose Limitation
- Collect data only for specified, legitimate purposes
- **Service inquiries** - Contact forms for yoga class bookings
- **Communication** - Newsletter subscriptions (opt-in only)
- **Analytics** - Anonymous usage statistics (with consent)

#### 3. Data Minimization
- Collect only necessary personal information:
  - **Essential**: Name, email, phone number for bookings
  - **Optional**: Pregnancy stage, previous yoga experience
  - **Prohibited**: Medical records, sensitive health data without explicit consent

#### 4. Storage Limitation
- **Retention periods**:
  - Contact form submissions: 2 years after last contact
  - Newsletter subscriptions: Until unsubscribed + 30 days
  - Analytics data: 26 months (Google Analytics default)

#### 5. Data Subject Rights
Implement mechanisms for:
- **Right to access** - Users can request their data
- **Right to rectification** - Users can correct their information
- **Right to erasure** - "Right to be forgotten" requests
- **Right to portability** - Data export in standard formats

### Implementation Requirements

#### Contact Forms
```typescript
// GDPR-compliant form structure
interface ContactFormData {
  name: string;              // Required
  email: string;             // Required
  phone?: string;            // Optional
  pregnancyStage?: string;   // Optional, with explicit consent
  message: string;           // Required
  consentToContact: boolean; // Required, explicit consent
  consentToNewsletter: boolean; // Optional, separate consent
}
```

#### Privacy Policy Requirements
- **Data controller identity** - Pauline Roussel's business information
- **Purpose of processing** - Service delivery, communications
- **Legal basis** - Consent, legitimate interest
- **Third-party sharing** - Analytics providers, booking systems
- **Retention periods** - Clear timelines for data deletion
- **Contact information** - Data protection officer or responsible person

#### Cookie Consent
- **Essential cookies only** without consent
- **Analytics cookies** require explicit consent
- **Marketing cookies** require explicit opt-in
- **Clear cookie policy** with types and purposes

## Web Application Security

### Content Security Policy (CSP)

Implement strict CSP headers to prevent XSS attacks:

```http
Content-Security-Policy: 
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://www.googletagmanager.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: https:;
  connect-src 'self' https://www.google-analytics.com;
```

### HTTP Security Headers

Essential security headers for production:

```http
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

### Form Security

#### Input Validation
```typescript
// Server-side validation example
const validateContactForm = (data: ContactFormData) => {
  const errors: string[] = [];
  
  // Sanitize inputs
  const sanitizedData = {
    name: sanitizeHtml(data.name.trim()),
    email: sanitizeEmail(data.email.trim().toLowerCase()),
    message: sanitizeHtml(data.message.trim())
  };
  
  // Validate required fields
  if (!sanitizedData.name || sanitizedData.name.length < 2) {
    errors.push("Name must be at least 2 characters");
  }
  
  if (!isValidEmail(sanitizedData.email)) {
    errors.push("Valid email address required");
  }
  
  return { sanitizedData, errors };
};
```

#### Rate Limiting
- **Contact forms**: 5 submissions per hour per IP
- **Newsletter signup**: 1 submission per hour per IP
- **General requests**: 100 requests per minute per IP

### Data Encryption

#### HTTPS Everywhere
- **Force HTTPS** for all connections
- **HTTP Strict Transport Security** (HSTS) enabled
- **Valid SSL certificate** with automatic renewal

#### Data at Rest
- **Database encryption** for stored form submissions
- **Environment variables** for sensitive configuration
- **No hardcoded secrets** in source code

#### Data in Transit
- **TLS 1.3** minimum for all connections
- **Certificate pinning** for API communications
- **Secure cookie attributes** (`Secure`, `HttpOnly`, `SameSite`)

## Dependency Security

### Regular Security Audits
```bash
# Regular dependency auditing
npm audit                    # Check for known vulnerabilities
npm audit fix               # Auto-fix non-breaking vulnerabilities
npm update                  # Update dependencies regularly
```

### Security Monitoring
- **GitHub Dependabot** - Automated dependency updates
- **Snyk integration** - Continuous vulnerability monitoring
- **Security alerts** - Email notifications for critical issues

### Package Management
- **Lock file usage** - Always commit `package-lock.json`
- **Minimal dependencies** - Avoid unnecessary packages
- **Trusted sources** - Use well-maintained, popular packages
- **Regular updates** - Keep dependencies current with security patches

## Hosting Security

### Fly.io Security Features
- **Container isolation** - Application runs in isolated containers
- **Network security** - Private networking between services
- **Automatic HTTPS** - SSL certificates managed automatically
- **DDoS protection** - Built-in protection against attacks

### Environment Configuration
```bash
# Secure environment variables
DATABASE_URL=postgresql://...          # Database connection
SESSION_SECRET=random_32_char_string   # Session encryption
API_KEY=secure_api_key                # Third-party service keys
```

### Backup and Recovery
- **Database backups** - Daily automated backups
- **Code repository** - Version control with GitHub
- **Deployment rollback** - Quick rollback capabilities
- **Disaster recovery plan** - Documented recovery procedures

## Monitoring and Incident Response

### Security Monitoring
- **Error tracking** - Monitor for unusual error patterns
- **Access logs** - Review access patterns and suspicious activity
- **Performance monitoring** - Detect potential DoS attacks

### Incident Response Plan
1. **Immediate Response** - Isolate affected systems
2. **Assessment** - Determine scope and impact
3. **Notification** - Inform users if personal data affected
4. **Remediation** - Fix vulnerabilities and restore service
5. **Review** - Post-incident analysis and improvements

### GDPR Breach Notification
- **72-hour rule** - Report breaches to supervisory authority within 72 hours
- **User notification** - Inform affected individuals if high risk
- **Documentation** - Maintain records of all security incidents

## Development Security Practices

### Code Security
- **Input validation** - Validate all user inputs
- **Output encoding** - Prevent XSS attacks
- **SQL injection prevention** - Use parameterized queries
- **Authentication** - Secure session management
- **Authorization** - Proper access controls

### Secure Development Lifecycle
1. **Security by design** - Consider security from project start
2. **Code review** - Security-focused code reviews
3. **Testing** - Include security testing in CI/CD
4. **Deployment** - Secure deployment practices
5. **Monitoring** - Continuous security monitoring

## Third-Party Services

### Analytics (Google Analytics)
- **IP anonymization** enabled
- **Data retention** - 26 months maximum
- **User consent** required before activation
- **GDPR-compliant configuration**

### Email Services
- **GDPR-compliant providers** only
- **Double opt-in** for newsletter subscriptions
- **Easy unsubscribe** mechanism
- **Data processing agreements** with providers

### Content Delivery Networks (CDN)
- **GDPR-compliant CDN providers**
- **Data location** - EU servers when possible
- **Security headers** preserved through CDN

## Compliance Checklist

### Pre-Launch Security Review
- [ ] GDPR privacy policy implemented and accessible
- [ ] Cookie consent mechanism implemented
- [ ] Contact forms include explicit consent checkboxes
- [ ] Data retention policies documented and implemented
- [ ] Security headers configured correctly
- [ ] HTTPS enforced with valid certificate
- [ ] Form validation and sanitization implemented
- [ ] Rate limiting configured
- [ ] Dependency security audit completed
- [ ] Incident response plan documented

### Ongoing Compliance
- [ ] Monthly security dependency updates
- [ ] Quarterly privacy policy reviews
- [ ] Annual GDPR compliance assessment
- [ ] Regular backup testing
- [ ] User data export/deletion request handling
- [ ] Security monitoring and alerting active

## Resources and References

### GDPR Resources
- [GDPR Official Text (EUR-Lex)](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32016R0679)
- [CNIL (French Data Protection Authority)](https://www.cnil.fr/)
- [GDPR.eu Information Portal](https://gdpr.eu/)

### Security References
- [OWASP Top 10 Web Application Risks](https://owasp.org/www-project-top-ten/)
- [Mozilla Web Security Guidelines](https://infosec.mozilla.org/guidelines/web_security)
- [Google Web Fundamentals Security](https://developers.google.com/web/fundamentals/security)

---

**Important**: This document provides guidelines for common security scenarios. For specific compliance questions or security incidents, consult with legal and security professionals familiar with French and EU regulations.