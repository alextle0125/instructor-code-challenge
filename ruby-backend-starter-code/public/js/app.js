(function(){

  document.querySelector('form').addEventListener('submit', function(event){
    event.preventDefault();
    var searchList = document.querySelector('ul');
    var input = document.querySelector('input').value;

    function retreiveSearchData() {
      var xhr = new XMLHttpRequest();
      xhr.open('get', 'http://omdbapi.com/?s=' + encodeURIComponent(input), true);
      xhr.addEventListener('load', function(response){
        var res =  JSON.parse(this.response).Search;
        generateListData(res);
      });
      xhr.send();
    }
    function generateListData(res) {
      for(var i = 0; i < res.length; i++){
          var node = document.createElement('li');

          var anchor = document.createElement('a');
          anchor.innerText = res[i].Title;
          node.appendChild(anchor);

          searchList.appendChild(node);
        }
    }

    if(searchList.children.length > 0){
      while (searchList.firstChild) {
        searchList.removeChild(searchList.firstChild)
      }
      retreiveSearchData();
    } else {
      retreiveSearchData();
    }
  });
})();
