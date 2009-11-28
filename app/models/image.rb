class Image < ActiveRecord::Base
  belongs_to :user

  named_scope :public, :conditions=>{:private=>false}
end
