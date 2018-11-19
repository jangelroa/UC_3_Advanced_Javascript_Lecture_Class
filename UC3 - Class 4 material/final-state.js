function postCallback(post) {
  var div = document.createElement('DIV');
  div.innerHTML = 'Post title: ' + post.title;
  document.body.append(div);
}

function commentCallback(comment) {
  var div = document.createElement('DIV');
  div.innerHTML = 'Comment name: ' + comment.name;
  document.body.append(div);
}

function albumCallback(album) {
  var div = document.createElement('DIV');
  div.innerHTML = 'Album title: ' + album.title;
  document.body.append(div);
}

function photoCallback(photo) {
  var div = document.createElement('DIV');
  div.innerHTML = 'Photo thumbnail: <img src="' + photo.thumbnailUrl + '" />';
  document.body.append(div);
}

function todoCallback(todo) {
  var div = document.createElement('DIV');
  div.innerHTML = 'Todo title: ' + todo.title;
  document.body.append(div);
}

function userCallback(user) {
  var div = document.createElement('DIV');
  div.innerHTML = 'User name: ' + user.name;
  document.body.append(div);
}


function makeXhrRequestWithPromise(url) {

  var myPromise = new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var response = JSON.parse(this.responseText);
          resolve(response);
        }
        if (this.readyState == 4 && this.status !== 200) {
          reject('something');
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
  });

  return myPromise;
}

var postPromise = makeXhrRequestWithPromise("https://jsonplaceholder.typicode.com/posts/1");
var commentPromise = makeXhrRequestWithPromise("https://jsonplaceholder.typicode.com/comments/1");
var albumPromise = makeXhrRequestWithPromise("https://jsonplaceholder.typicode.com/albums/1");
var photoPromise = makeXhrRequestWithPromise("https://jsonplaceholder.typicode.com/photos/1");
var todoPromise = makeXhrRequestWithPromise("https://jsonplaceholder.typicode.com/todos/1");
var userPromise = makeXhrRequestWithPromise("https://jsonplaceholder.typicode.com/users/1");

var myTimeoutPromise = new Promise(function(resolve, reject) {
  setTimeout(function(){
    reject();
  }, 5000);
})

postPromise
  .then(function(response) {
    postCallback(response);
  })
  .then(function() {
    return commentPromise;
  })
  .then(function(response) {
    commentCallback(response);
  })
  .then(function() {
    return albumPromise;
  })
  .then(function(response) {
    albumCallback(response);
  })
  .then(function() {
    return photoPromise;
  })
  .then(function(response) {
    photoCallback(response);
  })
  .then(function() {
    return todoPromise;
  })
  .then(function(response) {
    todoCallback(response);
  })
  .then(function() {
    return userPromise;
  })
  .then(function(response) {
    userCallback(response);
  })
  .then(function() {
    var div = document.createElement('DIV');
    div.innerHTML = 'Everything is shown! Yay!';
    document.body.append(div);
  });


Promise.all([
  postPromise,
  commentPromise,
  albumPromise,
  photoPromise,
  todoPromise,
  userPromise
]).then(function() {
  var div = document.createElement('DIV');
  div.innerHTML = 'Everything has loaded! Yay!';
  document.body.append(div);
});
