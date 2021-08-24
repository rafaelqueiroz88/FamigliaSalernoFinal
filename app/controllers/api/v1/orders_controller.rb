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
                if order.save
                    render json: OrderSerializer.new(order).serialized_json
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