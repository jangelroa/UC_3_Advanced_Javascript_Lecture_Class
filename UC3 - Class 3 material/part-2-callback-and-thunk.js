// Simple callback

function makeXhrRequest(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        setTimeout(function() {
          var response = JSON.parse(xhr.responseText);
          callback(response);
        }, Math.random() * 1000);
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

makeXhrRequest("https://jsonplaceholder.typicode.com/posts/1", function(response) {
  postCallback(response);

  makeXhrRequest("https://jsonplaceholder.typicode.com/comments/1", function(response) {
    commentCallback(response);

    makeXhrRequest("https://jsonplaceholder.typicode.com/albums/1", function(response) {
      albumCallback(response);

      makeXhrRequest("https://jsonplaceholder.typicode.com/photos/1", function(response) {
        photoCallback(response);

        makeXhrRequest("https://jsonplaceholder.typicode.com/todos/1", function(response) {
          todoCallback(response);

          makeXhrRequest("https://jsonplaceholder.typicode.com/users/1", function(response) {
            userCallback(response);
          });
        });
      });
    });
  });
});


// Thunk

function makeThunk(url) {
  return function(callback) {
    makeXhrRequest(url, function(response) {
      callback(response);
    });
  };
}

var postThunk = makeThunk("https://jsonplaceholder.typicode.com/posts/1");
var commentThunk = makeThunk("https://jsonplaceholder.typicode.com/comments/1");
var albumThunk = makeThunk("https://jsonplaceholder.typicode.com/albums/1");
var photoThunk = makeThunk("https://jsonplaceholder.typicode.com/photos/1");
var todoThunk = makeThunk("https://jsonplaceholder.typicode.com/todos/1");
var userThunk = makeThunk("https://jsonplaceholder.typicode.com/users/1");

postThunk(function(postResponse) {
  postCallback(postResponse);

  commentThunk(function(commentResponse) {
    commentCallback(commentResponse);

    albumThunk(function(albumResponse) {
      albumCallback(albumResponse);

      photoThunk(function(photoResponse) {
        photoCallback(photoResponse);

        todoThunk(function(todoResponse) {
          todoCallback(todoResponse);

          userThunk(function(userResponse) {
            userCallback(userResponse);
          });
        });
      });
    });
  });
});
