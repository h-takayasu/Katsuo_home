// ************************ ライブラリインポートエリア ************************

// THREE.js の基本ライブラリインポート
import * as THREE from './three.js-master/build/three.module.js';
// カメラ制御などを制御するorbitcontrolsをインポート
import { OrbitControls } from './three.js-master/examples/jsm/controls/OrbitControls.js';
// GLTF形式のファイルリードを行うクラス: GLTFLoaderをインポート
import { GLTFLoader } from './three.js-master/examples/jsm/loaders/GLTFLoader.js';

// ************************ ライブラリインポートエリア ************************

// ************************ 変数宣言エリア ************************

// letはjavascriptにおける変数宣言(dimのようなもの)
let scene, camera, renderer, mixer, actions = {};
// 2023-10-22 10:39:16 lastTime変数定義 STR
let lastTime;
// 2023-10-22 10:39:16 lastTime変数定義 END
// 2023-10-23 20:25:12 アニメーションブレンド STR
// MorphBlendMeshを初期化するための変数を追加
let blendMesh;
// 2023-10-23 20:25:12 アニメーションブレンド END
// 2023-10-22 13:34:07 アニメーションをURLから取得するための変数 STR
window.activeAnimationName = "kedaruge";
// 2023-10-22 13:34:07 アニメーションをURLから取得するための変数 END

// ************************ 変数宣言エリア ************************

// イベントリスナの追加: IDがkedarugeBUttonのHTML要素がクリックされた時に実行する関数を指定
// イベントリスナとは要するに特定の動作に反応してこちらからアクションさせるもの
document.getElementById('kedarugeButton').addEventListener('click', () => playAnimation('kedaruge'));
document.getElementById('panchButton').addEventListener('click', () => playAnimation('panch.001'));
// 2023-10-22 10:31:59 速度制御のイベントリスナを追加 STR
// eventで入力数値の詳細を受け取る
// javascriptの場合はif文の中かっこが不要なため(mixerが存在すれば)mixerltimeScaleにspeed(スライダに入力した速度)を代入する
// parseFloatで入力数値の変換を行う
document.getElementById('speedControl').addEventListener('input', (event) => {
    const speed = parseFloat(event.target.value);
    if (mixer) mixer.timeScale = speed;
});
// 2023-10-22 10:32:18 速度制御のイベントリスナを追加 END
init();
// 2023-10-22 10:43:46 animate非有効化 STR
// animate();
// 2023-10-22 10:43:46 animate非有効化 STR

