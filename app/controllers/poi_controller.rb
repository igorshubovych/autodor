class PoiController < ApplicationController
  def car_service
    file_name = "#{Rails.root}/db/sto.xml"
    contents = File.open(file_name).read
    send_data contents, :type => 'application/vnd.google-earth.kml+xml'
  end

end
