module Api
    module V1
        class PizzasController < ApplicationController

            protect_from_forgery with: :null_session

            before_action :authorized, except: [:index, :show]

            # @get: /api/v1/pizzas.json
            def index
                pizzas = Pizza.all
                render json: PizzaSerializer.new(pizzas).serialized_json
            end

            # @get: /api/v1/pizzas/:slug
            def show
                pizza = Pizza.find_by(slug: params[:slug])
                render json: PizzaSerializer.new(pizza).serialized_json
            end

            # @post: /api/v1/pizzas.json
            def create
                pizza = Pizza.new(pizza_params)
                if pizza.save
                    render json: PizzaSerializer.new(pizza).serialized_json
                else
                    render json: { error: pizza.error.messages }, status: 422
                end
            end

            # @patch: /api/v1/pizzas/:slug
            def update
                pizza = Pizza.find_by(slug: params[:slug])
                if pizza.update(pizza_params)
                    render json: PizzaSerializer.new(pizza).serialized_json
                else
                    render json: { error: pizza.error.message }, status: 422
                end
            end

            # @delete: /api/v1/pizzas/:slug
            def destroy
                pizza = Pizza.find_by(slug: params[:slug])
                if pizza.delete
                    head :no_content
                else
                    render json: { error: pizza.error.message }, status: 422
                end
            end

            # @patch: /pizza/attachment/:slug
            def attachment
                pizza = Pizza.find_by(slug: params[:slug])
                if pizza.update(pizza_params)
                    render json: PizzaSerializer.new(pizza).serialized_json
                else
                    render json: { error: pizza.errors.message }, status: 422
                end
            end


            private

            def pizza_params
                params.require(:pizza).permit(:name, :value, :description, :photo)
            end
        end
    end
end