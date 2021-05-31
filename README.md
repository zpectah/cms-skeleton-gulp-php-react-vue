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

## File structure

Location | Created | Description
--- | --- | ---
``src/`` | no | Source directory
``dev/`` | yes | Development directory
``test/`` | yes | Test directory - prepared for test
``prod/`` | yes | Production directory - prepared for deploy

Location | Description
--- | ---
``./admin/`` | Root Admin directory
``./api/`` | Root Api directory
``./web/`` | Root Web directory
``./config/`` | Config files
``./core/`` | PHP Core files
``./libs/`` | Extended libraries (Only for imports)
``./static/`` | Static files (images or whatever)
``./uploads/`` | Uploaded files from system
``./logs/`` | Log files
``./vendor/`` | Vendor directory (Composer)

## Configuration and Options
...

Type | Location | Description
--- | --- | ---
Config | src/admin/scripts/config.js | Config file imports for Admin
Config | src/admin/scripts/config.routes.ts | Config for routes and paths in Admin
Config | src/admin/scripts/config.navItems.ts | Config for navigation in Admin
Constants | src/admin/scripts/constants.ts | Constants for Admin
Constants | src/config/constants.php | Constants for Backend
Database | src/config/database.php | Configuration for Backend databases
Global * | src/config/global.json | Global configuration file
Environment | src/config/environmental.json | Configuration by environment
Options | src/config/options.json | Project options object
Options | src/config/locales.json | Locale options object
Options | src/config/nums.json |


## Api
...

Type | Path | Request | Response | Description
--- | --- | --- | --- | ---
Settings get | api/get_settings | null | {} |
Settings post | api/update_settings | {} | {} |

... TODO
