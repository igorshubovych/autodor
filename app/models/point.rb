class Point < ActiveRecord::Base
	def save(upload)
		filename = upload[:datafile].original_filename
		dir = 'public/images/uploaded/'
		
		path = File.join(dir, filename)
		File.open(path, 'wb') { |f| f.write(upload['datafile'].read) }
	end
end
