class AddPageFieldsToImages < ActiveRecord::Migration
  def self.up
    add_column :images, :page_url, :string
    add_column :images, :page_broken, :boolean
  end

  def self.down
    remove_column :images, :page_broken
    remove_column :images, :page_url
  end
end
