class News
  require 'curb-fu'
  require 'hpricot'
  
  def self.load
    doc = Hpricot(CurbFu.get('http://ukraine2012.gov.ua/news/').body)
    news = doc.search("div[@class=commentari]")
    news.search("[@src]").each do |e|
      e.attributes['src'] = "http://ukraine2012.gov.ua#{ e.attributes['src'] }"
    end
    news.search("[@href]").each do |e|
      e.attributes['href'] = "http://ukraine2012.gov.ua#{ e.attributes['href'] }"
    end
    news
  end
end