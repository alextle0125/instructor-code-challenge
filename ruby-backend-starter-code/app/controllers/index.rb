get '/' do
  stored_data = File.read('data.json')
  unless stored_data.empty?
  	@favorites = JSON.parse(stored_data)
  end

  erb :index
end

post '/favorited' do
  retreived_file = File.read('data.json')
  parseFavoriteData = JSON.parse(params[:oid])
  unless retreived_file.empty?
	stored_data = JSON.parse(retreived_file)
	parseFavoriteData['Plot'] = parseFavoriteData['Plot'].gsub!("'", "\\\'")
	puts parseFavoriteData['Plot']
	stored_data[parseFavoriteData['imdbID']] = parseFavoriteData
	File.write('data.json',stored_data.to_json)
  else
  	createNewFavorites = {}
  	parseFavoriteData['Plot'] = parseFavoriteData['Plot'].gsub!("'", "\\\'")
  	puts parseFavoriteData['Plot']
  	createNewFavorites[parseFavoriteData['imdbID']] = parseFavoriteData
  	File.write('data.json',createNewFavorites.to_json)
  end
  
  redirect '/'
end