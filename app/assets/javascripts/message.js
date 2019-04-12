$(function(){

  function buildHTML(message){
//functionによって関数を宣言,buildHTMLは関数の名前,(message)は引数
    var content = message.is_content_present ? `${message.content} ` : ''
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
  $('#new_message').on('submit', function(e){
//submitイベントで発火させる    
    e.preventDefault();
    var formData = new FormData(this);
//new fromDataでインスタンス作成    
//引数thisはイベント発生したDOM要素#new_messageのフォーム情報取得   
    var url = $(this).attr('action')
//ajaxで使う変数urlにaction属性のurlを取得し代入    
    $.ajax({
//フォーム送信押してajax通信
//サーバーからデータ取得
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
   
    .done(function(data){
//返ってきたjsonをdoneメソッドで受け取る      
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.form__submit').prop( 'disabled', false );
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('.form__message').reset();
      $('.hidden').reset();
     
    })

    .fail(function(){
      alert('error');
//通信エラーでfailが呼ばれアラート出る      
    })
  })
});
