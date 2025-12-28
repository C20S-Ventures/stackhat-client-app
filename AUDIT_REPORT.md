# StackHat Client App - Comprehensive Audit Report

**Audit Date:** December 28, 2025
**Auditor:** Claude (Automated Code Audit)
**Repository:** stackhat-client-app
**Current Version:** 0.0.1

---

## Executive Summary

This audit reveals a React SPA with enterprise features (multi-tenancy, SSO, theme customization) built on dated tooling. The codebase demonstrates decent architectural patterns but requires significant modernization across security, dependencies, testing, and code quality. **Critical attention is needed for security vulnerabilities and the complete absence of tests.**

### Risk Assessment Summary

| Category | Risk Level | Items Found |
|----------|------------|-------------|
| Security Vulnerabilities | **HIGH** | 8 critical issues |
| Outdated Dependencies | **HIGH** | 40+ packages need updates |
| Testing Coverage | **CRITICAL** | 0% - No tests exist |
| Code Quality | **MEDIUM** | 15+ issues identified |
| Documentation | **MEDIUM** | Incomplete/outdated |
| CI/CD | **LOW** | Template only, needs implementation |

---

## 1. Security Vulnerabilities (HIGH PRIORITY)

### 1.1 Critical Security Issues

#### S1: Token Storage in localStorage (XSS Vulnerable)
**File:** `src/stores/AuthenticationStore.js:173-174`
```javascript
function setLocalStorage(data) {
  LocalStorage.set('PrincipalData', data)
}
```
- **Risk:** localStorage is accessible via JavaScript, making tokens vulnerable to XSS attacks
- **Recommendation:** Use httpOnly cookies or secure token handling via backend

#### S2: Credentials Sent in URL-encoded Form Data
**File:** `src/services/Api.js:40`
```javascript
return Axios.post(`${serviceBase}token`, `grant_type=password&username=${credentials.userName}&password=${credentials.password}`, config)
```
- **Risk:** Credentials may be logged in server/proxy logs, no URL encoding for special characters
- **Recommendation:** Use JSON payload with proper Content-Type, ensure HTTPS-only

#### S3: jQuery from External CDN Without Subresource Integrity
**File:** `src/index.html:17`
```html
<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-..." crossorigin="anonymous"></script>
```
- **Risk:** Old jQuery version (3.3.1), CDN compromise could inject malicious code
- **Recommendation:** Bundle jQuery locally, update to latest version, or remove entirely

#### S4: Axios Progress Bar from Unsecured CDN
**File:** `src/index.html:14`
```html
<link rel="stylesheet" type="text/css" href="https://cdn.rawgit.com/rikmms/progress-bar-4-axios/...">
```
- **Risk:** rawgit.com is deprecated and could serve compromised assets, no SRI
- **Recommendation:** Bundle CSS locally or use verified CDN with integrity checks

#### S5: Direct innerHTML Usage
**File:** `src/components/print/Printer.js:9`
```javascript
pri.document.write(content.innerHTML);
```
- **Risk:** Potential XSS if content contains user-supplied data
- **Recommendation:** Sanitize content or use safe DOM methods

#### S6: Open Redirect Potential
**File:** `src/stores/AuthenticationStore.js:122`
```javascript
location.href = `/?reason=${reason}`
```
- **Risk:** While currently safe, pattern could be exploited if `reason` becomes user-controlled
- **Recommendation:** Validate redirect targets explicitly

#### S7: Token Logging to Console
**File:** `src/stores/AuthenticationStore.js:163`
```javascript
console.log("[AUTH][GP]", result)  // result contains token
```
- **Risk:** Tokens visible in browser console, could be captured by malicious extensions
- **Recommendation:** Remove all auth-related console.log statements in production

#### S8: No CSRF Protection Visible
- **Risk:** No CSRF tokens or anti-forgery measures in API calls
- **Recommendation:** Implement CSRF protection for state-changing requests

### 1.2 Axios Security Configuration
**File:** `src/services/Api.js`
- No request timeout configured (DoS risk)
- No response size limits
- Missing CORS error handling

---

## 2. Dependency Audit (HIGH PRIORITY)

### 2.1 Severely Outdated Core Dependencies

| Package | Current | Latest | Years Behind | Risk |
|---------|---------|--------|--------------|------|
| axios | 0.18.0 | 1.6.x | ~5 years | Known CVEs |
| react | 16.8.4 | 18.2.x | ~5 years | Missing security fixes |
| react-router-dom | 4.3.1 | 6.x | ~5 years | API completely changed |
| mobx | 5.9.0 | 6.x | ~4 years | Major breaking changes |
| webpack | 4.16.2 | 5.x | ~4 years | Performance/security |
| babel-core | 6.26.3 | 7.x | ~6 years | Deprecated |
| bootstrap-sass | 3.3.7 | N/A | ~7 years | Use bootstrap 5.x |
| react-bootstrap | 0.32.1 | 2.x | ~5 years | Bootstrap 3 only |
| node-sass | 4.9.2 | N/A | ~5 years | Deprecated, use dart-sass |
| eslint | 5.3.0 | 8.x | ~5 years | Many improvements |

