JS develop env.

## Usage

```bash
$ npm run js-watch # watching js file.
$ npm run js-build # building js file.
```

## Change configuration

if only use it. you will change code on withpro-gulp-js.js.

```js
conf : {
    'path' : {
        'project' : '/', // project root from web root.
        'src' : {
            'js' : 'src/js',   // js files dir.
        },
        'dest' : {
            'js'   : 'build/js', // js files dir.
        }
    },
    'browsers' : ['last 3 version'] // support level.
}
```

Not so, when you wanna use it as local module.

```js
let gulp = require('gulp');
let wgjs = require('withpro-gulp-js');

// -----------------------------------------------------------------------------
// change configuration.
// wgs.path.src.js = 'assets/js';
// -----------------------------------------------------------------------------

let keys = Object.keys(wgjs.functions);
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

## Concatenate

you can concatenate any files.

1. partial files name is begin with "_".
2. add set to concatenation config as follows.

```
conf : {
    ...
    'jsConcat' : {
        'hoge.js' : [
            'concat/_child1.js',
            'concat/_child2.js'
        ],
        'fuga.js' : [
            'concat/_child3.js',
            'concat/_child4.js'
        ]
    }
}
```

key of jsConcat property is output file path form conf.path.src.js.  
if you set key as 'concat/hoge.js', output to conf.path.src.js + concat/hoge.js.
