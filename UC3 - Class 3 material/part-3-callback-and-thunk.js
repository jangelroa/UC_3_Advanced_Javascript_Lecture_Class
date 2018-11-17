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

var isPostShown = false;
var isCommentShown = false;
var isAlbumShown = false;
var isPhotoShown = false;
var isTodoShown = false;
var isUserShown = false;

var postResponse;
var commentResponse;
var albumResponse;
var photoResponse;
var todoResponse;
var userResponse;

function syncronizeCallbacks() {
  if (postResponse) {
    if (!isPostShown) {
      postCallback(postResponse);
      isPostShown = true;
    }
  } else {
    return;
  }

  if (commentResponse) {
    if (!isCommentShown) {
      commentCallback(commentResponse);
      isCommentShown = true;
    }
  } else {
    return;
  }

  if (albumResponse) {
    if (!isAlbumShown) {
      albumCallback(albumResponse);
      isAlbumShown = true;
    }
  } else {
    return;
  }

  if (photoResponse) {
    if (!isPhotoShown) {
      photoCallback(photoResponse);
      isPhotoShown = true;
    }
  } else {
    return;
  }

  if (todoResponse) {
    if (!isTodoShown) {
      todoCallback(todoResponse);
      isTodoShown = true;
    }
  } else {
    return;
  }

  if (userResponse) {
    userCallback(userResponse);
  }
}

makeXhrRequest("https://jsonplaceholder.typicode.com/posts/1", function(response) {
  postResponse = response;
  syncronizeCallbacks();
});

makeXhrRequest("https://jsonplaceholder.typicode.com/comments/1", function(response) {
  commentResponse = response;
  syncronizeCallbacks();
});

makeXhrRequest("https://jsonplaceholder.typicode.com/albums/1", function(response) {
  albumResponse = response;
  syncronizeCallbacks();
});

makeXhrRequest("https://jsonplaceholder.typicode.com/photos/1", function(response) {
  photoResponse = response;
  syncronizeCallbacks();
});

makeXhrRequest("https://jsonplaceholder.typicode.com/todos/1", function(response) {
  todoResponse = response;
  syncronizeCallbacks();
});

makeXhrRequest("https://jsonplaceholder.typicode.com/users/1", function(response) {
  userResponse = response;
  syncronizeCallbacks();
});


// Thunk

function makeThunk(url) {
  var savedResponse;
  var savedCallback;

  makeXhrRequest(url, function(response) {
    if (savedCallback) {
      savedCallback(response);
    } else {
      savedResponse = response;
    }
  });

  return function(callback) {
    if (savedResponse) {
      callback(savedResponse);
    } else {
      savedCallback = callback;
    }
  };
}

function addNumbers(x, y) {
  return x + y;
}
var addFiveAndSevenThunk = function() {
  return addNumbers(5, 7);
};
addFiveAndSevenThunk() // 12

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