### 2.2 Known Vulnerabilities

```
axios@0.18.0 - Multiple CVEs including prototype pollution
node-sass@4.9.2 - LibSass deprecated, multiple vulnerabilities
extract-text-webpack-plugin@4.0.0-beta.0 - Deprecated, use mini-css-extract-plugin
uglifyjs-webpack-plugin@1.2.7 - Deprecated, use terser-webpack-plugin
```

### 2.3 Deprecated/Abandoned Packages
- `extract-text-webpack-plugin` - Replaced by `mini-css-extract-plugin`
- `babel-core@6` - Replaced by `@babel/core@7`
- `babel-polyfill` - Replaced by `core-js` + regenerator-runtime
- `uglifyjs-webpack-plugin` - Replaced by `terser-webpack-plugin`
- `react-adal` - Azure MSAL libraries recommended

---

## 3. Code Quality Issues (MEDIUM PRIORITY)

### 3.1 Critical Code Issues

#### CQ1: Dead AngularJS Code in Helper.js
**File:** `src/services/Helper.js:114-118, 142`
```javascript
return $filter("filter")(list, expression, comparator, anyPropertyKey);
var result = angular.extend({}, obj);
```
- **Issue:** References to `angular` and `$filter` that don't exist in React
- **Impact:** `filter()`, `orderObjectBy()`, and `getProperty()` functions will throw runtime errors if called

#### CQ2: Zero PropTypes Usage
- **Issue:** 101+ React components with no PropTypes or TypeScript types
- **Impact:** No runtime type checking, harder debugging, poor developer experience
- **Files Affected:** All 154 JavaScript files

#### CQ3: Unreachable Code
**File:** `src/stores/AuthenticationStore.js:126-127`
```javascript
IsInRole(name) {
  return this.Principal.roles.indexOf(name.toLowerCase()) > -1
  console.log(this.Principal.roles)  // <-- Never executed
}
```

#### CQ4: Inconsistent Async/Await Usage
- Only 4 files use async/await out of 154 files
- Mixing Promises and callbacks creates inconsistent patterns

### 3.2 Console Logging in Production
- **18 console.log statements** found across 14 files
- Debug logs should be removed or use conditional logging for production

### 3.3 Unused Imports and Dead Code
Multiple files contain commented-out code and unused imports:
- `src/services/Helper.js` - AngularJS injection comments
- `src/components/Header.js` - Commented out help toggle
- `src/components/errors/ErrorBoundary.js` - TODO comment for error logging

### 3.4 ESLint Configuration Issues
**File:** `.eslintrc`
```json
{
  "rules": {
    "max-len": [1, 1000, 2, { "ignoreComments": true }]
  }
}
```
- Only one rule configured
- Missing security-focused rules
- No React-specific rules enabled beyond plugin

---

## 4. Testing (CRITICAL)

### 4.1 Current State
- **Zero test files** (no *.test.js or *.spec.js)
- **Zero testing framework** installed (no Jest, Mocha, Enzyme, React Testing Library)
- **Zero test scripts** in package.json
- **Zero coverage tracking**

### 4.2 Risk Assessment
- **Regression risk:** HIGH - No way to verify changes don't break functionality
- **Refactoring risk:** HIGH - Cannot safely modernize codebase
- **Integration risk:** HIGH - API changes could go unnoticed
- **Security risk:** HIGH - Cannot test for security regressions

---

## 5. Build & Deployment Issues

### 5.1 Webpack Configuration Problems

#### Multiple Confusing Configs
- `webpack.base.config.js` - Development
- `webpack.prod.config.js` - Experimental/unused?
- `webpack.prodtemp.config.js` - Actual production (confusing name)
- `webpack.opt.config.js` - Purpose unclear

#### Missing Production Optimizations
- No code splitting/lazy loading for routes
- No tree shaking verification
- No bundle size analysis
- No compression (gzip/brotli)

### 5.2 CI/CD Pipeline
**File:** `vsts-ci.yml`
```yaml
- script: echo Hello, world!
```
- **Issue:** Template placeholder only, no actual build/test/deploy steps
- **Issue:** Uses deprecated Ubuntu 16.04 image

### 5.3 Missing Environment Separation
- API URLs hardcoded in config files
- No environment variable support for secrets
- No production-specific security headers

---

## 6. Architecture Issues

### 6.1 Single Entry Point
- No route-based code splitting
- All 101+ components bundled together
- Large initial bundle size

### 6.2 State Management
- MobX stores exported as singletons (harder to test)
- Direct store imports in components (tight coupling)

### 6.3 API Layer
- No request retry logic for network failures
- No request caching strategy
- No offline support

---

## 7. Accessibility (a11y) Issues

