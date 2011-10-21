class News
  require 'open-uri'
  require 'iconv'
  
  def self.load
	Iconv.iconv('UTF-8', 'WINDOWS-1251', open('http://www.ukravtodor.gov.ua/clients/ukrautodor.nsf/news_value.js').readlines().join('')).join('')
  end
end
