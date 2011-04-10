class CreatePois < ActiveRecord::Migration
  def self.up
    create_table :pois do |t|
      t.string :object_type
      t.string :name
      t.text :description
      t.decimal :lat
      t.decimal :lon
      t.text :image

      t.timestamps
    end
    
    add_index :pois, :object_type
  end

  def self.down
    drop_table :pois
  end
end
