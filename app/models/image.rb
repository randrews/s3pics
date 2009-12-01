class Image < ActiveRecord::Base
  belongs_to :user

  named_scope :public, :conditions=>{:private=>false}

  has_attachment :storage=>:s3

  # Copy the image at image_url to S3
  def upload_to_s3
    
  end
end
