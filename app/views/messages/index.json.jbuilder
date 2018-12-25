json.messages @new_messages.each do |message|
  json.id message.id
  json.body message.body
  json.name message.user.name
  json.date message.created_at.strftime("%Y/%m/%d %H:%M")
  json.image message.image.url
end
