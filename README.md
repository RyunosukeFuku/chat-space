# **DB設計**



## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|body|text|
|image|string|
### Association
- belongs_to :group
- belongs_to :user
### Index
-add_index :messages, [:group_id, :user_id]


## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|text|null: false,add_index, unique:true|
|e_mail|text|null: false |
|password|text|null :false|

### Association
- has_many :group, through: :members
- has_many :message



## groupテーブル

|Column|Type|Options|
|------|----|-------|
|group_name|text|null: false|


### Association
- has_many :users, through: :members
- has_many :message





## membersテーブル(中間)

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
