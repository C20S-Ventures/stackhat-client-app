# StackHat Client App - Comprehensive TODO

**Generated from Audit Report:** December 28, 2025
**Total Items:** 116 tasks across 8 categories

---

## P0 - Critical Priority (Do Immediately)

### Security Fixes

- [ ] **SEC-001**: Move authentication tokens from localStorage to httpOnly cookies
  - File: `src/stores/AuthenticationStore.js:173-174`
  - Update `setLocalStorage()` and `getLocalStorage()` functions
  - Implement backend cookie-setting endpoint
  - Update Axios to send credentials with requests

- [x] **SEC-002**: Update axios from 0.18.0 to latest (1.6.x+) ✅
  - File: `package.json`
  - Fix known CVEs including prototype pollution
  - Update any breaking API changes

- [x] **SEC-003**: Remove or secure jQuery CDN dependency ✅
  - _Done: jQuery 3.7.1 is now bundled from npm via webpack ProvidePlugin; CDN script removed from index.html_
  - File: `src/index.html:17`
  - Option A: Bundle jQuery locally via npm
  - Option B: Remove jQuery entirely (update react-bootstrap-slider)
  - Update to jQuery 3.7.x if keeping

- [x] **SEC-004**: Remove axios-progress-bar CDN link (rawgit.com deprecated) ✅
  - _Done: axios-progress-bar installed from npm; nprogress styles bundled locally (src/styles/nprogress.scss)_
  - File: `src/index.html:14`
  - Install via npm: `npm install axios-progress-bar`
  - Import CSS in main SCSS file

- [x] **SEC-005**: Remove token logging from production code ✅
  - File: `src/stores/AuthenticationStore.js:163`
  - Remove: `console.log("[AUTH][GP]", result)`
  - File: `src/stores/AuthenticationStore.js:170`
  - Remove: `console.log("[AUTH][LS]", result)`

- [x] **SEC-006**: Add request timeout to Axios configuration ✅
  - File: `src/services/Api.js`
  - Add global timeout: `Axios.defaults.timeout = 30000`

- [ ] **SEC-007**: Sanitize content in Printer.js before document.write
  - File: `src/components/print/Printer.js:9`
  - Use DOMPurify or similar sanitization library
  - Validate content source is trusted

- [ ] **SEC-008**: Add CSRF protection to API requests
  - Implement CSRF token header for state-changing requests
  - Coordinate with backend for token generation

### Critical Bug Fixes

- [x] **BUG-001**: Remove dead AngularJS code in Helper.js ✅
  - File: `src/services/Helper.js:142`
  - Remove: `angular.extend({}, obj)` - replace with `Object.assign({}, obj)` or lodash `extend`

- [x] **BUG-002**: Remove broken `filter()` function ✅
  - File: `src/services/Helper.js:113-115`
  - Remove or rewrite without `$filter` dependency

- [x] **BUG-003**: Remove broken `orderObjectBy()` function ✅
  - File: `src/services/Helper.js:116-118`
  - Remove or rewrite without `$filter` dependency

- [x] **BUG-004**: Fix unreachable code in IsInRole() ✅
  - File: `src/stores/AuthenticationStore.js:126-127`
  - Remove unreachable `console.log` after return statement

### Testing Setup

- [x] **TEST-001**: Install Jest testing framework ✅
  - `npm install --save-dev jest`

- [x] **TEST-002**: Install React Testing Library ✅
  - `npm install --save-dev @testing-library/react @testing-library/jest-dom`

- [x] **TEST-003**: Install user-event for RTL ✅
  - `npm install --save-dev @testing-library/user-event`

- [x] **TEST-004**: Configure Jest in package.json ✅
  - Add jest configuration section
  - Configure module name mapper for assets
  - Configure setup files

- [x] **TEST-005**: Add test script to package.json ✅
  - Add: `"test": "jest"`
  - Add: `"test:watch": "jest --watch"`
  - Add: `"test:coverage": "jest --coverage"`

