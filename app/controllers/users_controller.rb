class UsersController < ApplicationController


  def index
    @users = User.where('name LIKE(?)', "%#{params[:name]}%" ).where("id NOT IN (#{current_user.id})")
    #name LIKE(?)で名前検索  #id NOT in current_user.idでログインしてないユーザーも全取得 
    respond_to do |format|
      format.html
      format.json
    end
  end  
  
  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end
end
