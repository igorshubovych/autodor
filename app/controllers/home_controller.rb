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
	
=begin
	def cities
		if (!params[:query].nil?)
			res = JSON.parse(CurbFu.get("http://geocoding.cloudmade.com/8ee2a50541944fb9bcedded5165f09d9/geocoding/v2/find.js?object_type=city,town&bbox=52.375359,40.218079,44.390411,22.128811&results=10&return_parent&query=#{ params[:query] }").body)
		else
			res = JSON.parse(CurbFu.get('http://geocoding.cloudmade.com/8ee2a50541944fb9bcedded5165f09d9/geocoding/v2/find.js?object_type=city,town&bbox=52.375359,40.218079,44.390411,22.128811&results=10000').body)
		end
		
		return if (res["features"].nil?)
		
		s = []
		
		res["features"].each do |i|
			p = i["properties"]
			
			s << { "ru" => p["name:ru"], "uk" => p["name:uk"], "en" => p["name:en"], "self" => p["name"] }
		end
		
		render :json => s.to_json
	end
=end
end
