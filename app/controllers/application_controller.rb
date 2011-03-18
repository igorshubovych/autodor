class ApplicationController < ActionController::Base
  protect_from_forgery
  
  before_filter :set_locale
  
  def extract_locale_from_tld
    request.host.split(',').last
  end
  
  def extract_locale_from_subdomain
    request.subdomains.first
  end
  
  def extract_locale_from_accept_language_header
    request.env['HTTP_ACCEPT_LANGUAGE'].scan(/^[a-z]{2}/).first
  end
  
  def set_locale
    extracted_locale = params[:locale] ||
                       extract_locale_from_subdomain ||
                       extract_locale_from_tld ||
                       extract_locale_from_accept_language_header
    I18n.locale = (I18n::available_locales.include? extracted_locale.to_sym) ? extracted_locale :
                                                                               I18n.default_locale
  end
end
