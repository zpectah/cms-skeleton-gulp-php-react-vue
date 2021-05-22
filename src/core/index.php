<?php

/*
 * Composer
 */
require PATH_PFX . 'vendor/autoload.php';


/*
 * Configs and Constants
 */
require PATH_PFX . 'config/constants.php';


/*
 * Utils
 */
require PATH_PFX . 'core/utils/Helpers.php';


/*
 * Services
 */
require PATH_PFX . 'core/service/DataService.php';
require PATH_PFX . 'core/service/SessionService.php';
require PATH_PFX . 'core/service/EmailService.php';


/*
 * Model: App
 */
require PATH_PFX . 'core/model/Settings.php';
require PATH_PFX . 'core/model/Profile.php';
require PATH_PFX . 'core/model/Users.php';
require PATH_PFX . 'core/model/Posts.php';
require PATH_PFX . 'core/model/Pages.php';
require PATH_PFX . 'core/model/Tags.php';
require PATH_PFX . 'core/model/Requests.php';
require PATH_PFX . 'core/model/Messages.php';
require PATH_PFX . 'core/model/Translations.php';
require PATH_PFX . 'core/model/Categories.php';
require PATH_PFX . 'core/model/Uploads.php';
require PATH_PFX . 'core/model/Menu.php';
require PATH_PFX . 'core/model/MenuItems.php';

/*
 * Model: Members
 */
require PATH_PFX . 'core/model/Members/Members.php';

/*
 * Model: Crm
 */
require PATH_PFX . 'core/model/Crm/Campaigns.php';

/*
 * Model: Market
 */
require PATH_PFX . 'core/model/Market/Products.php';
require PATH_PFX . 'core/model/Market/Stores.php';
require PATH_PFX . 'core/model/Market/Producers.php';
require PATH_PFX . 'core/model/Market/Payments.php';
require PATH_PFX . 'core/model/Market/Distributors.php';
require PATH_PFX . 'core/model/Market/Deliveries.php';

/*
 * Handlers
 */
require PATH_PFX . 'core/handler/Installer.php';
require PATH_PFX . 'core/handler/Handyman.php';

/*
 * Api
 */
require PATH_PFX . 'core/api/Request.php';



