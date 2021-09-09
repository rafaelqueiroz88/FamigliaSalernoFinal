module Api
    module V1
        class OrdersController < ApplicationController

            protect_from_forgery with: :null_session

            before_action :authorized

            # @get: /api/v1/orders.json
            def index
                orders = Order.all
                render json: OrderSerializer.new(orders).serialized_json
            end

            # @post: /api/v1/orders.json
            def create
                order = Order.new(order_params)
                user = User.find_by(slug: params[:user_id])
                address = Address.find_by(slug: params[:address_id])
                order.user = user.id
                order.address = address.id
                order.pizza = params[:pizzas]
                if order.save
                    render json: {
                        # TODO: elaborar um ID não oficial reserva e retornar ticket-5231451
                        # id: order.id, 
                        user_id: user.slug, 
                        address_id: address.slug, 
                        pizzas: order.pizza 
                    }
                else
                    render json: { error: order.error.messages }, status: 422
                end
            end


            private

            def order_params
                params.require(:order).permit(:user_id, :pizzas, :address_id)
            end
        end
    end
end