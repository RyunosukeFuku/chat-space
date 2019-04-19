
$(function ()
{
  function buildHTML(message)
  {
    //functionによって関数を宣言,buildHTMLは関数の名前,(message)は引数

    var image = message.image == null ? "" : `<img src="${message.image}" class="lower-message__image">`

    var html = `<div class = "message" data-id=${message.id}>
                  <div class = "message-upper">
                    <div class = "message-upper__user-name">
                      ${message.user_name}
                    </div>
                    <div class = "message-upper__data">
                      ${message.date}
                    </div>
                  </div>
                  <div class = "message-">
                    <div class = "message-lower__content"> 
                      ${message.content}
                    </div>
                      ${image}
                  </div>
                </div>`
    return html;
  }
  //htmlという変数を作った
  //実際のmessage.html.hamlと同じクラスや構成にしないとCSSが適用されない



  //非同期通信
  $('#new_message').on('submit', function (e)
  {
    //submitイベントで発火させる    
    e.preventDefault(); //デフォルトで送信されるフォームの送信をキャンセル
    var formData = new FormData(this);
    //new fromDataでインスタンス作成    
    //引数thisはイベント発生したDOM要素#new_messageのフォーム情報取得   
    var url = $(this).attr('action')
    //ajaxで使う変数urlにaction属性のurlを取得し代入    
    $.ajax({
      //フォーム送信押してajax通信
      //サーバーからデータ取得
      url: url, //リクエストのパス
      type: "POST", //HTTPメソッド
      data: formData, //リクエストと一緒に送るデータ
      dataType: 'json', //json形式でデータ送る
      processData: false,
      contentType: false, //リクエストに含まれるデータの型を変更しないための記述
    })

      .done(function (data)
      {
        //返ってきたjsonをdoneメソッドで受け取る      
        var html = buildHTML(data);
        $('.messages').append(html);
        $('.form__submit').prop('disabled', false);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight }, 'fast');
        $('.new_message')[0].reset();
      })

      .fail(function ()
      {
        alert('error');

      })
  });

  function reloadMessages()
  {

    if ($('.chat')[0]) //セレクタの先頭要素があれば
    {
      var lastMessageId = $(".message:last-child").data("id")
    } else
    {
      return false;
    };
    $.ajax({
      url: ' api/messages',
      type: 'get',
      dataType: 'json',
      data: { id: lastMessageId },

    })
      .done(function (messages)
      {

        var insertHTML = '';
        messages.forEach(function (message)
        {
          var html = buildHTML(message);
          insertHTML += html
        });
        $('.messages').append(insertHTML);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight }, 'fast');
      })

      .fail(function ()
      {
        alert('error');
      });
  };
  setInterval(reloadMessages, 5000);
});
