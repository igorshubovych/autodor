class Point < ActiveRecord::Base
  def self.by_object_type(object_type)
    where(:object_type => object_type)
  end
  
  def self.by_object_type_in_bbox(object_type, lat1, lon1, lat2, lon2, extent)
    lat_min = [lat1, lat2].min
    lon_min = [lon1, lon2].min
    lat_max = [lat1, lat2].max
    lon_max = [lon1, lon2].max
    if extent > 0 then
      lat_min -= 0.2
      lat_max += 0.2
      lon_min -= 0.1
      lon_max += 0.1
    end
    where(:object_type => object_type, :lat => (lat_min .. lat_max), :lon => (lon_min .. lon_max))
  end
end
