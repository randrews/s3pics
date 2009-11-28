class CreateImages < ActiveRecord::Migration
  def self.up
    create_table :images do |t|
      t.string :s3_key
      t.integer :user_id
      t.string :original_url
      t.boolean :private, :default=>false
      t.text :comment

      t.timestamps
    end
  end

  def self.down
    drop_table :images
  end
end
