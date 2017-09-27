JavaScript(Babel) development environment for web site.

# What this can do

- watching and building of js files.
- concatenate js files.

## Usage

```js
// gulpfile.js
let gulp = require('gulp');
let conf = require('withpro-gulp-js');
conf.init();
```

## Watching
```bash
$ npm run watch
```

## Building

```bash
$ npm run build
```

## Concatenating

```bash
$ npm run concat
```

# Change configurations

For example, You want to change source files and destribution files path.
You can do it as follows.

```js
// gulpfile.js
let gulp = require('gulp');
let conf = require('withpro-gulp-js');

conf.path = {
    'project' : '/',
    'src' : {
        'js' : 'src/js'
    },
    'dest' : {
        'js'   : 'build/js'
    }
}

conf.init();
```

Make sure to change the setting before "**init()**".

## conf.path

| Property | Type   | Default  |
|----------|--------|----------|
| project  | String | /        |
| src.js   | String | src/js   |
| dest.js  | String | build/js |

## conf.options

You can pass in task options to option objects.

### conf.options.babel

[gulp-babel](https://www.npmjs.com/package/gulp-babel) options.  
Default options as follows.

| Property | Default         |
|----------|-----------------|
| minified | true            |
| comments | false           |
| presets  | Described later |

Using presets is [babel-preset-env](https://www.npmjs.com/package/babel-preset-env)  
Default options as follows.

```
presets = ['env', {
    'loose'    : true,
    'modules'  : false,
    'browsers' : conf.browsers
}];
```

# Concatenating js files

You can do to build after concatenate js files.

1. The partial file name begin "_".
2. Set concatenating list as follows.

```js
// gulpfile.js
let gulp = require('gulp');
let conf = require('./withpro-gulp-js');

conf.concat = {
    'common.js' : [
        'partial/_a.js',
        'partial/_b.js'
    ],
    'class/Video.js' : [
        'class/_Sound.js',
        'class/_Movie.js'
    ]
}

conf.init();
```

Key of concat property is output file path form conf.path.src.js.  
If you set key as 'concat/hoge.js', output to conf.path.src.js + concat/hoge.js.
