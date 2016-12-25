JavaScriptの開発環境です。

## 使い方

```bash
$ npm run js-watch  # watching js file.
$ npm run js-build  # building js file.
$ npm run js-concat # concat js file.
```

## 設定変更

単体で利用する場合、「withpro-gulp-js.js」を変更してください。

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

local moduleとして利用する場合は

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

## ファイル結合

複数のファイルを結合して出力することができます。

1. 部分ファイルのファイル名は"_"から始めます。
2. 結合リストを下記のように設定します。

```
conf : {
    ...
    'concat' : {
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

concatプロパティのキーはconf.path.src.jsからの相対的な出力パスです。  
もし、キーを'concat/hoge.js'と設定したら、conf.path.src.js + concat/hoge.jsに出力されます。
