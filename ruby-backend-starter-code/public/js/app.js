(function(){
  var frontSide = true;
  function resetItemData(movieID, node) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'http://omdbapi.com/?apikey=a89d9f1b&i=' + movieID, true);
    xhr.addEventListener('load', function(response){
      var res = JSON.parse(this.response);

      var imageAnchorNode = document.createElement('a');
      imageAnchorNode.href = res.Poster;
      var imageNode = document.createElement('img');
      imageNode.className = "poster";
      imageNode.src = res.Poster;
      imageAnchorNode.appendChild(imageNode);
      node.appendChild(imageAnchorNode);

      var favoriteForm = document.createElement('form');
      var favoriteInput = document.createElement('input');
      var favoriteNode = document.createElement('button');
      favoriteForm.setAttribute('action','/favorited');
      favoriteForm.setAttribute('method','POST');
      favoriteInput.setAttribute('type','hidden');
      favoriteInput.setAttribute('name','oid');
      favoriteInput.setAttribute('value',JSON.stringify(res));
      favoriteNode.className = "glyphicon glyphicon-star";
      favoriteForm.appendChild(favoriteInput);
      favoriteForm.appendChild(favoriteNode);
      node.appendChild(favoriteForm);

      var releaseDateNode = document.createElement('p');
      releaseDateNode.innerText = res.Released;
      node.appendChild(releaseDateNode);

      var directorNode = document.createElement('p');
      directorNode.innerText = 'Director: ' + res.Director;
      node.appendChild(directorNode);

      var writerNode = document.createElement('p');
      writerNode.innerText = 'Writer(s): ' + res.Writer;
      node.appendChild(writerNode);

      var actorNode = document.createElement('p');
      actorNode.innerText = 'Actor(s): ' + res.Actors;
      node.appendChild(actorNode);

    });
    xhr.send();
  }
  document.querySelector('form#search-form').addEventListener('submit', function(event){
    event.preventDefault();
    var searchForm = document.querySelector('form');
    var searchList = document.querySelector('.wrapper');
    var loadingFX = document.querySelector('#shmancy-animation');
    var input = document.querySelector('input').value;

    // searchForm.style.display = 'none';
    loadingFX.style.visibility = 'visible';


    function retreiveSearchData() {
      var xhr = new XMLHttpRequest();
      xhr.open('get', 'http://omdbapi.com/?apikey=a89d9f1b&s=' + encodeURIComponent(input), true);
      xhr.addEventListener('load', function(response){
        var res =  JSON.parse(this.response).Search;
        if(res){
          generateListData(res);
        }
      });
      xhr.send();
    }
    function retreiveItemData(movieID, node) {
      var xhr = new XMLHttpRequest();
      xhr.open('get', 'http://omdbapi.com/?apikey=a89d9f1b&i=' + movieID, true);
      xhr.addEventListener('load', function(response){
        var res = JSON.parse(this.response);

        var imageAnchorNode = document.createElement('a');
        imageAnchorNode.href = res.Poster;
        var imageNode = document.createElement('img');
        imageNode.className = "poster";
        imageNode.src = res.Poster;
        imageAnchorNode.appendChild(imageNode);
        node.appendChild(imageAnchorNode);

        var favoriteForm = document.createElement('form');
        var favoriteInput = document.createElement('input');
        var favoriteNode = document.createElement('button');
        favoriteForm.setAttribute('action','/favorited');
        favoriteForm.setAttribute('method','POST');
        favoriteInput.setAttribute('type','hidden');
        favoriteInput.setAttribute('name','oid');
        favoriteInput.setAttribute('value',JSON.stringify(res));
        favoriteNode.className = "glyphicon glyphicon-star";
        favoriteForm.appendChild(favoriteInput);
        favoriteForm.appendChild(favoriteNode);
        node.appendChild(favoriteForm);

        var releaseDateNode = document.createElement('p');
        releaseDateNode.innerText = res.Released;
        node.appendChild(releaseDateNode);

        var directorNode = document.createElement('p');
        directorNode.innerText = 'Director: ' + res.Director;
        node.appendChild(directorNode);

        var writerNode = document.createElement('p');
        writerNode.innerText = 'Writer(s): ' + res.Writer;
        node.appendChild(writerNode);

        var actorNode = document.createElement('p');
        actorNode.innerText = 'Actor(s): ' + res.Actors;
        node.appendChild(actorNode);

      });
      xhr.send();
    }
    function generateListData(res) {
      var searchList = document.querySelector('.wrapper');
      var loadingFX = document.querySelector('#shmancy-animation');
      var closeResultsIcon = document.querySelector('.glyphicon-eye-close');
      loadingFX.style.visibility = 'hidden';
      searchList.style.display = 'block';
      closeResultsIcon.style.display = 'block';
      for(var i = 0; i < res.length; i++){
          var node = document.createElement('div');
          node.className = 'movie-card';

          var header = document.createElement('h4');
          header.innerHTML = "<span class='imdbid'>" + res[i].imdbID + "</span>" + JSON.stringify(res[i].Title);
          node.appendChild(header);

          searchList.appendChild(node);

          retreiveItemData(res[i].imdbID, node);
      }
    }

    if(searchList.children.length > 0){
      while (searchList.firstElementChild) {
        searchList.removeChild(searchList.firstElementChild)
      }
      retreiveSearchData();
    } else {
      retreiveSearchData();
    }
  });

  document.querySelector('body').addEventListener('click', function(event){
    if(event.target.className === 'movie-card') {
      var imdbID = event.target.firstElementChild.className === 'imdbid' ? event.target.firstElementChild.innerText : event.target.firstElementChild.firstElementChild === 'imdbid' ? event.target.firstElementChild.firstElementChild.innerText : null;
      var movieCard = event.target;
    } else if (event.target.parentNode.className === 'movie-card') {
      if(event.target.parentNode.firstElementChild.className === 'imdbid'){
       var imdbID = event.target.parentNode.firstElementChild.innerText;
       var movieCard = event.target.parentNode;
      } else if (event.target.parentNode.firstElementChild.firstElementChild.className === 'imdbid') {
       var imdbID = event.target.parentNode.firstElementChild.firstElementChild.innerText;
       var movieCard = event.target.parentNode;
      }
    }
    if(imdbID && movieCard && frontSide === true){
      var xhr = new XMLHttpRequest();
      xhr.open('get', 'http://www.omdbapi.com/?apikey=a89d9f1b&i=' + imdbID, true);
      xhr.addEventListener('load', function(response){
        var res =  JSON.parse(this.response);        
        if(movieCard.className === 'movie-card'){
          while (movieCard.firstElementChild) {
            movieCard.removeChild(movieCard.firstElementChild)
          }
          movieCard.style.padding = '32px';

          var imdbIDNode = document.createElement('span');
          imdbIDNode.className = 'imdbid';
          imdbIDNode.innerText = res.imdbID;
          movieCard.appendChild(imdbIDNode);

          var genreNode = document.createElement('p');
          genreNode.innerText = "Genre: " + res.Genre;
          movieCard.appendChild(genreNode);

          var descNode = document.createElement('p');
          descNode.innerText = res.Plot;
          movieCard.appendChild(descNode);

          var languageNode = document.createElement('p');
          languageNode.innerText = "Language: " +  res.Language;
          movieCard.appendChild(languageNode);

          var countryNode = document.createElement('p');
          countryNode.innerText = "Country: " + res.Country;
          movieCard.appendChild(countryNode);

          var awardsNode = document.createElement('p');
          awardsNode.innerText = "Awards: " + res.Awards;
          movieCard.appendChild(awardsNode);

          var metascoreNode = document.createElement('p');
          metascoreNode.innerText = "Metascore: " + res.Metascore;
          movieCard.appendChild(metascoreNode);

          var imdbRatingNode = document.createElement('p');
          imdbRatingNode.innerText = "IMDB Rating: " + res.imdbRating + " / " + res.imdbVotes;
          movieCard.appendChild(imdbRatingNode);
        }
      });
      xhr.send();
      frontSide = false;
    } else if (frontSide === false) {
      var xhr = new XMLHttpRequest();
      xhr.open('get', 'http://www.omdbapi.com/?apikey=a89d9f1b&i=' + imdbID, true);
      xhr.addEventListener('load', function(response){
        var res = JSON.parse(this.response);
        while (movieCard.firstElementChild) {
          movieCard.removeChild(movieCard.firstElementChild)
        }
        movieCard.style.padding = '0px';


        var header = document.createElement('h4');
        header.innerHTML = "<span class='imdbid'>" + res.imdbID + "</span>" + JSON.stringify(res.Title);
        movieCard.appendChild(header);

        movieCard.appendChild(header);

        resetItemData(res.imdbID, movieCard);
      });
      xhr.send();
      frontSide = true;
    }
  });
})();
