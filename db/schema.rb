# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20110410165236) do

  create_table "points", :force => true do |t|
    t.string   "object_type"
    t.string   "name"
    t.text     "description"
    t.decimal  "lat"
    t.decimal  "lon"
    t.text     "image"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "points", ["object_type"], :name => "index_points_on_object_type"

  create_table "pois", :force => true do |t|
    t.string   "object_type"
    t.string   "name"
    t.text     "description"
    t.decimal  "lat"
    t.decimal  "lon"
    t.text     "image"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "pois", ["object_type"], :name => "index_pois_on_object_type"

end
