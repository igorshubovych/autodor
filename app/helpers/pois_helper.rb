module PoisHelper
  def object_types
    [ 'custom', 'police', 'carService', 'gas', 'hotel', 
      'monument', 'roadCondition', 'recreationArea', 'food', 'medicine' ]
  end
  
  def object_type_names
    names = {}
    object_types.each { |type| names[type] = t("objects.#{type}") }
    names
  end
end
