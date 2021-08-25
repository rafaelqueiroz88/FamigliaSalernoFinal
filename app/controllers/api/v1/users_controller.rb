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
                        render json: { 
                            name: @user.name, 
                            email: @user.email,
                            slug: @user.slug,
                            user_type: @user.user_type,
                            token: token 
                        }, status: 200
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
                puts user.inspect
                if user.slug == params[:slug]
                    if user.update(user_params)
                        render json: UserSerializer.new(user).serialized_json
                    else
                        render json: { error: user.errors.messages }, status: 422
                    end
                else
                    render json: { error: "This user doesn't have permission to update this user" }, status: 208
                end
            end

            # @delete: /api/v1/users/:slug
            def destroy
                user = User.find_by(slug: params[:slug])
                if user.slug == params[:slug]
                    if user.delete
                        head :no_content
                    else
                        render json: { error: user.error.message }, status: 422
                    end
                else
                    render json: { error: "This user doesn't have permission to delete this user" }, status: 208
                end
            end

            # @post: /api/v1/login
            def login
                @user = User.find_by(email: params[:email])
                if @user && @user.authenticate(params[:password])
                    token = encode_token({ user_id: @user.id })
                    render json: { 
                        name: @user.name, 
                        email: @user.email,
                        slug: @user.slug,
                        user_type: @user.user_type,
                        token: token 
                    }, status: 200
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
                @options ||= include { i%[:addresses] }
            end
        end
    end
end