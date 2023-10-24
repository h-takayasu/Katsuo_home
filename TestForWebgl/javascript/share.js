// URLのクエリストリングからパラメータを取得する関数
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// share.js
document.addEventListener("DOMContentLoaded", function() {
    // シェアボタンがクリックされたときの処理
    document.getElementById("shareButton").addEventListener("click", function() {
        const currentUrl = window.location.href.split('?')[0]; // クエリストリングを除いた現在のURL
        const shareUrl = `${currentUrl}?animation=${activeAnimationName}`;
        
        console.log("Share URL:", shareUrl);
        // ここに他のシェア機能（例：SNSへのシェア）を追加することもできます。
        copyToCripbord(shareUrl)
    });
});

function copyToCripbord(url) {
    // 一時的なテキストエリアを作成して、そこにURLを入力
    const textarea = document.createElement('textarea');
    textarea.textContent = url;
    textarea.style.position = 'fixed';  // ユーザーに表示させない
    document.body.appendChild(textarea);

    // テキストエリアの内容を選択してクリップボードにコピー
    textarea.select();
    document.execCommand('copy');

    // 一時的なテキストエリアを削除
    document.body.removeChild(textarea);

    alert('URLがクリップボードにコピーされました。');
}

