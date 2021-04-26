function check() {
  // 表示されている全てのメモを取得している
  const posts = document.querySelectorAll(".post");
  posts.forEach(function (post) {
    // 処理を繰り返さないようにしている
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");
    // メモをクリックし場合に実行する処理を定義している
    post.addEventListener("click", () => {
      // どのメモをクリックしたのか、カスタムデータを利用して取得している
      const postId = post.getAttribute("data-id");
      // Ajaxに必要なオブジェクトの生成
      const XHR = new XMLHttpRequest();
      // openでリクエストを初期化する
      XHR.open("GET", `/posts/${postId}`, true);
      // レスポンスタイプの指定(json形式)
      XHR.responseType = "json";
      // リクエストをサーバー(コントローラー)へ送信する
      XHR.send();
      // レスポンスを受け取った時の処理を記述する
      XHR.onload = () => {
        if (XHR.status != 200) {
          // レスポンスのHTTPステータスを解析し、該当するエラーメッセージをアラートで表示
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          // JS処理の抜け出し
          return null;
        }
        // レスポンスされたデータを変数に格納する
        const item = XHR.response.post;
        if (item.checked === true) {
          // クリック時にCSSを適用するためカスタムデータをセットしている
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          // falseでればそれを削除している
          post.removeAttribute("data-check");
        }
      };
    });
  });
}
// ブラウザのリロードなしで処理を行うための記述(6行目の処理へ)
setInterval(check, 1000);