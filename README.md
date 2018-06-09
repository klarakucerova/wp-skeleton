
# WordPress Skeleton Theme


## About:
This theme has been developed with Underscores by Automattic as base: [http://underscores.me/](http://underscores.me/)


## SASS setup:
- Make sure you have installed Node.js and Browser-Sync* (* optional, if you wanna use it) on your computer globally
- To be able to compile Sass, you need to install node_modules locally by running `npm install` inside following directory:  wp-content/themes/wp-skeleton/.. 

This should get you up and running!


### Possible Sass setup errors:
After running `npm install` you get Error: Cannot find module ‘module-name’
This most probably means that this particular module is missing from your dependencies (package.json). The best way to fix it would be installing it manually by running `npm install module-name` (check the module docs for install instructions). This would then add it to your dependencies in `package.json` file.


## SASS compilation:
- To compile your sass, run `gulp` in the following directory: wp-content/themes/wp-skeleton/..


## SASS file structure:
If you want to add new sass files/components etc. please add them in the following directory: `wp-content/themes/wp-skeleton/src/scss/..`
Every new sass file (e.g. `_name-of-your-file.scss`) needs to be called inside our `wp-content/themes/wp-skeleton/src/scss/_core.scss` to be included in sass compilation.

All theme variable are inside `wp-content/themes/wp-skeleton/src/scss/_config.scss` file.


## Modal markup:
`<div class="js-modal-trigger">Modal trigger</div>
<div class="modal">
    <div class="modal-overlay js-modal-overlay"></div>
    <div class="modal-canvas">
            modal canvas content
        <div class="icon-close js-modal-close"></div>
    </div>
</div>`

## SVG sprites:
Add svg icons to: `wp-content/themes/wp-skeleton/src/images/icons/svgsprite/` folder

and run `gulp svg-sprite` to compile them..

### SVG icons usage example
`<svg class="icon-svg-arrow"><use xlink:href="#icon-arrow" /></svg>`
