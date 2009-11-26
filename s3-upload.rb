require "rubygems"
require "aws/s3"
require "fileutils"

$login = {
  :bucket_name => "lookingat",
  :access_key_id => "AKIAIBUKHD25ORHHTTZA",
  :secret_access_key => "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"
}

AWS::S3::Base.establish_connection! $login.reject{|k,v| k==:bucket_name}

def bucket
  @bucket ||= AWS::S3::Bucket.find($login[:bucket_name])
end

def extant
  @extant ||= bucket.objects.map{|o| o.key}
end

Dir[File.join((ARGV[0] || "."),"*")].each do |file|
  if extant.index File.basename(file)
    puts "#{File.basename(file)} exists; skipping"
  else
    puts "Uploading #{File.basename(file)}"
    AWS::S3::S3Object.store(File.basename(file),
                            File.open(file),
                            $login[:bucket_name],
                            :access=>:public_read)
  end
end
