// URLのクエリストリングからパラメータを取得する関数
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// シェアボタンがクリックされたときの処理
document.getElementById("shareButton").addEventListener("click", function() {
    const currentUrl = window.location.href.split('?')[0]; // クエリストリングを除いた現在のURL
    const selectedAnimation = document.getElementById("animationSelect").value; // ドロップダウンメニューから選択されたアニメーション名
    const shareUrl = `${currentUrl}?animation=${selectedAnimation}`;
    
    // シェア用のURLをテキストボックスに表示
    document.getElementById("shareLink").value = shareUrl;

    // ここに他のシェア機能（例：SNSへのシェア）を追加することもできます。
});

// // URLからアニメーション名を取得して、選択されたアニメーションを再生
// function playSelectedAnimation() {
//     const animationName = getParameterByName('animation');
    
//     // actions[animationName].play(); のようにアニメーションを再生するコードを呼び出す

//     if (actions[animationName]) {
//         actions[animationName].play();
//     } else {
//         // デフォルトのアニメーションやエラーメッセージなどの処理をここに書く
//     }
// }

// // ページロード時に選択されたアニメーションを再生
// playSelectedAnimation();
