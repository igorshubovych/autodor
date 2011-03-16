class HomeController < ApplicationController
  def index
  	@languages = [ "ru", "ua", "en" ]
  end
end
