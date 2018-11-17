function makeXhrRequest(resource) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        setTimeout(function() {
          var response = JSON.parse(xhr.responseText);
          resource.functionResponse(response);
        }, Math.random() * 1000);
      }
  };
  xhr.open("GET", resource.url, true);
  xhr.send();
}

function syncronizeCallbacks() {

  const arePreviousResourcesShown = function(resourceId) {
    for (let i = 0; i < resourceId; i++) {
      if (!xhrData[i].shown) {
        return false;
      }
    }
    return true;
  }
  
  for (let i = 0; i < xhrData.length; i++) {
    if (xhrData[i].response) {
      if (!xhrData[i].shown && arePreviousResourcesShown(xhrData[i].resourceId)) {
        xhrData[i].callback(xhrData[i].response);
        xhrData[i].shown = true;
      }
    }
  }

}

const xhrData = [
  {
    resourceId: 0,
    url: "https://jsonplaceholder.typicode.com/posts/1",
    functionResponse: function(response) {
      this.response = response;
      syncronizeCallbacks();
    },
    callback: (post) => {
      var div = document.createElement('DIV');
      div.innerHTML = 'Post title: ' + post.title;
      document.body.append(div);
    },
    response: null,
    shown: false
  },
  {
    resourceId: 1,
    url: "https://jsonplaceholder.typicode.com/comments/1",
    functionResponse: function(response) {
      this.response = response;
      syncronizeCallbacks();
    },
    callback: (comment) => {
      var div = document.createElement('DIV');
      div.innerHTML = 'Comment name: ' + comment.name;
      document.body.append(div);
    },
    response: null,
    shown: false
  },
  {
    resourceId: 2,
    url: "https://jsonplaceholder.typicode.com/albums/1",
    functionResponse: function(response) {
      this.response = response;
      syncronizeCallbacks();
    },
    callback: (album) => {
      var div = document.createElement('DIV');
      div.innerHTML = 'Album title: ' + album.title;
      document.body.append(div);
    },
    response: null,
    shown: false
  },
  {
    resourceId: 3,
    url: "https://jsonplaceholder.typicode.com/photos/1",
    functionResponse: function(response) {
      this.response = response;
      syncronizeCallbacks();
    },
    callback: (photo) =>{
      var div = document.createElement('DIV');
      div.innerHTML = 'Photo thumbnail: <img src="' + photo.thumbnailUrl + '" />';
      document.body.append(div);
    },
    response: null,
    shown: false
  },
  {
    resourceId: 4,
    url: "https://jsonplaceholder.typicode.com/todos/1",
    functionResponse: function(response) {
      this.response = response;
      syncronizeCallbacks();
    },
    callback: (todo) => {
      var div = document.createElement('DIV');
      div.innerHTML = 'Todo title: ' + todo.title;
      document.body.append(div);
    },
    response: null,
    shown: false
  },
  {
    resourceId: 5,
    url: "https://jsonplaceholder.typicode.com/users/1",
    functionResponse: function(response) {
      this.response = response;
      syncronizeCallbacks();
    },
    callback: (user) => {
      var div = document.createElement('DIV');
      div.innerHTML = 'User name: ' + user.name;
      document.body.append(div);
    },
    response: null,
    shown: false
  }
];

xhrData.forEach(resource => {  
  makeXhrRequest(resource);
});


