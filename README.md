
# WordPress Skeleton Theme


## About:
This theme has been developed with Underscores by Automattic as base: [http://underscores.me/](http://underscores.me/)


## SASS setup:
- Make sure you have installed Node.js and Browser-Sync* (* optional, if you wanna use it) on your computer globally
- To be able to compile Sass, you need to install node_modules locally by running `npm install` inside following directory:  `wp-content/themes/wp-skeleton/..`

This should get you up and running!


### Possible Sass setup errors:
After running `gulp` you get Error: Cannot find module ‘module-name’
This most probably means that this particular module is missing from your dependencies (package.json). The best way to fix it would be installing it manually by running `npm install module-name` (check the module docs for install instructions). This would then add it to your dependencies in `package.json` file.


## SASS compilation:
- To compile your sass, run `gulp` in the following directory: wp-content/themes/wp-skeleton/..


## SASS file structure:
If you want to add new sass files/components etc. please add them in the following directory: `wp-skeleton/src/scss/..`
Every new sass file (e.g. `_name-of-your-file.scss`) needs to be called inside our `wp-skeleton/src/scss/_core.scss` to be included in the sass compilation.

All theme variables are inside `wp-skeleton/src/scss/_config.scss` file.


## Browser Synch:
If you want Browser Synch to watch for your local path, add the path as localhost inside `wp-skeleton/gulpfile.js` file.

example: localhost: 'wp-skeleton.local/'


## SVG sprites:
Add svg icons to `wp-skeleton/src/images/icons/svgsprite/` folder

To compile svgs into sprite run: `gulp svg-sprite` inside theme directory. SVG sprite will than be compiled into: `wp-skeleton/images/icons/svgsprite.svg`

### SVG icons usage example:
`<svg class="icon-svg-arrow"><use xlink:href="#icon-arrow" /></svg>`


## Image compression:
Add all your images inside `wp-skeleton/src/images/` folder. Images (.png and .jpg formats) get compressed when running the default `gulp` task. The compressed version of the image can be found inside `wp-skeleton/images/` folder.


## Modal markup:
```
<div class="js-modal-trigger">Modal trigger</div>
<div class="modal">
    <div class="modal-overlay js-modal-overlay"></div>
    <div class="modal-canvas">
            modal canvas content
        <div class="icon-close js-modal-close"></div>
    </div>
</div>
```

## Gravity forms:
WP Skeleton theme already has basic markup styles for Gravity forms. To be able to use them, please turn off Gravity Forms CSS Output by going to: WP-Admin > Forms > Settings > Output CSS > set it to NO

Our custom form styles can be found inside file `wp-skeleton/src/scss/components/_gravity-forms.scss`
If you want form input field to ocupy only half of the form, add `ginput_left` or `ginput_right` class to the settings of this specific form input field: Appearance > Custom CSS Class.



