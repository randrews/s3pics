s3_credentials = YAML.load(File.read("config/amazon_s3.yml"))[RAILS_ENV].symbolize_keys
AWS::S3::Base.establish_connection! :access_key_id=>s3_credentials[:access_key_id], :secret_access_key=>s3_credentials[:secret_access_key]
S3_BUCKET = s3_credentials[:bucket_name]
