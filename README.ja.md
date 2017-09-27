webサイト向けJavaScript(Babel)開発環境

# 出来ること

- jsファイルの監視とBabelを使ったビルド
- jsファイルの結合

# 使い方

```js
// gulpfile.js
let gulp = require('gulp');
let conf = require('withpro-gulp-js');
conf.init();
```

## 監視
```bash
$ npm run watch
```

## ビルド

```bash
$ npm run build
```

## ファイル結合

```bash
$ npm run concat
```
```bash
$
```

# 設定変更

出力先の変更などは以下の様にします。

```js
// gulpfile.js
let gulp = require('gulp');
let conf = require('./withpro-gulp-js');

conf.path =  {
    'project' : '/',
    'src' : {
        'js' : 'src/js'
    },
    'dest' : {
        'js' : 'build/js'
    }
}
conf.init();
```

設定の変更は必ず"**init()**"の前に行ってください。

## conf.path

| プロパティ | 型     | 初期値   |
|------------|--------|----------|
| project    | String | /        |
| src.js     | String | src/js   |
| dest.js    | String | build/js |

## conf.options

options オブジェクトにはタスクのオプションを渡すことができます。

### conf.options.babel

[gulp-babel](https://www.npmjs.com/package/gulp-babel)のオプション  
以下のオプションがデフォルトで設定されています。

| プロパティ   | 初期値 |
|--------------|--------|
| minified     | true   |
| comments     | false  |
| presets      | 後述   |

presetsは[babel-preset-env](https://www.npmjs.com/package/babel-preset-env)を使っています。  
デフォルトの設定は以下の通りです。

```
presets = ['env', {
    'loose'    : true,
    'modules'  : false,
    'browsers' : conf.browsers
}];
```

# ファイル結合

複数のファイルを結合して出力することができます。

1. 部分ファイルのファイル名は"_"から始めます。
2. 結合リストを下記のように設定します。

```
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

concatプロパティのキーはconf.path.src.jsからの相対的な出力パスです。  
もし、キーを'concat/hoge.js'と設定したら、conf.path.src.js + concat/hoge.jsに出力されます。