- [x] **TEST-006**: Create Jest setup file ✅
  - Create: `src/setupTests.js`
  - Import `@testing-library/jest-dom`

- [x] **TEST-007**: Write first test for AuthenticationStore ✅
  - Create: `src/stores/__tests__/AuthenticationStore.test.js`
  - Test: `Initialise()`, `Authenticate()`, `SignOut()`, `IsInRole()`

- [x] **TEST-008**: Write first test for Api.js ✅
  - Create: `src/services/__tests__/AxiosResource.test.js`
  - Mock Axios
  - Test HTTP methods and transformations

---

## P1 - High Priority (Next Sprint)

### Dependency Updates - Core

- [x] **DEP-001**: Update React from 16.8.4 to 18.x ✅
  - Update `react` and `react-dom`
  - Replace `ReactDOM.render` with `createRoot`
  - Review deprecated lifecycle methods
  - Update any class components using `componentWillMount`, etc.

- [x] **DEP-002**: Update MobX from 5.9.0 to 6.x ✅
  - Update `mobx` and `mobx-react`
  - Replace `decorate()` with class field decorators or `makeObservable`
  - Update store patterns for MobX 6

- [x] **DEP-003**: Migrate Babel 6 to Babel 7 ✅
  - Replace `babel-core` with `@babel/core`
  - Replace `babel-loader` with updated version
  - Replace presets:
    - `babel-preset-es2015` → `@babel/preset-env`
    - `babel-preset-react` → `@babel/preset-react`
    - `babel-preset-stage-1` → individual plugins
  - Update `.babelrc` to `babel.config.js`

- [x] **DEP-004**: Replace babel-polyfill with core-js ✅
  - `npm install core-js regenerator-runtime`
  - Update entry point imports
  - Configure @babel/preset-env for polyfills

- [x] **DEP-005**: Replace node-sass with dart-sass ✅
  - _Done: node-sass replaced by sass (Dart Sass); known Bootstrap 3 deprecation noise silenced in sass-loader_
  - `npm uninstall node-sass`
  - `npm install sass`
  - Update webpack config if needed

- [ ] **DEP-006**: Update mobx-react-form
  - _Status: upgraded to v6 and the DVR plugin calls fixed to the v6 `dvr({ package })` shape; the package is now deprecated in favour of `mobx-formkit`, so migration is still open_
  - Check compatibility with MobX 6
  - Update or replace if unmaintained

### Code Quality - PropTypes/TypeScript

- [x] **TYPE-001**: Choose typing strategy (PropTypes vs TypeScript) ✅
  - Decision: PropTypes for incremental adoption
  - Document decision

- [x] **TYPE-002**: If PropTypes - Install prop-types package ✅
  - `npm install prop-types`

- [x] **TYPE-003**: Add PropTypes to all components in `src/components/` ✅
  - [x] Header.js
  - [x] Footer.js
  - [x] Content.js
  - [x] Theme.js
  - [x] LoadingBar.js
  - [x] LoadingSpinner.js

- [x] **TYPE-004**: Add PropTypes to form components ✅
  - [x] FieldGroup.js
  - [x] Input.js
  - [x] TextArea.js
  - [x] Number.js
  - [x] DatePicker.js
  - [x] DropDown.js
  - [x] CheckBoxes.js
  - [x] Evidence.js
  - [x] TagsInput.js
  - [x] InlineInput.js, InlineTextArea.js, InlineDatePicker.js
  - [x] InlineAsyncSelect.js, InlineTagsInput.js
  - [x] InlineForInput.js, InlineSeoInput.js

- [x] **TYPE-005**: Add PropTypes to modal components ✅
  - [x] SearcherModal.js
  - [x] EditorModal.js
  - [x] ConfirmModal.js
  - [x] ModalFormField.js
  - [x] PlaceholderModal.js
  - [x] BusySpinner.js

- [x] **TYPE-006**: Add PropTypes to area components ✅
  - [x] Master.js
  - [x] Login.js
  - [x] PrivateRoute.js
  - [x] ErrorBoundary.js
  - [x] ErrorContent.js

