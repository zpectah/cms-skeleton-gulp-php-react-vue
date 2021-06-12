# CMS skeleton

**!! Warning: System is still in development !!**

## Description
Content Managing System based on Apache server, PHP core and React components.

## Requirements
* Installed globally:
	- Node.js (NPM) or YARN
	- Gulp CLI
* PHP and Composer
* Apache Server with MySQL database (XAMP / MAMP ...)

## Dependencies
* JavaScript:
	- TypeScript
	- Babel
	- React
	- styled-components
	- Redux
	- i18n
	- lodash
	- moment.js
	- ...more
* PHP 7+:
	- bladeone
	- php-image-resize
	- mysqldump-php
* Styles:
	- Sass/SCSS

## Development configuration
### Virtual Host
```
<VirtualHost *:80>
    DocumentRoot "/path-to-project-root/dev/"
    ServerName cms-skeleton
    ServerAlias cms-skeleton
</VirtualHost>
```
### Hosts
```
127.0.0.1		cms-skeleton
```

## Development tasks
### Install
- ``% yarn install`` - Install node packages
- ``% yarn initial`` - Prepare vendors

### Watch
- ``% yarn start`` - Watching changes for whole project
- ``% yarn start:admin`` - Watching changes for **admin/** and backend files
- ``% yarn start:web`` - Watching changes for **web/**

### Build
- ``% yarn dev`` - Create development bundle
- ``% yarn test`` - Create test bundle
- ``% yarn build`` - Create production bundle

## Environment directories

Location | Description
--- | ---
``src/`` | Source directory
``dev/`` | Development directory
``test/`` | Test directory - prepared for test
``prod/`` | Production directory - prepared for deploy

## File structure

Location | Description
--- | ---
``src/admin/`` | Root Admin directory
``src/api/`` | Root Api directory
``src/web/`` | Root Web directory
``src/config/`` | Config files
``src/core/`` | PHP Core files
``src/libs/`` | Extended libraries (Only for imports)
``src/static/`` | Static files (images or whatever)
``src/vendor/`` | Vendor directory (Composer)
``$/uploads/`` | Uploaded files from system
``$/logs/`` | Log files, if any

## Configuration and Options files

Name | Type | Location | Rebuild | Description
--- | --- | --- | --- | ---
Config | Admin | ``src/admin/scripts/config.js`` | true | Config file imports
Constants | Admin | ``src/admin/scripts/constants.ts`` | true | JavaScript Constants
Constants | Backend | ``src/config/constants.php`` | true | PHP Constants
Database | Backend | ``src/config/database.php`` | true | Configuration for Backend databases
Global | All | ``src/config/global.json`` | true | Global configuration file
Environment | All | ``src/config/environmental.json`` | true | Configuration by environment
Options | All | ``src/config/options.json`` | true | Project options object
Locales | All | ``src/config/locales.json`` | true | Locale options object
Numbers | All | ``src/config/nums.json`` | true | ...


## Api paths

Path | Request | Response | Description
--- | --- | --- | ---
``/api/get_settings`` | null | {} |
``/api/update_settings`` | {} | {} |

... TODO
