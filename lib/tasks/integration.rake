namespace :integration do
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
  end
end