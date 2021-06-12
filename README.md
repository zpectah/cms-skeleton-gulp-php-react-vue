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

## Development
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

### Install
- ``% yarn install`` - Install node packages
- ``% yarn initial`` - Prepare vendors

### Watch
- ``% yarn start`` - Watching changes for whole project
- ``% yarn start:admin`` - Watching changes for **admin/** and backend files
- ``% yarn start:web`` - Watching changes for **web/**

### Build
- ``% yarn dev`` - Create development bundle
- ``% yarn build`` - Create production bundle

## Environment directories

Location | Created | Description
--- | --- | ---
``src/`` | no | Source directory
``dev/`` | yes | Development directory
``test/`` | yes | Test directory - prepared for test
``prod/`` | yes | Production directory - prepared for deploy

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

## Configuration and Options

Name | Type | Location | Description
--- | --- | --- | ---
Config | Admin | src/admin/scripts/config.js | Config file imports
Constants | Admin | src/admin/scripts/constants.ts | JavaScript Constants
Constants | Backend | src/config/constants.php | PHP Constants
Database | Backend | src/config/database.php | Configuration for Backend databases
Global | All | src/config/global.json | Global configuration file
Environment | All | src/config/environmental.json | Configuration by environment
Options | All | src/config/options.json | Project options object
Locales | All | src/config/locales.json | Locale options object
Numbers | All | src/config/nums.json | ...


## Api

Path | Request | Response | Description
--- | --- | --- | ---
``/api/get_settings`` | null | {} |
``/api/update_settings`` | {} | {} |

... TODO
