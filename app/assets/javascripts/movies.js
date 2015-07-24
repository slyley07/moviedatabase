// places the title class into a variable
var title = document.getElementsByClassName('title')
// places the img class into a variable
var img = document.getElementsByClassName('images')
// creates a global variable to default the page number to 1 when the user refreshes the page
var _page = 1;

// function for showing the title when the user hovers over the movie div
function showTitle(i) {
  var thing = title[i];
  thing.style.display = "block";
  thing.style.position = "absolute";
  thing.style.width = "180px";
  thing.style.marginTop = "-200px";
  img[i].style.opacity = 0.4;
}

// function for hiding the title when the user's mouse exits the movie div
function hideTitle(i) {
  title[i].style.display = "none";
  img[i].style.opacity = 1;
}

$(document).ready(function(){
  // puts the common url into a variable
  var img_url = "http://image.tmdb.org/t/p/w185"

  // function for changing the data from page to page
  function changePlaces(data) {

    // variable for calling all of the images from the page
    // will be further used to call pages without a full 20 images
    j =20

    // looping through each image from the JSON
    for (i = 0; i < j; i ++) {
        //logic for returning a default image if the poster_path is null
        if (data["responseJSON"]["results"][i]["poster_path"] === null) {
          // replaces the src of the null image with the default image
          $(".images." + i).attr('src', "assets/film_reel.jpg")
        } else {
          // replaces the src of the old image with the new image from the JSON
          $(".images." + i).attr('src', img_url + data["responseJSON"]["results"][i]["poster_path"]);
        }
      // replaces the html of each movie title with the new title from the return AJAX request (below)
      $(".title." + i).html(data["responseJSON"]["results"][i]["title"]);
    }
  }

  // click function on the right button
  $('.right').click(function(){
    // function for increasing the page number after the right button is clicked
    function increasePage() {
      // logic for increasing the page number by one unless the user is on the last page, which will take them back to the first page
      if (_page < 26) {
        _page = _page + 1;
      } else if (_page = 26) {
        _page = 1;
      }
      return _page;
    }

    // function for creating the url for the next page in sequential order (unless on the twenty-sixth page)
    function makeRight() {
      increasePage();
      url = 'http://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&page=' + _page;
      console.log(_page);
      return url;
    }

    // AJAX request calling the json on the url returned from makeRight and calling change places on the data that are returned
    $.ajax({
      method: 'GET',
      url: makeRight(),
      dataType: 'json',
      complete: function(data){
          changePlaces(data)
        }
    })
  });

  // click function on the right button
  $('.left').click(function() {
    // function for decreasing the page number after the left button is clicked
    function decreasePage() {
      // logic for decreasing the page number by one unless the user is on the first page, which will take them back to the twenty-sixth page
      if (_page > 1) {
        _page = _page - 1;
      } else if (_page = 1) {
        _page = 26;
      }
      return _page;
    }

    // function for creating the url for the previous page in sequential order (unless on the first page)
    function makeLeft() {
      decreasePage();
      url = 'http://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&page=' + _page;
      console.log(_page);
      return url;
    }

    // AJAX request calling the JSON on the url returned from makeLeft and calling change places on the data that are returned
    $.ajax({
      method: 'GET',
      url: makeLeft(),
      dataType: 'json',
      complete: function(data){
          changePlaces(data)
        }
    })
  })
})
