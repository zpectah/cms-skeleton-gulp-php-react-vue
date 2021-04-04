# CMS skeleton

**!! Warning: System is still in development !!**

## Description
Content Managing System based on Apache server, PHP core and React components.

## Requirements
* Installed globally:
	- Node.js (NPM) or YARN
	- Gulp CLI
	- Apache Server with MySQL database (XAMP / MAMP ...)
	- PHP and Composer

## Dependencies
* JavaScript/TypeScript:
	- Gulp and @babel
	- React
	- styled-components
	- Redux
	- i18n
	- lodash
	- moment.js
* PHP 7+:
	- BladeOne (eftec/bladeone)

## Development
### Install
- Install node packages ``yarn install``
- Prepare vendors ``yarn prepare``

### Watch
- Watching changes for whole project ``yarn start``
- Watching changes for **admin/** and backend files ``yarn start:admin``
- Watching changes for **web/** ``yarn start:web``

### Build
- Create production bundle ``yarn build``

## File structure
- Main root directory:
	- ``src/`` - Source directory
	- ``dev/`` - Development directory (created)
	- ``prod/`` - Production directory - prepared for test or deploy (created)
- Source:
	- ``admin/`` - Root Admin directory
	- ``api/`` - Root Api directory
	- ``web/`` - Root Web directory
	- ``config/`` - Config files
	- ``core/`` - PHP Core files
	- ``libs/`` - Extended libraries (exist only for src/)
	- ``static/`` - Static files (images or whatever)
	- ``uploads/``* - Uploaded files from system
	- ``logs/``* - Log files
	- ``vendor/``* - Vendor directory (Composer)

(*) File or directory created and managed dynamically

## Configuration and Options