### ESLint Configuration

- [x] **LINT-001**: Update ESLint to version 8.x ✅
  - `npm install --save-dev eslint@8`

- [x] **LINT-002**: Install additional ESLint plugins ✅
  - `npm install --save-dev eslint-plugin-react-hooks`
  - `npm install --save-dev eslint-plugin-jsx-a11y`
  - `npm install --save-dev eslint-plugin-security`

- [x] **LINT-003**: Create comprehensive .eslintrc.js ✅
  - Enable recommended rules
  - Add React hooks rules
  - Add accessibility rules
  - Add security rules

- [x] **LINT-004**: Add Prettier integration ✅
  - `npm install --save-dev prettier eslint-config-prettier`
  - Create `.prettierrc`

- [x] **LINT-005**: Add lint script to package.json ✅
  - Add: `"lint": "eslint src/"`
  - Add: `"lint:fix": "eslint src/ --fix"`

- [x] **LINT-006**: Fix all ESLint errors in codebase ✅
  - _Done: 0 errors. ~950 warnings remain (mostly prop-types, unused vars, a11y click handlers) and are left as warn-level for incremental cleanup_
  - Run lint and fix issues incrementally

### Testing - Authentication Flow

- [ ] **TEST-009**: Test AuthenticationStore.Initialise()
  - _Status: covered: no stored data, valid stored data, Settings.Load failure. Missing: expired/invalid stored data_
  - Test with no stored data
  - Test with valid stored auth data
  - Test with expired/invalid stored data

- [ ] **TEST-010**: Test AuthenticationStore.Authenticate()
  - _Status: covered: successful password login, failed login. Missing: SSO login and settings-load failure after login_
  - Test successful password login
  - Test successful SSO login
  - Test failed login scenarios
  - Test error handling

- [x] **TEST-011**: Test AuthenticationStore.SignOut() ✅
  - Test localStorage clearing
  - Test state reset
  - Test callback execution

- [x] **TEST-012**: Test AuthenticationStore.IsInRole() ✅
  - Test with matching role
  - Test with non-matching role
  - Test case insensitivity

- [ ] **TEST-013**: Test PrivateRoute component
  - Test redirect when not authenticated
  - Test render when authenticated

### Testing - API Layer

- [ ] **TEST-014**: Test AxiosResource.get()
  - _Status: covered: successful get (single and all). Missing: error handling_
  - Mock Axios responses
  - Test successful get
  - Test error handling

- [ ] **TEST-015**: Test AxiosResource.create()
  - _Status: covered: successful create. Missing: write-transform assertions on the create path_
  - Test successful create
  - Test data transformation

- [x] **TEST-016**: Test AxiosResource.update() ✅
  - Test successful update
  - Test partial updates

- [x] **TEST-017**: Test AxiosResource.delete() ✅
  - Test successful delete

- [x] **TEST-018**: Test AxiosResource.query() ✅
  - Test with parameters
  - Test response transformation

- [ ] **TEST-019**: Test date conversion in AxiosResource
  - _Status: covered: ISO string conversion and non-date passthrough. Missing: nested objects_
  - Test ISO date string conversion
  - Test nested object date conversion

---

## P2 - Medium Priority (Next Quarter)

### Performance - Code Splitting

- [ ] **PERF-001**: Implement React.lazy for route components
  - Wrap Dashboard in React.lazy
  - Wrap Account in React.lazy
  - Wrap Settings in React.lazy

- [ ] **PERF-002**: Add Suspense boundaries
  - Add loading fallback components
  - Wrap lazy routes in Suspense

- [ ] **PERF-003**: Create separate chunks for areas
  - Configure webpack for dynamic imports
  - Verify chunk names in build output

- [ ] **PERF-004**: Analyze bundle size
  - `npm install --save-dev webpack-bundle-analyzer`
  - Add bundle analysis script
  - Identify largest dependencies

- [ ] **PERF-005**: Implement tree shaking verification
  - Verify lodash is imported correctly (not entire library)
  - Check moment.js locale imports

