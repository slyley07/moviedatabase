module Title
  # function for retrieving the title from the JSON
  def title(page, id)
    # puts the returned JSON in a variable
    @request = make_endpoint(page)

    # digs into the returned JSON and retrieves the title from the specific ID
    @request["results"][id]["title"]
  end
end
