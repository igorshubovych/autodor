class PointsController < ApplicationController
  layout "points"
  
  def index
    @points = Point.all
  end

  def show
    @point = Point.find(params[:id])
  end

  def new
    @point = Point.new
  end

  def edit
    @point = Point.find(params[:id])
  end

  def create
    @point = Point.new(params[:point])
    
    if (!params[:image].nil?)
		filename = upload['file'].originaal_filename
		dir = 'public/images/upload'
		
		path = File.join(dir, filename)
		File.open(path, "wb") { |f| f.write(upload['file'].read) }
    end

	if @point.save
	  redirect_to(@point, :notice => 'Point was successfully created.')
	else
	  render :action => "new"
	end
  end

  def update
    @point = Point.find(params[:id])
    
    if (!params[:image].nil?)
		io = params[:image]
		path = File.join('public/images/upload', io.original_filename)
		File.open(path, 'wb') do |f|
			f.write(io.read)
		end
		
		@point.image = File.join('upload', io.original_filename)
    end
    
    if @point.update_attributes(params[:point])
      redirect_to(@point, :notice => 'Point was successfully updated.')
    else
      render :action => "edit"
    end
  end

  def destroy
    @point = Point.find(params[:id])
    @point.destroy
    
    redirect_to(points_url)
  end
end
