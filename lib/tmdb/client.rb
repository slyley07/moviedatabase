require 'net/http'
require 'json'
require_relative './poster'
require_relative './title'
require_relative './release'

module TMDB
  class Client
    def initialize
      @url = 'http://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c'
    end

    # function for adding the page number to the end of the url
    def make_endpoint(page)
      @uri = URI(@url + "&page=#{page}")
      JSON.parse(Net::HTTP.get(@uri))
    end

    # simple function for testing that all of the modules work
    def make_thing(page, id
      title(page, id)
      poster(page, id)
      release(page, id)
    end

    include Poster
    include Title
    include Release
  end
end
