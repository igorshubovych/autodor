class HomeController < ApplicationController
  def index
  	@languages = [ "ru", "ua", "en" ]
  	@current_lang = "ua"
  end
  
  def moar
	@languages = [ "ru", "ua", "en" ]
  	@current_lang = "ua"
  end
end
