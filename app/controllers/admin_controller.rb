class AdminController < ApplicationController
	attr_accessor :points
	
	def initialize
		self.points = []
	end
	
	def index
		render :layout => 'admin'
	end
	
	def savePoint
		redirect_to :action => :index
	end

	def removePoint
		redirect_to :action => :index
	end
	
	def uploadImg
		p = Point.save(params[:upload])
		
		redirect_to :action => :index
	end
end
