module Poster
  # function for retrieving the poster_path from the JSON
  def poster(page, id)
    #puts the returned JSON in a variable
    @request = make_endpoint(page)

    #logic for deciding returning a default image if the post_path returns "nil"
    if @request["results"][id]["poster_path"] == nil
      "assets/film_reel.jpg"
    else
      # concatenates the returned poster_path to the image common url
      "http://image.tmdb.org/t/p/w185" + @request["results"][id]["poster_path"]
    end
  end
end
