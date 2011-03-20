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
		url = "http://62.244.10.66/gmaps/connector.php?lang=en&type=large&"
		url += "x1=#{params[:x1]}&x2=#{params[:x2]}&y1=#{params[:y1]}&y2=#{params[:y2]}&zoom=#{params[:zoom]}"

		body = CurbFu.get(url).body
		response = JSON.parse(body)
		
		cnt = 0
		points = ""
		
		response.each do |i|
			points += %{
<Style id="moo#{ cnt }">
	<IconStyle>
		<Icon>
			<href>http://www.meteoprog.ua/pictures/markers/#{ i['link'] }</href>
		</Icon>
		<scale>3</scale>
	</IconStyle>
</Style>

<Placemark>
	<styleUrl>#moo#{ cnt }</styleUrl>
	<Point>
		<coordinates>#{ i['y'] },#{ i['x'] }</coordinates>
	</Point>
</Placemark>
				}
				
			cnt += 1
		end
			
		kml = %{<?xml version="1.0" encoding="UTF-8"?>

<kml xmlns="http://www.opengis.net/kml/2.2">
	#{ points }
</kml>
			}
			
		render :xml => kml
	end
end
