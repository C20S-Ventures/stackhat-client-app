// define app version (injected at build time by webpack DefinePlugin)
/* global __APP_VERSION__ */
const Version = typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : 'dev'

export default Version
