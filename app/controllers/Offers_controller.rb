# class Api::V1::OffersController < ApplicationController
class OffersController < ApplicationController
    def index
        # render json: Offer.all
        render json: {offer: Offer.paginate(page: params[:page], per_page: 4), allOffer: Offer.all.count}
    end

    def create
        # binding.pry
        offer = Offer.create(offer_params)
        render json: offer
    end

    private

    def offer_params
        params.require(:offer).permit(:id, :name, :description, :image)
    end
end