### Build System - Webpack 5

- [x] **BUILD-001**: Update Webpack from 4 to 5 ✅
  - `npm install webpack@5 webpack-cli@4 webpack-dev-server@4`

- [x] **BUILD-002**: Remove deprecated plugins ✅
  - Remove `extract-text-webpack-plugin`
  - Replace with `mini-css-extract-plugin`

- [x] **BUILD-003**: Update webpack configuration for v5 ✅
  - Update module rules syntax
  - Update plugin configurations
  - Enable asset modules (replaces file-loader, url-loader)

- [x] **BUILD-004**: Replace uglifyjs-webpack-plugin ✅
  - Webpack 5 includes terser by default
  - Remove explicit uglifyjs-webpack-plugin

- [x] **BUILD-005**: Enable webpack 5 caching ✅
  - Configure filesystem cache
  - Verify build speed improvement

- [ ] **BUILD-006**: Consolidate webpack configs
  - _Status: scripts now use webpack.prod.config.js and webpack.prodtemp.config.js is a re-export shim; base and prod configs still duplicate rules (webpack-merge is installed but unused)_
  - Rename `webpack.prodtemp.config.js` to `webpack.prod.config.js`
  - Remove or document purpose of other configs
  - Use webpack-merge for shared configuration

### Router Update

- [x] **ROUTE-001**: Update react-router-dom from 4.x to 6.x ✅
  - `npm install react-router-dom@6`

- [x] **ROUTE-002**: Update route syntax ✅
  - _Done: all route trees (Master, dashboard, account, settings) use nested <Routes>/<Route element>_
  - Replace `<Switch>` with `<Routes>`
  - Update `<Route>` component prop to element
  - Update nested routes syntax

- [x] **ROUTE-003**: Update PrivateRoute for v6 ✅
  - _Done: PrivateRoute wraps children and redirects with <Navigate replace state={{ from }}>_
  - Rewrite using new patterns
  - Use `<Outlet>` for nested routes

- [x] **ROUTE-004**: Update navigation patterns ✅
  - _Done: every <Redirect> replaced with <Navigate replace>_
  - Replace `<Redirect>` with `<Navigate>`
  - Update programmatic navigation

- [x] **ROUTE-005**: Update useHistory to useNavigate ✅
  - _Done: no useHistory usages remain; class components needing match/navigate use the withRouter shim in src/components/routing/withRouter.js_
  - Search for all useHistory usages
  - Replace with useNavigate hook

### UI Framework Update

- [ ] **UI-001**: Update Bootstrap from 3 to 5
  - `npm install bootstrap@5`
  - Remove bootstrap-sass

- [ ] **UI-002**: Update react-bootstrap from 0.32 to 2.x
  - `npm install react-bootstrap@2`

- [ ] **UI-003**: Update component imports for react-bootstrap 2
  - Update Panel to Card
  - Update Navbar syntax
  - Update form component syntax
  - Update grid system classes

- [ ] **UI-004**: Update SCSS variables for Bootstrap 5
  - Review and update custom variables
  - Update mixin usage
  - Fix any styling breaks

- [ ] **UI-005**: Remove jQuery dependency
  - Find alternative for react-bootstrap-slider
  - Remove jQuery from index.html
  - Remove webpack externals config

### CI/CD Pipeline

- [x] **CICD-001**: Update vsts-ci.yml to use modern image ✅
  - _Done: vsts-ci.yml replaced by .github/workflows/ci.yml on ubuntu-latest_
  - Replace Ubuntu 16.04 with ubuntu-latest

- [x] **CICD-002**: Add Node.js setup step ✅
  - _Done: Node version comes from .nvmrc (22)_
  - Use actions/setup-node
  - Specify Node.js version

- [x] **CICD-003**: Add npm install step ✅
  - Cache node_modules for faster builds

- [x] **CICD-004**: Add linting step ✅
  - Run ESLint on PR

- [x] **CICD-005**: Add test step ✅
  - Run Jest tests
  - Fail build on test failure

