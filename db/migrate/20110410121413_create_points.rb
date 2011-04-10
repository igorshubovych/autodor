class CreatePoints < ActiveRecord::Migration
  def self.up
    create_table :points do |t|
      t.string :name
      t.text :description
      t.string :image
      t.float :lat
      t.float :lon
      t.string :type

      t.timestamps
    end
  end

  def self.down
    drop_table :points
  end
end
