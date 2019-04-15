
json.array! @users do |user|
  json.id user.id
  json.name user.name
end
#ユーザーを取得しJavascript側に返す
#複数のユーザーが格納された配列を返す