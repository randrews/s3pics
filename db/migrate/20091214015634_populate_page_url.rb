class PopulatePageUrl < ActiveRecord::Migration
  def self.up
    Image.find_all_by_page_url(nil).each{|i| i.update_attribute(:page_url, i.original_url)}
  end

  def self.down
  end
end
