class PoiController < ApplicationController
  
  def carService
    car_service
  end
  
  def car_service
    send_kml "vsesto/kiev/sto.kml"    
  end
  
  def gas
    send_kml "vsesto/kiev/azs.kml"
  end
  
  def roadCondition
    send_kml 'roadCondition.kml'
  end
  
  def monument
    send_kml 'monuments_uk.kml'
  end
  
  def monument_uk
    send_kml 'monuments_uk.kml'
  end
  
  def monument_ru
    send_kml 'monuments_ru.kml'
  end  
  
  def hotel
    send_kml 'hotel.kml'
  end
  
  private
  def send_kml(file_name)
    full_file_name = "#{Rails.root}/db/data/#{file_name}"
    contents = File.open(full_file_name).read
    send_data contents, :type => 'application/vnd.google-earth.kml+xml'
  end

end
