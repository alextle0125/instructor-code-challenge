class CreateMovies < ActiveRecord::Migration
  def change
     create_table :movies do |t|
      t.string :id
      t.string :imdbid
      t.string :title
      t.string :year
      t.string :rating
      t.string :runtime
      t.string :genre
      t.string :released
      t.string :director
      t.string :writer
      t.string :cast
      t.string :metacritic
      t.string :imdbrating
      t.string :imdbvotes
      t.string :poster
      t.string :plot
      t.string :fullplot
      t.string :language
      t.string :country
      t.string :awards
      t.string :lastupdated    
      t.timestamps
    end
  end
end
