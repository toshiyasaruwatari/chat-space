$(function() {

  let userIds = [];

  $('.js-chat-member').each(function(i, member){
    let memberId = $(member).data('id');
    userIds.push(memberId);
  });

  function appendUser(user) {
    let html =
    `<div class="chat-group-user clearfix id="${user.id}">
        <p class="chat-group-user__name">${user.name}</p>
        <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
    </div>`
    return html;
  }

  $("#user-search-field").on("keyup", function(){

    let input = $("#user-search-field").val();
    if(input !== ""){
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })
      .done(function(users){
        $('#user-search-result').empty();
        users.forEach(function(user){
          if ($.inArray(user.id, userIds) < 0 ) {
            $('#user-search-result').append(appendUser(user))
          }
        });
      })
      .fail(function() {
        alert('ユーザー検索に失敗しました')
      });
    }else{
      $('#user-search-result').empty();
    }
  });

  function addMember(name, id) {
    let html =
    `<div class='chat-group-user clearfix js-chat-member' id='${id}'>
      <input name='group[user_ids][]' type='hidden' value='${id}'>
      <p class='chat-group-user__name'>${name}</p>
      <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
    </div>`
    return html;
  }

  $(document).on("click", ".user-search-add", function(){

    let userName = $(this).data("user-name");
    let userId = $(this).data("user-id");
    userIds.push(userId);
    let addUserHtml = addMember(userName, userId)

    $('#add-user-list').append(addUserHtml);
    $(this).parent().remove();
  });

  $(document).on("click", ".user-search-remove", function(){
    $(this).parent().remove();
  });
});
