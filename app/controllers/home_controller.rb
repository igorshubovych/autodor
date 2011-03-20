class HomeController < ApplicationController
  layout 'map'
  
  def index
  	@languages = [ "ru", "ua", "en" ]
  	@current_lang = "ua"
  end
  
  def moar
    @languages = [ "ru", "ua", "en" ]
  	@current_lang = "ua"
  end
  
  def weather
	  respond_to do |format|
  		format.js do
  			url = "http://62.244.10.66/gmaps/connector.php?lang=en&type=large&"
  			url += "x1=#{params[:x1]}&x2=#{params[:x2]}&y1=#{params[:y1]}&y2=#{params[:y2]}&zoom=#{params[:zoom]}"
	
  			res = CurbFu.get(url)
  			render :json => res.body
  		end
  	end
  end
end
