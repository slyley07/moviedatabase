class MoviesController < ApplicationController
  def index
    # create a new TMDB client as an instance variable
    @client = TMDB::Client.new
  end
end