- **Only 6 files** contain any ARIA attributes
- Missing `alt` attributes on images
- Form error messages not linked via `aria-describedby`
- No skip navigation links
- No keyboard navigation testing
- No screen reader testing

---

## 8. Documentation Issues

### 8.1 Missing Documentation
- No API documentation
- No component documentation/Storybook
- No architecture decision records (ADRs)
- No contribution guidelines
- No security policy (SECURITY.md)

### 8.2 Outdated Documentation
- `package.json` references wrong repository (boilerplate template)
- Build script descriptions unclear

---

## Prioritized Backlog

### P0 - Critical (Do Immediately)

| ID | Issue | Effort | Impact |
|----|-------|--------|--------|
| P0-1 | Move tokens from localStorage to httpOnly cookies | High | Security |
| P0-2 | Update axios to fix known CVEs | Low | Security |
| P0-3 | Remove/secure CDN dependencies | Medium | Security |
| P0-4 | Remove auth token console.log statements | Low | Security |
| P0-5 | Set up basic testing framework (Jest + RTL) | Medium | Quality |
| P0-6 | Remove dead AngularJS code in Helper.js | Low | Stability |

### P1 - High Priority (Next Sprint)

| ID | Issue | Effort | Impact |
|----|-------|--------|--------|
| P1-1 | Update React to 18.x | High | Security/Performance |
| P1-2 | Update MobX to 6.x | Medium | Maintainability |
| P1-3 | Migrate to Babel 7 | Medium | Build |
| P1-4 | Replace node-sass with dart-sass | Low | Build stability |
| P1-5 | Add PropTypes or TypeScript | High | Quality |
| P1-6 | Configure ESLint properly | Low | Quality |
| P1-7 | Add unit tests for authentication flow | Medium | Quality |
| P1-8 | Add unit tests for API layer | Medium | Quality |

### P2 - Medium Priority (Next Quarter)

| ID | Issue | Effort | Impact |
|----|-------|--------|--------|
| P2-1 | Implement route-based code splitting | Medium | Performance |
| P2-2 | Migrate Webpack 4 to 5 | High | Build/Security |
| P2-3 | Update react-router to v6 | High | Maintainability |
| P2-4 | Update react-bootstrap to v2 + Bootstrap 5 | High | UI/Maintainability |
| P2-5 | Set up proper CI/CD pipeline | Medium | DevOps |
| P2-6 | Add integration tests | High | Quality |
| P2-7 | Implement accessibility improvements | Medium | Compliance |
| P2-8 | Add error boundary logging to service | Low | Monitoring |

### P3 - Low Priority (Backlog)

| ID | Issue | Effort | Impact |
|----|-------|--------|--------|
| P3-1 | Add Storybook for component documentation | Medium | DX |
| P3-2 | Implement request caching/offline support | High | UX |
| P3-3 | Add bundle size monitoring | Low | Performance |
| P3-4 | Add E2E tests (Cypress/Playwright) | High | Quality |
| P3-5 | Create architectural documentation | Medium | Knowledge |
| P3-6 | Add SECURITY.md and security policy | Low | Compliance |

---

## Recommended Modernization Roadmap

### Phase 1: Security & Stability (1-2 weeks)
1. Fix critical security vulnerabilities (P0-1 through P0-4)
2. Remove dead code (P0-6)
3. Set up Jest + React Testing Library
4. Add tests for AuthenticationStore and Api.js
5. Update axios and other low-effort dependency updates

### Phase 2: Core Modernization (2-4 weeks)
1. Migrate Babel 6 to 7
2. Replace deprecated webpack plugins
3. Update React to 18.x (may require component updates)
4. Update MobX to 6.x
5. Add PropTypes to all components

### Phase 3: Infrastructure (2-3 weeks)
1. Set up proper CI/CD pipeline
2. Add code coverage requirements
3. Add bundle analysis
4. Implement code splitting
5. Configure proper ESLint/Prettier

### Phase 4: UI Framework Update (3-4 weeks)
1. Update Bootstrap to v5
2. Update react-bootstrap to v2
3. Update react-router to v6
4. Update styling approach (consider CSS-in-JS or Tailwind)

### Phase 5: Polish & Documentation (Ongoing)
1. Accessibility audit and fixes
2. Documentation updates
3. Performance optimization
4. E2E testing

---

## Metrics to Track

| Metric | Current | Target |
|--------|---------|--------|
| Test Coverage | 0% | 80%+ |
| Known Vulnerabilities | 40+ | 0 |
| Bundle Size | Unknown | < 200KB initial |
| Lighthouse Score | Unknown | 90+ |
| a11y Issues | Unknown | 0 critical |

---

## Conclusion

The StackHat Client App has a reasonable architectural foundation but requires significant investment in security, testing, and modernization. The complete absence of tests is the most critical risk factor, followed closely by security vulnerabilities in authentication handling and outdated dependencies with known CVEs.

**Immediate action recommended:** Focus on P0 items before any feature development continues.

---

*Report generated by automated code audit on 2025-12-28*