- [x] **CICD-006**: Add build step ✅
  - Run production build
  - Verify build succeeds

- [x] **CICD-007**: Add coverage reporting ✅
  - Generate coverage report
  - Upload to coverage service (Codecov, etc.)

- [x] **CICD-008**: Add security scanning ✅
  - Add npm audit step
  - Consider Snyk or similar

### Integration Testing

- [ ] **ITEST-001**: Set up MSW (Mock Service Worker)
  - `npm install --save-dev msw`
  - Create mock handlers

- [ ] **ITEST-002**: Write integration test for login flow
  - Test form submission
  - Test error states
  - Test redirect after login

- [ ] **ITEST-003**: Write integration test for logout flow
  - Test logout button
  - Test session cleanup
  - Test redirect to login

- [ ] **ITEST-004**: Write integration test for dashboard
  - Test data loading
  - Test error handling

### Accessibility

- [ ] **A11Y-001**: Add skip navigation link
  - Add "Skip to main content" link
  - Ensure proper focus management

- [ ] **A11Y-002**: Audit form accessibility
  - Add aria-describedby for error messages
  - Ensure all inputs have labels
  - Add aria-required for required fields

- [ ] **A11Y-003**: Add alt text to all images
  - Audit all img tags
  - Add descriptive alt text

- [ ] **A11Y-004**: Ensure keyboard navigation
  - Test tab order
  - Add focus indicators
  - Ensure all interactive elements are focusable

- [ ] **A11Y-005**: Add ARIA landmarks
  - Add role="main" to main content
  - Add role="navigation" to nav
  - Add role="banner" to header

- [ ] **A11Y-006**: Test with screen reader
  - Test with NVDA or VoiceOver
  - Document and fix issues

- [ ] **A11Y-007**: Run axe accessibility audit
  - Install axe browser extension
  - Fix all critical issues

### Error Handling

- [ ] **ERR-001**: Implement error logging service
  - File: `src/components/errors/ErrorBoundary.js:14`
  - Uncomment and implement: `Api.Error(error, info)`
  - Consider Sentry or similar service

- [ ] **ERR-002**: Add API error handling
  - Implement retry logic for network errors
  - Add user-friendly error messages

- [ ] **ERR-003**: Add request timeout handling
  - Show timeout message to user
  - Provide retry option

---

## P3 - Low Priority (Backlog)

### Documentation

- [x] **DOC-001**: Update package.json metadata ✅
  - _Done: repository URL, description, and author updated_
  - Fix repository URL (currently points to boilerplate)
  - Update description
  - Add author information

- [ ] **DOC-002**: Create CONTRIBUTING.md
  - Document development setup
  - Document PR process
  - Document coding standards

- [ ] **DOC-003**: Create SECURITY.md
  - Document security policy
  - Add vulnerability reporting process

- [x] **DOC-004**: Update README.md ✅
  - _Done: setup, scripts, structure, and a Known Gaps section_
  - Add project description
  - Add setup instructions
  - Add available scripts
  - Add architecture overview

- [ ] **DOC-005**: Add JSDoc comments to key functions
  - Document store methods
  - Document service functions
  - Document utility functions

### Component Documentation

- [ ] **STORY-001**: Install Storybook
  - `npx storybook init`

- [ ] **STORY-002**: Create stories for form components
  - FieldGroup story
  - DatePicker story
  - DropDown story

- [ ] **STORY-003**: Create stories for layout components
  - Header story
  - Footer story
  - Content story

- [ ] **STORY-004**: Create stories for modal components
  - SearcherModal story
  - ConfirmModal story

### Performance Monitoring

- [ ] **MON-001**: Add performance monitoring
  - Consider Web Vitals tracking
  - Add to production build

- [ ] **MON-002**: Add error tracking service
  - Configure Sentry or similar
  - Add source maps upload

- [ ] **MON-003**: Add bundle size CI check
  - Fail build if bundle exceeds threshold
  - Track bundle size over time

### E2E Testing

- [ ] **E2E-001**: Set up Playwright or Cypress
  - Choose testing framework
  - Install and configure

