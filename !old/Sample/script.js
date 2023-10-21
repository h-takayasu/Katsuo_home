/*ドキュメント(html)からタイトルの要素を取得する*/
const GetHtmlElement = document.querySelectorAll(".headertext");
/*.headertextクラスからノードを取得*/
console.log(GetHtmlElement);
/*.headertextクラス0（1個しかない）から子要素を取得*/
console.log(GetHtmlElement[0].childNodes);
const GetHtmlElement_Children = GetHtmlElement[0].childNodes;
// ループしてh2タグの要素のみを選択して処理を行う
for (let i = 0; i < GetHtmlElement_Children.length; i++) {
    console.log("取得した配列の数" + GetHtmlElement_Children.length)
    // console.log(GetHtmlElement_Children[i])
    // 要素名を取得して検証
    // console.log(GetHtmlElement_Children[i].nodeName)
    if (GetHtmlElement_Children[i].nodeName === "H2") {
        // h2要素を取得した
        const TargetElement = GetHtmlElement_Children[i];
        // h2要素からテキスト情報を取得
        const TargetElement_Text = TargetElement.textContent;
        // 格納用の配列を定義
        const Collect_text = [];
        // もともとのHTMLを上書きのためにいったん削除
        TargetElement.textContent = ""
        console.log(TargetElement_Text)
        // スペースを処理対象から除外する
        // テキスト情報を引数なしのsplitで一文字ずつに分割する
        for (let j = 0; j < TargetElement_Text.split("").length; j++) {
            const ElementText = TargetElement_Text.split("")[j];
            // 文字中のスペースはスペースとして配列に格納する
            if (ElementText === " ") {
                Collect_text.push(" ")
            // スペース以外はspanをつける
            } else {
                // 一つ目の大きいタイトルにはspan 2つ目の小さいタイトルにはspan > spanをつける
                if (i === 1) {
                    Collect_text.push('<span style="animation-delay: ' + (j*0.05) + 's;">' + ElementText + '</span>')
                } else {
                    // Collect_text.push('<span><span style="animation-delay:' + (j*0.1) + 's;">' + ElementText + '</span></span>')
                    // 大きいタイトルの表示待ちをしてすべての文字を一気に表示する
                    Collect_text.push('<span><span style="animation-delay:' + 1.4 + 's;">' + ElementText + '</span></span>')
                }
            }
        }
/*         console.log("上書き前の変数状態")
        console.log(Collect_text) */
        for (let k = 0; k < Collect_text.length; k++) {
            console.log(Collect_text[k])
            TargetElement.innerHTML += Collect_text[k];
            // TargetElement.innerHTML += k;
        }
    }
}

// ポエムを表示させているｐタグにanimation-delayをつける？
const TargetClassElement = document.querySelectorAll('div.poetry > p')


// スクロールされたときにナビゲーションを出すためのJavaScript
document.addEventListener('scroll',function(){
    // 現在の位置が画面上からどれぐらいかを取得　＝　スクロールすると徐々に値は大きくなる
    const scrollY = window.pageYOffset;
    console.log(scrollY)
    // 現在の画面後半の位置を取得する
    const scrollUnderpage = document.getElementById('bottombackgroud').getBoundingClientRect().top
    console.log("要素への距離" + scrollUnderpage)
    // 少しでも下にスクロールすれば
    if (scrollY > 600) {
        document.getElementById('navs').classList.add('active');
    } else {
        document.getElementById('navs').classList.remove('active');
    }
    // 白い画面のところまでいけば
    if (scrollUnderpage < 1160) {
        // div.portry の中のp要素を取得する
        const TargetClassElement = document.querySelectorAll('div.poetry > p');
        console.log(TargetClassElement)
        // 取得したp要素すべてにactiveをつける
        for (let i = 0; i < TargetClassElement.length; i++) {
            console.log(TargetClassElement[i])
            TargetClassElement[i].classList.add('active');
        }
    }
})