json.id  @message.id
json.body  @message.body
json.image  @message.image.url
json.name  @message.user.name
json.date  @message.created_at.strftime("%Y/%m/%d %H:%M")
