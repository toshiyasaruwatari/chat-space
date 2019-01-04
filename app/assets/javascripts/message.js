$(function(){
  function buildHTML(message){
    let addImage = message.image ? `<img src="${message.image}">` : ""
    let html =
    `<div class="main__body--messages" data-message-id="${message.id}">
      <div class="main__message">
        <div class="main__message-name">
          ${message.name}
        </div>
        <div class="main__message-time">
          ${message.date}
        </div>
        <div class="main__message-text">
          <p>${message.body}</p>
          ${addImage}
        </div>
      </div>
    </div>`
    return html;
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault();

    let form = $('#new_message');
    let fd = new FormData(this);

    $.ajax({
      url: form.attr('action'),
      type: form.attr('method'),
      data: fd,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      $('.main__body').append(buildHTML(data))
      form.get(0).reset();
      $('.main__body').animate({scrollTop: $('.main__body')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('メッセージを送信できません')
    });
    return false;
  });

  $(function(){
    $(function(){
      if (window.location.href.match(/\/groups\/\d+\/messages/))
        setInterval(update, 5000);
    });
    function update(){
      if($('.main__body--messages')[0]){
        messageId = $('.main__body--messages:last').data('message-id');
      } else {
        messageId = 0
      }

      $.ajax({
        url: location.href,
        type: 'GET',
        data: { id: messageId },
        dataType: 'json'
      })

      .done(function(data){
        if (data.length != 0){
          $.each(data, function(i, message){
            $('.main__body').append(buildHTML(message))
          });
        }
        $('.main__body').animate({scrollTop: $('.main__body')[0].scrollHeight}, 'fast');
      })
      .fail(function(data){
        alert('自動更新に失敗しました')
      });
    }
  })
});
