class Image < ActiveRecord::Base
  belongs_to :user

  named_scope :public, :conditions=>{:private=>false}

  # Copy the image at image_url to S3
  def upload_to_s3
    hash = Digest::SHA1.hexdigest(original_url)
    key = "#{id}-#{hash}#{extension}"
    AWS::S3::S3Object.store(key,
                            open(original_url),
                            S3_BUCKET,
                            :access=>:public_read)
    self.update_attribute :s3_key, key
  end

  def extension
    if original_url =~ /.*\/[^\/]*(\.[^\/]*?)(\?.*)?$/
      $1
    else
      ""
    end
  end
end
