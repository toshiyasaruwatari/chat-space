$(function(){
  function buildHTML(message){
    let addImage = message.image ? `<img src="${message.image}">` : ""
    let html =
    `<div class="main__body--messages">
      <div class="main__message">
        <div class="main__message-name">
          ${message.name}
        </div>
        <div class="main__message-time">
          ${message.created_at}
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
      console.log("成功");
      $('.main__body').append(buildHTML(data))
      form.get(0).reset();
      $('.main__body').animate({scrollTop: $('.main__body')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('メッセージを送信できません')
    });
    return false;
  });
});
