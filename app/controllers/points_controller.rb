class PointsController < ApplicationController
  layout "points"

  def query
    object_type = params[:object_type]
    lat1 = params[:lat1]
    lat2 = params[:lat2]
    lon1 = params[:lon1]
    lon2 = params[:lon2]
    extent = params[:extend]

	if not object_type then
      @points = []
    elsif lat1 && lon1 && lat2 && lon2 then
      @points = Point.by_object_type_in_bbox object_type, lat1.to_f, lon1.to_f, lat2.to_f, lon2.to_f, extent.to_f
    else
      @points = Point.by_object_type object_type
    end
  end

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
			io = params[:image]
			path = File.join('public/images/upload', io.original_filename)

			File.open(path, 'wb') do |f|
				f.write(io.read)
			end

			@point.image = File.join('upload', io.original_filename)
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
