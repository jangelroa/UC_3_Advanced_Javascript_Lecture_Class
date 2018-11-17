// Simple callback

function makeXhrRequest(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var response = JSON.parse(this.responseText);
        callback(response);
      }
  };
  xhr.open("GET", url, true);
  xhr.send();
}

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

makeXhrRequest("https://jsonplaceholder.typicode.com/posts/1", postCallback);

makeXhrRequest("https://jsonplaceholder.typicode.com/comments/1", commentCallback);

makeXhrRequest("https://jsonplaceholder.typicode.com/albums/1", albumCallback);

makeXhrRequest("https://jsonplaceholder.typicode.com/photos/1", photoCallback);

makeXhrRequest("https://jsonplaceholder.typicode.com/todos/1", todoCallback);

makeXhrRequest("https://jsonplaceholder.typicode.com/users/1", userCallback);


// Thunk

var postThunk = function(callback) {
  makeXhrRequest("https://jsonplaceholder.typicode.com/posts/1", function(response) {
    callback(response);
  });
};

var commentThunk = function(callback) {
  makeXhrRequest("https://jsonplaceholder.typicode.com/comments/1", function(response) {
    callback(response);
  });
};

var albumThunk = function(callback) {
  makeXhrRequest("https://jsonplaceholder.typicode.com/albums/1", function(response) {
    callback(response);
  });
};

var photoThunk = function(callback) {
  makeXhrRequest("https://jsonplaceholder.typicode.com/photos/1", function(response) {
    callback(response);
  });
};

var todoThunk = function(callback) {
  makeXhrRequest("https://jsonplaceholder.typicode.com/todos/1", function(response) {
    callback(response);
  });
};

var userThunk = function(callback) {
  makeXhrRequest("https://jsonplaceholder.typicode.com/users/1", function(response) {
    callback(response);
  });
};

postThunk(postCallback);

commentThunk(commentCallback);

albumThunk(albumCallback);

photoThunk(photoCallback);

todoThunk(todoCallback);

userThunk(userCallback);
