class CreatePoints < ActiveRecord::Migration
  def self.up
    create_table :points do |t|
      t.string :object_type
      t.string :name
      t.text :description
      t.decimal :lat
      t.decimal :lon
      t.text :image

      t.timestamps
    end
    add_index :points, :object_type
  end

  def self.down
    drop_table :points
  end
end
