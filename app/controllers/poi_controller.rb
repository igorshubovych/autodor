class PoiController < ApplicationController
  
  def carService
    car_service
  end
  
  def car_service
    send_kml "vsesto/kiev/sto.kml"    
  end
  
  def gas
    send_kml "m11-gas.kml" 
    # "vsesto/kiev/azs.kml"
  end
  
  def roadCondition
    send_kml 'roadCondition.kml'
  end
  
  def monument
    send_kml 'monuments_uk.kml'
  end
  
  def hotel
    send_kml 'm11-hotel.kml'
  end
  
  def police
    send_kml 'm11-police.kml'
  end
  
  def recreationArea
    send_kml 'm11-recreationArea.kml'
  end
  
  def food
    send_kml 'm11-food.kml'
  end

  def borders1
    send_kml 'Ukraine1.kml'
  end
  
  def borders2
    send_kml 'Ukraine2.kml'
  end
    
  private
  def send_kml(file_name)
    full_file_name = "#{Rails.root}/db/data/#{file_name}"
    contents = File.open(full_file_name).read
    send_data contents, :type => :kml
  end

end
