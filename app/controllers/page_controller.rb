class PageController < ApplicationController
  layout 'regional'

	before_filter :news_loader
  
  def contact
  end

  def support
  end

  def about
  end

	def notify
	end
  
  def laws
  end

	def news
    render 'news', :layout => 'news'
  end
  
  def send_notify
  	ReportMailer.new_report(params[:message]).deliver
	session[:return_to] ||= request.referer
	redirect_to session[:return_to]
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

	private

	def news_loader
		@news = News.load
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
