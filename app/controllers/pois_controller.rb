class PoisController < ApplicationController
  # GET /pois
  # GET /pois.xml
  def index
    @pois = Poi.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @pois }
    end
  end

  # GET /pois/1
  # GET /pois/1.xml
  def show
    @poi = Poi.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @poi }
    end
  end

  # GET /pois/new
  # GET /pois/new.xml
  def new
    @poi = Poi.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @poi }
    end
  end

  # GET /pois/1/edit
  def edit
    @poi = Poi.find(params[:id])
  end

  # POST /pois
  # POST /pois.xml
  def create
    @poi = Poi.new(params[:poi])

    respond_to do |format|
      if @poi.save
        format.html { redirect_to(@poi, :notice => 'Poi was successfully created.') }
        format.xml  { render :xml => @poi, :status => :created, :location => @poi }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @poi.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /pois/1
  # PUT /pois/1.xml
  def update
    @poi = Poi.find(params[:id])

    respond_to do |format|
      if @poi.update_attributes(params[:poi])
        format.html { redirect_to(@poi, :notice => 'Poi was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @poi.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /pois/1
  # DELETE /pois/1.xml
  def destroy
    @poi = Poi.find(params[:id])
    @poi.destroy

    respond_to do |format|
      format.html { redirect_to(pois_url) }
      format.xml  { head :ok }
    end
  end
end
