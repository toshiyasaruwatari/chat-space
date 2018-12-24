$(function() {
  function appendUser(user) {
    let html =
    `<div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
    </div>`
    return html
  }

  $("#user-search-field").on("keyup", function(){

    let input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users){
      users.forEach(function(user){
        $('.chat-group-form__search').append(appendUser(user))
      });
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました')
    });
  });

  function addMember(name, id) {
    let html =
    `<div class='chat-group-user clearfix js-chat-member' id='${id}'>
      <input name='group[user_ids][]' type='hidden' value='${id}'>
      <p class='chat-group-user__name'>${name}</p>
      <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
    </div>`
    return html
  }

  $(document).on("click", ".user-search-add", function(){

    let user_name = $(this).data("user-name");
    let user_id = $(this).data("user-id");
    let add_user_html = addMember(user_name, user_id)

    $('.chat-group-form__member').append(add_user_html);
    $(this).parent().remove();
  });

  $(document).on("click", ".user-search-remove", function(){
    $(this).parent().remove();
  });
});
