
/*ドキュメント(html)からタイトルの要素を取得する*/
const GetHtmlElement = document.querySelectorAll(".block-contents");
/*.headertextクラスからノードを取得*/
console.log(GetHtmlElement);
/*.headertextクラス0（1個しかない）から子要素を取得*/
console.log(GetHtmlElement[0].childNodes);
// 対象のクラスの子要素を取得してリスト化
const GetHtmlElement_Children_list = [];
for (let i = 0; i < GetHtmlElement.length; i++) {
    GetHtmlElement_Children_list.push(GetHtmlElement[i].childNodes);
}
// const GetHtmlElement_Children = GetHtmlElement[0].childNodes;
console.log(GetHtmlElement_Children_list.length);
// ループしてh2タグの要素のみを選択して処理を行う
for (let i = 0; i < GetHtmlElement_Children_list.length; i++) {
    let flag = 0;
    console.log("取得した配列の数" + GetHtmlElement_Children_list.length)
    // console.log(GetHtmlElement_Children[i])
    // 要素名を取得して検証
    // console.log(GetHtmlElement_Children[i].nodeName)
    for (let j = 0; j < GetHtmlElement_Children_list[i].length; j++) {
        // 要素の中身を確認
        console.log(GetHtmlElement_Children_list[i][j].nodeName)
        // 格納用の配列を定義
        let Collect_text = [];
        // h2タグの要素を空の状態で取得
        let TargetElement = ""
        let TargetElement_Text = ""
        // 対象のタグに一致すれば処理を実行
        if (GetHtmlElement_Children_list[i][j].nodeName === "H2") {
            // 対象の要素を取得した
            TargetElement = GetHtmlElement_Children_list[i][j];
            // 対象の要素からテキスト情報を取得
            TargetElement_Text = TargetElement.textContent;
            // もともとのHTMLを上書きのためにいったん削除
            TargetElement.textContent = ""
            console.log(TargetElement_Text)
            // スペースを処理対象から除外する
            // テキスト情報を引数なしのsplitで一文字ずつに分割する
            for (let k = 0; k < TargetElement_Text.split("").length; k++) {
                let ElementText = TargetElement_Text.split("")[k];
                // 文字中のスペースはスペースとして配列に格納する
                if (ElementText === " ") {
                    Collect_text.push(" ")
                // スペース以外はspanをつける
                } else {
                    // 一つ目の大きいタイトルにはspan 2つ目の小さいタイトルにはspan > spanをつける
                    Collect_text.push('<span style="transition-delay: ' + (k*0.05) + 's;">' + ElementText + '</span>')
                }
            }
            flag = 1;
        }
        if (flag === 1) {
        /*  console.log("上書き前の変数状態")
            console.log(Collect_text) */
            // var insertHTML = "";
            for (let k = 0; k < Collect_text.length; k++) {
                console.log(Collect_text[k])
                TargetElement.innerHTML += Collect_text[k]
                // TargetElement.innerHTML += k;
            }
            // TargetElement.innerHTML = insertHTML;
            console.log(TargetElement.innerHTML);
            break;
        }
    }

}

// スクロールされたときにナビゲーションを出すためのJavaScript
document.addEventListener('scroll',function(){
    // 現在の位置が画面上からどれぐらいかを取得　＝　スクロールすると徐々に値は大きくなる
    const scrollY = window.pageYOffset;
    console.log("現在のスクロール位置"+scrollY)
    // 現在の画面後半の位置を取得する
    let Class_List = document.getElementsByClassName('easing')
    for (let i = 0;i<Class_List.length;i++) {
        const scrollUnderpage = Class_List[i].getBoundingClientRect().top
        console.log("要素への距離" + scrollUnderpage)
        if (scrollUnderpage - scrollY < 600) {
            Class_List[i].classList.add('-visible');
        } else {
            Class_List[i].classList.remove('-visible');
        }
    }
    Class_List = document.getElementsByClassName('under-easing')
    for (let i = 0;i<Class_List.length;i++) {
        const scrollUnderpage = Class_List[i].getBoundingClientRect().top
        console.log("要素への距離" + scrollUnderpage)
        if (scrollUnderpage - scrollY < 600) {
            Class_List[i].classList.add('-visible');
        } else {
            Class_List[i].classList.remove('-visible');
        }
    }

    // 少しでも下にスクロールすれば
    // if (scrollY > 600) {
    //     document.getElementsByClassName('block-contents').classList.add('active');
    // } else {
    //     document.getElementById('navs').classList.remove('active');
    // }
})


