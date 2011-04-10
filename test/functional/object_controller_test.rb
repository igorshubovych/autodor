require 'test_helper'

class ObjectControllerTest < ActionController::TestCase
  test "should get car_service" do
    get :car_service
    assert_response :success
  end

end
