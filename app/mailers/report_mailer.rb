class ReportMailer < ActionMailer::Base
  default :from => "report@mykolaivautodor.heroku.com"

  def new_report(description)
  	@message = description
  	mail( :to => "shybovycha@gmail.com", :subject => "New report" )
  	#mail( :to => "shybovycha@gmail.com", :subject => "New report" )
  end
end
