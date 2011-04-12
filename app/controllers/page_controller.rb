class PageController < ApplicationController
  layout 'map'
  
  def contact
  end

  def support
  end

  def about
  end
  
  def links
    @links = [ 
				MLink.new('links.euro2012highway', 'http://euro2012highway.blogspot.com/', 'euro2012highway_thumb.png'),
				MLink.new('links.diprodor', 'http://diprodor.com', 'diprodor_thumb.png'),
				MLink.new('links.ukrautodor', 'http://ukravtodor.gov.ua/clients/ukrautodor.nsf', '0.jpg'),
				MLink.new('links.uefa_com', 'http://www.uefa.com/uefaeuro2012/', '1.jpg'),
				MLink.new('links.euro_2012', 'http://euro-2012.com.ua/', '2.jpg'),
				MLink.new('links._2012ua', 'http://2012ua.net/', '3.jpg'),
			 ]
  end

  def news
    doc = Hpricot(CurbFu.get('http://ukraine2012.gov.ua/news/').body)

    @news = doc.search("div[@class=commentari]")

    @news.search("[@src]").each do |e|
      e.attributes['src'] = "http://ukraine2012.gov.ua#{ e.attributes['src'] }"
    end

    @news.search("[@href]").each do |e|
      e.attributes['href'] = "http://ukraine2012.gov.ua#{ e.attributes['href'] }"
    end

  end

end

class MLink
	attr_accessor :title, :url, :img

	def initialize(a, b, c)
	  self.title = a
	  self.url = b
	  self.img = c
	end
end
