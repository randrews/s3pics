class User < ActiveRecord::Base
  acts_as_authentic do |c|
    c.crypted_password_field :hashed_password
    c.password_salt_field :salt
    c.login_field :name

    c.require_password_confirmation false
    c.validate_password_field false
  end
end
