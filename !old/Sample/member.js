// スクロールされたときにナビゲーションを出すためのJavaScript
document.addEventListener('scroll',function(){
    // 現在の位置が画面上からどれぐらいかを取得　＝　スクロールすると徐々に値は大きくなる
    const scrollY = window.pageYOffset;
    const GetHtmlElement = document.querySelectorAll(".members");
    console.log("スクロール位置"+scrollY+"*************************************")
    /*.クラスからノードを取得*/
    // console.log(GetHtmlElement);
    /*.クラス0から子要素を取得*/
    // console.log(GetHtmlElement[0].childNodes);
    // // 現在の画面後半の位置を取得する
    // const scrollUnderpage = document.getElementById('bottombackgroud').getBoundingClientRect().top
    // console.log("要素への距離" + scrollUnderpage)
    // // 少しでも下にスクロールすれば
    // if (scrollY > 600) {
    //     document.getElementById('navs').classList.add('active');
    // } else {
    //     document.getElementById('navs').classList.remove('active');
    // }
    // スクロールが少しでも行われたらナビゲーションバーを表示させる *****************************
    if (scrollY > 300) {
        document.getElementById('navs').classList.add('active');
    } else {
        document.getElementById('navs').classList.remove('active');
    }
    // *************************************************************************************
    for (let i = 0; i < GetHtmlElement.length; i++) {
        const Elementchild = GetHtmlElement[i].childNodes;
        for (let j = 0; j < Elementchild.length; j++) {
            const Element = Elementchild[j];
            // console.log("それぞれの要素位置を取得")
            // console.log(Element);
            // console.log(Element.className)
            // テキスト部分を処理
            console.log("画面の高さ" + window.innerHeight)
            if (Element.className === "contentstext") {
                const ElementPos = Element.getBoundingClientRect().top + Element.clientHeight * 0.6;
                console.log("文字スクロール要素のブラウザにおける位置")
                console.log(ElementPos)
                console.log("マイナスされた位置")
                console.log(window.innerHeight - ElementPos)
                // console.log("テキスト要素の位置");
                // console.log(ElementPos);
                // console.log("条件武器に使う値");
                // console.log(parseInt(ElementPos) - scrollY);
                // 条件分岐で処理
                if (window.innerHeight > ElementPos-100) {
                    console.log("クラスの追加")
                    // console.log(parseInt(ElementPos) - scrollY);
                    Element.classList.add('active')
                }
                // 画像部分を処理
            } else if (Element.className === "contentsimage") {
                const ElementPos = Element.getBoundingClientRect().top+ Element.clientHeight * 0.6;
                console.log("画像スクロール要素のブラウザにおける位置")
                console.log(ElementPos)
                console.log("マイナスされた位置")
                console.log(window.innerHeight - ElementPos)
                // console.log("画像要素の位置");
                // console.log(ElementPos);
                // console.log("条件武器に使う値");
                // console.log(parseInt(ElementPos) - scrollY);
                // 条件分岐で処理
                if (window.innerHeight > ElementPos-100) {
                    console.log("クラスの追加")
                    // console.log(parseInt(ElementPos) - scrollY);
                    Element.classList.add('active')
                }
            }
        }
        console.log("***************************************************")
    }
})

