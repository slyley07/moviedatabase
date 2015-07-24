module Release
  # function for retrieving the release date from the JSON
  def release(page, id)
    # puts the returned JSON in a variable
    @request = make_endpoint(page)

    # puts the retrieved release_date from the JSON
    full = @request["results"][id]["release_date"]

    # splices out the first four indices (the release year)
    full[0, 4]
  end
end
