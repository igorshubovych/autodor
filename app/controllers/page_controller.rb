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
				MLink.new('links.euro-2012', 'http://euro-2012.com.ua/', '2.jpg'),
				MLink.new('links.2012ua', 'http://2012ua.net/', '3.jpg'),
			 ]
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
