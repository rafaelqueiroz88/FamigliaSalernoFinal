module Api
    module V1
        class AddressesController < ApplicationController

            protect_from_forgery with: :null_session

            before_action :authorized

            # @get: /api/v1/users.json
            def index
                user = User.find_by(slug: params[:slug])
                addresses = Address.find_by(user_id: user.id)
                render json: AddressSerializer.new(addresses).serialized_json
            end

            # @get: /api/v1/users/:slug
            def show
                address = Address.find_by(slug: params[:slug])
                render json: AddressSerializer.new(address).serialized_json
            end

            # @post: /api/v1/users.json
            def create
                address = Address.new(address_params)
                user = User.find(params[:user_id])
                token = encode_token({ user_id: user.id })
                req = request.headers["Authorization"]
                req_token = req.split('Bearer ')
                if req_token[1] == token
                    if address.save
                        render json: AddressSerializer.new(address).serialized_json
                    else
                        render json: { error: address.error.messages }, status: 422
                    end
                else
                    render json: { error: "This user is not allowed to insert Address to someone else" }
                end
            end

            # @patch: /api/v1/users/:slug
            def update
                address = Address.find_by(slug: params[:slug])
                if address.user_id == params[:user_id]
                    if address.update(address_params)
                        render json: AddressSerializer.new(address).serialized_json
                    else
                        render json: { error: address.error.message }, status: 422
                    end
                else
                    render json: { error: "This user doesn't have permission to update this address" }
                end
            end

            # @delete: /api/v1/users/:slug
            def destroy
                address = Address.find_by(slug: params[:slug])
                if address.update(address_params)
                    if address.delete
                        head :no_content
                    else
                        render json: { error: address.error.message }, status: 422
                    end
                else
                    render json: { error: "This user doesn't have permission to update this address" }
                end
            end

            private

            def address_params
                params.require(:address).permit(:description, :street, :number, :zipcode, :note, :reference, :user_id)
            end
        end
    end
end