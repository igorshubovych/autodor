class HomeController < ApplicationController
  def index
  	@languages = [ "ru", "ua", "en" ]
  	@current_lang = "ua"
  end
end
