'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した子要素をすべて削除する
 * @param{HTMLElement} element HTMLの要素
 * ↑elementは多分、既にシステム上で定義づけられたもの？
 */
function removeAllChildren(element) { //子要素がある限り削除。
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}


assessmentButton.onclick = () => {
    // ( ) => はアロー関数。onclickのような無名関数を扱う際に使える？functionを省略したもの。矢印。
    const userName = userNameInput.value;
    //valueはuserNameの値を検出…？
    if (userName.length === 0) { // 名前が殻の時は処理を終了する
        return; //戻り値がなしで、そのまま処理が終了できる。(ガード句)
    }
    console.log(userName);

    //todo 診断結果表示エリアの作成
    removeAllChildren(resultDivided); //11行目のfunctionが発動。
    while (resultDivided.firstChild) {
        //最初の子要素を削除する。
        // whileは与えられた論理式(カッコ内)がtrueである場合に実行し続ける制御文。
        resultDivided.removeChild(resultDivided.firstChild)
    } // removeChildは指定された子要素を削除する関数。

    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);
    // ↑親要素と言っていかな？

    const paragraph = document.createElement('p');　//要素だけを作成。
    const result = assessment(userName);
    paragraph.innerText = result; //pタグの中身(文章とか？)を設定。
    resultDivided.appendChild(paragraph); //子要素を追加するという意味。
    // 子要素と言っていいかな？



    //todo ツイートエリアの作成
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=' + encodeURIComponent('あなたのいいところ') + '&ref_src=twsrc%5Etfw';
    // URI(URLやURNの総称)の？以降の文字はクエリという。半角英数以外が含まれていたらエンコードするべし。encodeURLcomponent以下でエンコ完了。
    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);

    const script = document.createElement('script');
    script.setAttribute('src', 'http:///platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script); // scriptを定義した後に、子要素に追加！
    anchor.innerText = 'Tweet #あなたのいいところ';

    tweetDivided.appendChild(anchor);
    
};
const answers = [
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
    '{userName}のいいところは優しさです。{userName}の優しい雰囲気や立ち振る舞い多くの人が癒されています。'
];
/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param{string} userName ユーザーの名前
 * ↑関数がどのような引数を取るか。ストリングは文字列。
 * @returns{string} 診断結果
 */
function assessment(userName) {
    // 全文字のコード番号を取得してそれを足し合わせる
    let sumOFCharCode = 0;
    for (let i = 0; i < userName.length; i++) {
        sumOFCharCode = sumOFCharCode + userName.charCodeAt(i);
    }

    // 文字のコード番号の合計を回数の数で割って添え字の数字を求める(数字を診断の種類まで落とす)
    const index = sumOFCharCode % answers.length;
    let result = answers[index];
    // answer[index]は診断の結果の各番号の内容を示している。


    return result.replace(/\{userName\}/g, userName);
    // /\{userName\}/gが正規表現。特定の｛userName｝を探してきて～的な。
    // バックスラッシュが入っているのは普通のスラッシュの意味を打ち消すため。
    //　正直まだここは理解できていない。
}

userNameInput.onkeydown = function(event) {
    if(event.key === 'Enter') {
        assessmentButton.onclick();
    } }
// テストコード
console.assert
    (assessment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。', '診断結果の文言を特定の部分を名前に置き換える処理が正しくありません');
// ===の一番目には正しかった時に表示されるもの、二番目には間違った時に表示されるもの。
// 太郎が入力されたら(assessment(太郎))、太郎のいいところは～。

console.assert
    (assessment('太郎') === assessment('太郎'), '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
    );
// 太郎が入力されたら(assessment(太郎))、太郎で処理される(true)。
