# Security Review

A comprehensive skill for ensuring code security best practices and identifying vulnerabilities.

## Overview

The Security Review skill provides systematic security checks across all aspects of application development, from secrets management to authentication, input validation, and deployment security.

## When to Use

Activate this skill when:

- Implementing authentication or authorization
- Handling user input or file uploads
- Creating new API endpoints
- Working with secrets or credentials
- Implementing payment features
- Storing or transmitting sensitive data
- Integrating third-party APIs

## Key Features

### 10 Security Categories

1. **Secrets Management** - Environment variables, no hardcoded credentials
2. **Input Validation** - Zod schemas, file upload restrictions
3. **SQL Injection Prevention** - Parameterized queries, ORM usage
4. **Authentication & Authorization** - JWT handling, RBAC, Row Level Security
5. **XSS Prevention** - HTML sanitization, Content Security Policy
6. **CSRF Protection** - CSRF tokens, SameSite cookies
7. **Rate Limiting** - API throttling, expensive operation limits
8. **Sensitive Data Exposure** - Safe logging, generic error messages
9. **Blockchain Security** - Wallet verification, transaction validation
10. **Dependency Security** - Vulnerability scanning, regular updates

### Pre-Deployment Checklist

Comprehensive checklist covering 17 critical security checkpoints before production deployment.

### Security Testing

Automated test examples for:
- Authentication requirements
- Authorization checks
- Input validation
- Rate limiting enforcement

## Usage

See [skills/security-review/SKILL.md](../skills/security-review/SKILL.md) for the complete security checklist with code examples and verification steps.

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/security)
- [Supabase Security](https://supabase.com/docs/guides/auth)
- [Web Security Academy](https://portswigger.net/web-security)