function init() {
    // 3dオブジェクトを配置するためのシーンを作成
    scene = new THREE.Scene();
    // カメラの設定を定義
    // PerspectiveCameraは遠近法の効果を持ったカメラを作成する
    // 引数一覧
    // 視野角: カメラがどのくらい広い範囲をキャッチするか
    // アスペクト比: 画面横の長さを縦の長さで割った比率
    // 近クリップ面: この距離よりも近いオブジェクトは画面表示されない
    // 遠クリップ面: この距離よりも遠いオブジェクトは画面表示されない
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // カメラ位置の調整
    // z=5でカメラの位置を中心から少し後ろに下げている
    camera.position.z = 5;

    // THREE.jsを用いてのブラウザへのレンダリング設定
    // antialias: trueによって画面のジャギーを滑らかにしている
    renderer = new THREE.WebGLRenderer({ antialias: true });
    // レンダラーのサイズ定義
    // レンダラーのサイズ: 3DCGを表示させるためのキャンバスサイズ
    // window.innerHeight: ビューポート（コンテンツを表示するエリア）の高さを取得
    renderer.setSize(window.innerWidth, window.innerHeight);
    // レンダリングする際の背景色を定義 現在はちょっと灰色
    renderer.setClearColor(0xeeeeee);  
    // documentに対してrenderer.domElementを追加
    // これによってCGが反映される
    document.body.appendChild(renderer.domElement);

    // カメラコントロール情報を定義するクラス
    // 動かすためのcameraインスタンスを渡す
    // 操作を受け付ける3DCGのキャンバス要素を渡す
    const controls = new OrbitControls(camera, renderer.domElement);

    // アンビエントライトを定数として定義
    // アンビエントライト: 全方向から均等に光を放つライトのこと
    // 引数: ライトの色、光の強度（0-1)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // ディレクショナルライトを定数として定義
    // position.setでライトの位置を定義
    // .normalizedeで位置ベクトルを正規化し、ライト強度を均一にする
    // 正規化: ベクトルの長さを1にすること
    // ベクトル: 向きと大きさ=長さを持った指向のこと 風だと10km/h 南東のようなイメージ
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    // GLTFファイル（アニメーション情報をもてる3DCGファイル）を読み込むGLTFローダーを定義
    const loader = new GLTFLoader();

    // URLのクエリストリングからパラメータを取得する関数
    // URLから取得するパラメータ名を第一引数として取得する
    // window.location.hrefで現在のURLを取得
    function getParameterByName(name, url = window.location.href) {
        // エスケープ対象の文字列を置換して扱えるようにする
        name = name.replace(/[\[\]]/g, '\\$&');
        // 正規表現を作成して文字列探索で使いやすくする
        // urlから指定されたパラメータを探す
        // nullもしくはブランクであれば何も返さない
        const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        // decodeURIComponentでエンコード
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    // アニメーション名を取得
    const animationName = getParameterByName('animation');

    // 指定したパスのファイルを読み込む
    // 読み込みに成功したら(gltf)以降の処理が始まる
    // cosoleに読み込みが完了しているか確認するためのメッセージを定義
    // 読み込んだモデル情報をmodel定数に代入
    // シーンにmodel定数を渡す
    // アニメーション制御ができるミキサーを定義
    // gltf.animations.forEach()でモデルのアニメーション情報を一つ一つ取り出して処理をしている
    // アニメーション情報をactionsに渡す
    // アクションをプレイ
    loader.load('../asset/models/soleil-san_for_Website.glb', (gltf) => {
        console.log("Model loaded successfully");
        const model = gltf.scene;
        scene.add(model);

        // 2023-10-23 20:26:08 アニメーションブレンド STR
        // MorphBlendMeshを作成し、ブレンドするためのアニメーションクリップを登録
        blendMesh = new THREE.MorphBlendMesh(model.geometry, model.material);
        scene.add(blendMesh);
        
        gltf.animations.forEach((clip) => {
            blendMesh.addAnimation(clip, clip.duration);
            if(clip.name === animationName) {
                blendMesh.playAnimation(clip.name, 0.1);
            }
        });
        // 2023-10-23 20:26:08 アニメーションブレンド END

        mixer = new THREE.AnimationMixer(model);
        gltf.animations.forEach((clip) => {
            actions[clip.name] = mixer.clipAction(clip);
        });

        // URLから取得したアニメーション名を再生する
        if (animationName && actions[animationName]) {
            actions[animationName].play();
        } else {
            // デフォルトのアニメーションを再生
            actions['kedaruge'].play();
        }
    });
    // 2023-10-22 10:40:16 lastTimeの代入 STR
    lastTime = Date.now();
    animate();  // animateの呼び出しをinitの終わりに移動    
    // 2023-10-22 10:40:16 lastTimeの代入 STR
}

// 2023-10-22 10:31:36 function animateを編集 STR
// function animate() {
//     requestAnimationFrame(animate);
//     if (mixer) mixer.update(0.01);
//     renderer.render(scene, camera);
// }

// let lastTime = Date.now();

function animate() {
    const currentTime = Date.now();
    const deltaTime = (currentTime - lastTime) / 1000;  // seconds
    lastTime = currentTime;

    // animate関数をループさせてアニメーションをループさせる
    requestAnimationFrame(animate);

    // アニメーションの更新
    // deltaTimeは処理速度やブラウザの状態に依存せずアニメーションの動きを一定に保つために利用する
    if (mixer) mixer.update(deltaTime);
    // 画面描写処理
    renderer.render(scene, camera);
}

// 2023-10-23 20:27:09 アニメーションブレンド STR
// 2023-10-22 10:31:27 function animateを編集 END
// ユーザがボタンを押したとき対応するアクションを引数として受け取り該当するアニメーションをプレイ
// function playAnimation(name) {
//     for (let actionName in actions) {
//         actions[actionName].stop();
//     }
//     actions[name].play();
//     // 2023-10-22 13:35:42 アニメーションタイトルを取得
//     activeAnimationName = name;
//     // 2023-10-22 13:35:42 アニメーションタイトルを取得
// }
function playAnimation(name) {
    if (actions[name]) {
        const action = actions[name];

        // 他のアクションを停止
        for (const key in actions) {
            if (actions[key] !== action) {
                actions[key].stop();
            }
        }

        // アクションを再生
        action.reset();
        action.play();
    }
}
// 2023-10-23 20:27:09 アニメーションブレンド END

