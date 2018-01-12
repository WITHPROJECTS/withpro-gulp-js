webサイト向けJavaScript開発環境

| engines | version |
|---------|---------|
| node.js | ^8.9.3  |
| npm     | ^5.6.0  |

以下のことが出来ます。

- jsファイルの監視とBabelを使ったビルド
- jsファイルの結合

# インストール

```
$ npm i git+ssh://git@github.com:WITHPROJECTS/withpro-gulp-js.git\#v1
```

# 使い方

```js
// gulpfile.js
let task = require('withpro-gulp-js');

task
    /**
     * 入力パスの設定
     * task.setPath( 'input', path={} );
     *
     * @arg    {string}        inout
     * @arg    {Object}        [path={}]
     * @arg    {string}        [path.root=__dirname] 入力ファイル群のルートディレクトリパス
     * @arg    {string}        [path.js='']          コンパイル前のJSファイルが入っているディレクトリのパス path.rootからの相対パス
     * @return {TaskAssist}
     */
    .setPath( 'input', {
        'root' : path.join( __dirname, 'src' ),
        'js'   : 'js'
    })
    /**
     * 出力パスの設定
     * task.setPath( 'output', path={} );
     *
     * @arg    {string}     inout
     * @arg    {Object}     [path={}]
     * @arg    {string}     [path.root=__dirname] 出力ファイル群のルートディレクトリパス
     * @arg    {string}     [path.css='']         jsファイルを出力するディレクトリのパス path.rootからの相対パス
     * @return {TaskAssist}
     */
    .setPath( 'output', {
        'root' : path.join( __dirname, 'build' ),
        'js'   : 'js'
    });
```

## 実行

```bash
# JSファイルの監視
$ npm run watch:js
```

```bash
# JSファイルのコンパイル
$ npm run build:js
```

buildタスク前にはconcatタスクが実行されます。

```bash
# JSファイル結合
$ npm run concat
```

# 設定変更

setOption関数を使うことでタスクの挙動を変更することが出来ます。

```js
// gulpfile.js
let task = require('withpro-gulp-js');

/**
 * オプションをセットする
 * @arg    {string}     name        設定名
 * @arg    {Object}     option      設定する値
 * @arg    {boolean}    [diff=true] true：差分　false：差し替え
 * @return {TaskAssist}
 */
task.setOption( 'babel', {} );
```

設定名(name)は以下のパッケージを指します。

| name       | package                                                          |
|------------|------------------------------------------------------------------|
| babel      | [gulp-babel](https://www.npmjs.com/package/gulp-babel)           |
| pleeease   | [gulp-pleeease](https://www.npmjs.com/package/gulp-pleeease)     |
| plumber    | [gulp-plumber](https://www.npmjs.com/package/gulp-plumber)       |
| changed    | [gulp-changed](https://github.com/sindresorhus/gulp-changed)     |
| sourcemaps | [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps) |

# ファイルの結合

ファイルの結合を行うには設定変更と同様SetOptionを利用します。

```js

let task = require('withpro-gulp-js');

let list = {
    'result/concat1' : [
        'partial/_base',
        'partial/_file1',
        'partial/_file2'
    ],
    'result/concat2' : [
        'partial/_base',
        'partial/_file3'
    ]
}
task.setOption('concat', { 'use' : true, 'list' : list });
```

上記のようにオブジェクトで結合ファイル(キー)と部分ファイル(値)を表します。  
注意点は以下の通り

- useプロパティは必ずtrueにしてください。listを設定してもuseがfalseだと動作しません。
- 値は配列に格納し上から順に結合されていきます。  
- 部分ファイルの名前は\_(アンダースコア)から初めてください。でないと部分ファイルが出力されてしまいます。
- 結合ファイル、部分ファイル共にパスはjs入力パスからの相対パスです。
- 拡張子は入力しないでください。

例えば以下のような構成の場合

```
プロジェクト
├ src // 入力元
│  ├ partial
│  │  ├ _base.js
│  │  ├ _file1.js
│  │  ├ _file2.js
│  │  └ _file3.js
│  └ ...
│
├ build // 出力先
├ ...
└ ...
└
```

「src/result/concat1.js」と「src/result/concat2.js」が結合ファイルとして出力されます。
その後build:jsタスクを通して
「build/result/concat1.js」と「build/result/concat2.js」がコンパイルファイルとして出力されます。
