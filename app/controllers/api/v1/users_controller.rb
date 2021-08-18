module Api
    module V1
        class UsersController < ApplicationController

            protect_from_forgery with: :null_session

            before_action :authorized, except: [:create, :login]

            # @get: /api/v1/users.json
            def index
                users = User.all
                render json: UserSerializer.new(users).serialized_json
            end

            # @get: /api/v1/users/:slug
            def show
                user = User.find_by(slug: params[:slug])
                render json: UserSerializer.new(user).serialized_json
            end

            # @post: /api/v1/users.json
            def create
                @user = User.new(user_params)
                if @user.valid?
                    if @user.save
                        token = encode_token({ user_id: @user.id })
                        render json: { user: @user, token: token }, status: 200
                    else
                        render json: { error: @user.error.messages }, status: 422
                    end
                else
                    render json: { error: @user.error.messages }, status: 208
                end
            end

            # @patch: /api/v1/users/:slug
            def update
                user = User.find_by(slug: params[:slug])
                if user.update(user_params)
                    render json: UserSerializer.new(user).serialized_json
                else
                    render json: { error: user.error.message }, status: 422
                end
            end

            # @delete: /api/v1/users/:slug
            def destroy
                user = User.find_by(slug: params[:slug])
                if user.delete
                    head :no_content
                else
                    render json: { error: user.error.message }, status: 422
                end
            end

            # TODO: make auth routes and setup
            # @post: /api/v1/login
            def login
                @user = User.find_by(email: params[:email])
                if @user && @user.authenticate(params[:password])
                    token = encode_token({ user_id: @user.id })
                    render json: { user: @user, token: token }, status: 200
                else
                    render json: { error: "Endereço de e-mail E/OU senha inválidos" }, status: 208
                end
            end

            # @get: /api/v1/auto_login
            def auto_login
                render json: @user
            end

            private

            def user_params
                params.require(:user).permit(:name, :email, :password)
            end

            def options

            end
        end
    end
end