Sass develop env.

## Usage

```bash
$ npm run watch # watching sass file.
$ npm run build # building sass file.
```

## change configuration

if only use it. you will change code on withpro-gulp-sass.js.

```js
conf : {
    'path' : {
        'project' : '/', // project root from web root.
        'src' : {
            'sass' : 'src/sass',   // Sass files dir.
            'font' : 'src/font',   // font files dir.
            'lib'  : ['src/sass'], // Sass lib. dir.
        },
        'dest' : {
            'css'   : 'build/css', // css files dir.
            'image' : 'build/img', // image files dir.
            'font'  : 'build/font' // font files dir. (outputed)
        }
    },
    'browsers' : ['last 3 version'] // gulp-pleeeease support level.
}
```

Not so, when you wanna use it as local module.

```js
let gulp = require('gulp');
let wgs  = require('withpro-gulp-sass');

// -----------------------------------------------------------------------------
// change configuration.
// wgs.path.src.sass = 'assets/sass';
// wgs.path.src.font = 'assets/font';
// -----------------------------------------------------------------------------

let keys = Object.keys(withproGulpSass.functions);
keys.forEach((key)=>{
    let f = withproGulpSass.functions;
    if(Array.isArray(f[key])){
        if(typeof f[key] === 'function'){
            gulp.task(key, f[key][0]);
        }else{
            gulp.task(key, f[key][0], f[key][1]);
        }
    }else{
        gulp.task(key, f[key]);
    }
});
```