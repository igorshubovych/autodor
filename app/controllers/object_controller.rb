class ObjectController < ApplicationController
  
  def carService
    send_kml "m11-carService.kml"
  end
  
  def gas
    send_kml "m11-gas.kml" 
    # "vsesto/kiev/azs.kml"
  end
  
  def roadCondition
    #send_kml 'roadCondition.kml'
	render_kml 'incidents'
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
  
  def custom
    send_kml 'm11-custom.kml'
  end
  
  def recreationArea
    send_kml 'm11-recreationArea.kml'
  end
  
  def food
    send_kml 'm11-food.kml'
  end
  
  def medicine
    send_kml 'm11-medicine.kml'
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

  def render_kml(type)
	if (type == 'incidents')
		points = Point.all

	    kml = %{<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2" xmlns:gx="http://www.google.com/kml/ext/2.2" xmlns:kml="http://www.opengis.net/kml/2.2" xmlns:atom="http://www.w3.org/2005/Atom">
    <Document>
        <name>Incidents</name>
        <open>1</open>
        %s
    </Document>
</kml>
	    }

	    points_str = ""

		points.each do |p| 
			points_str += "\n<Placemark>\n<name>#{p.name}</name>\n<description>#{p.description}</description>\n<Point>\n<coordinates>#{p.lon},#{p.lat}</coordinates>\n</Point>\n</Placemark>\n"
		end

		send_data kml % points_str, :type => :kml
	end
  end

end
