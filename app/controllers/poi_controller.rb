class PoiController < ApplicationController
  
  def carService
    car_service
  end
  
  def car_service
    send_kml "#{Rails.root}/db/data/vsesto/kiev/sto.kml"    
  end
  
  def gas
    send_kml "#{Rails.root}/db/data/vsesto/kiev/azs.kml"
  end
  
  def roadCondition
    send_kml "#{Rails.root}/db/data/roadCondition.kml"
  end
  
  private
  def send_kml(file_name)
    contents = File.open(file_name).read
    send_data contents, :type => 'application/vnd.google-earth.kml+xml'
  end

end