- [ ] **E2E-002**: Write E2E test for login
  - Test happy path
  - Test error scenarios

- [ ] **E2E-003**: Write E2E test for navigation
  - Test all routes
  - Test protected routes

- [ ] **E2E-004**: Add E2E tests to CI pipeline
  - Run on PR
  - Run on deploy

### Offline Support

- [ ] **OFFLINE-001**: Implement service worker
  - Use Workbox for caching
  - Cache static assets

- [ ] **OFFLINE-002**: Add offline detection
  - Show offline indicator
  - Queue failed requests

- [ ] **OFFLINE-003**: Implement request caching
  - Cache GET requests
  - Implement cache invalidation

### Technical Debt

- [ ] **DEBT-001**: Remove all console.log statements
  - Search for remaining console.log
  - Replace with proper logging or remove

- [ ] **DEBT-002**: Remove commented-out code
  - File: `src/services/Helper.js` - AngularJS comments
  - File: `src/components/Header.js` - help toggle
  - Other files with commented code

- [ ] **DEBT-003**: Standardize async patterns
  - Convert callbacks to async/await
  - Ensure consistent Promise handling

- [ ] **DEBT-004**: Refactor singleton stores
  - Make stores instantiable for testing
  - Use dependency injection pattern

- [ ] **DEBT-005**: Clean up unused dependencies
  - Audit package.json
  - Remove unused packages

---

## Tracking

### Progress Summary

| Category | Total | Completed | Remaining |
|----------|-------|-----------|-----------|
| P0 - Critical | 20 | 17 | 3 |
| P1 - High | 29 | 22 | 7 |
| P2 - Medium | 43 | 18 | 25 |
| P3 - Low | 24 | 2 | 22 |
| **Total** | **116** | **59** | **57** |

### Verification (October 1, 2026)

Run from a clean `npm ci` on Node 22:

- `npm run lint`: 0 errors (953 warnings)
- `npm test -- --coverage`: 75/75 tests pass; coverage ratchet set just below the current ~10%
- `npm run prod`: builds; only bundle-size advisories remain (see PERF-001..PERF-005)
- Browser smoke test (Chromium, API stubbed): login page renders, protected routes redirect anonymous
  users to `/`, logout works, and with a stubbed `ClientSettings` response the dashboard renders for a
  restored session.

### Pre-existing Gaps (present since the initial commit, not modernization regressions)

- [ ] **GAP-001**: Add `Api.ClientSettings` (called by `ClientSettingStore.Load()` but never defined).
  Without it, every login and session restore fails and signs the user out.
- [ ] **GAP-002**: Supply the stores that the account and settings screens inject (`AppUserStore`,
  `UserClassificationStore`, `UserTagStore`, `ResourceStore`, `CaseStudyTemplateStore`,
  `NarrativeTemplateStore`, `ResearchIdeaTemplateStore`, `AdminAppUserStore`, `SearcherStore`) and register
  them in `indexApp.js` (currently `new Stores([])`).
- [ ] **GAP-003**: Replace `riek` (React 15-era; relies on string refs and `findDOMNode`, both removed in React 19).
- [ ] **GAP-004**: Wire the settings area into `Master.js` routing once its stores exist (it is not routed today).

### Sprint Planning Reference

**Sprint 1 (Week 1-2):** P0 items (22 tasks)
- Security fixes: 8 tasks
- Critical bugs: 4 tasks
- Testing setup: 10 tasks

**Sprint 2 (Week 3-4):** P1 Core Dependencies (15 tasks)
- DEP-001 through DEP-006
- Initial PropTypes work

**Sprint 3 (Week 5-6):** P1 Code Quality (26 tasks)
- Complete PropTypes
- ESLint configuration
- Authentication tests

**Sprint 4-6 (Week 7-12):** P2 items (43 tasks)
- Build system modernization
- Router & UI updates
- CI/CD pipeline
- Integration tests

**Ongoing:** P3 items as capacity allows

---

*Last Updated: October 1, 2026*
