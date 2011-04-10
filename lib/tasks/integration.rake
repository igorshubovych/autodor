namespace :integration do
  desc "Transform KML file to standard seeds method"
  task :kml_to_seeds do
    kml = ENV['kml']
    puts Kml.new().kml_to_seeds(kml)
  end
  
  namespace :vsesto do
    desc "Download KML for specified city and category"
    task :download_kml => :environment do
      vsesto = VseSto.new
      city = ENV['city']
      raise Exception.new("Unsupported city - #{city}. Supported are #{vsesto.cities.join(', ')}") if !vsesto.cities.include? city
      category = ENV['category']
      raise Exception.new("Unsupported POI category - #{category}. Supported are #{vsesto.poi_categories.join(', ')}") if !vsesto.poi_categories.include? category
      vsesto.download_kml city, category
    end
    
    desc "Download KML file for all supported cities and categories"
    task :download_all_kml => :environment do
      VseSto.new().download_all_kml
    end
  
    class VseSto      
      def download_kml(city, category, overwrite = true)
        folder = "#{@download_folder}/#{city}"
        Dir.mkdir folder if !File.exists? folder
        response = CurbFu.get("#{@url}/#{city}/#{category}/?view=kml")
        file = File.open("#{@download_folder}/#{city}/#{category}.kml", "w+")
        file.write response.body
        file.close
      end
      
      def download_all_kml
        @cities.each do |city|
          @poi_categories.each do |category|
            download_kml city, category
          end
        end
      end
      
      def initialize
        @url = 'http://vse-sto.com.ua'
        @cities = ['dnepr', 'donetsk', 'zp', 'kiev', 'lviv', 'nikolaev', 'odessa', 'simferopol', 'kharkov']
        @poi_categories = ['avtomoyki', 'azs', 'schinomontazhi', 'sto']
        @download_folder = "#{Rails.root}/db/data/vsesto"
        Dir.mkdir @download_folder if !File.exists? @download_folder
      end
      
      attr_reader :cities
      attr_reader :poi_categories
    end
    
    class Kml
      require 'rubygems'
      require 'hpricot'
      
      def kml_to_seeds(kml_file)
        seeds = ''
        doc = open(kml_file) { |f| Hpricot.XML(f) }
        placemarks = doc.search('kml/Document/Placemark')
        placemarks.each do |placemark|
          name = placemark.at("name").inner_html
          coordinates = placemark.at("Point/Coordinates").inner_html
          lon, lat = coordinates.split(",")
          description_html = placemark.at("description").inner_html
          lines = description_html.split("\n").map{|line| line.strip }
          description_html = lines[1..-2].join("\r\n")
          description_doc = Hpricot(description_html)
          image_elem = description_doc.at("img[@class='align-right frame']")
          if image_elem then
            image = image_elem.attributes['src']
            description_html[image_elem.to_original_html] = ""
          end
          seed = "Point.create("
          seed += "\r\n"
          seed += "  :object_type => 'gas',"
          seed += "\r\n"
          seed += "  :name => '#{name}',"
          seed += "\r\n"
          seed += "  :lat => #{lat},"
          seed += "\r\n"
          seed += "  :lon => #{lon},"
          seed += "\r\n"
          seed += "  :image => '#{image}',"
          seed += "\r\n"
          seed += "  :description => <<-eos\r\n#{description_html}\r\neos"
          seed += "\r\n"
          seed += ")"
          seed += "\r\n"
          seed += "\r\n"
          seeds += seed
        end
        seeds
      end
    end
  end
end