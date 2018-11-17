function makeXhrRequestWithPromise(url) {
  const myPromise = new Promise(resolve => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        setTimeout(function() {
          const response = JSON.parse(xhr.responseText);
          resolve(response);
        }, Math.random() * 1000);
      }
    };
    xhr.open('GET', url, true);
    xhr.send();
  });
  return myPromise;
}

const postPromise = makeXhrRequestWithPromise(
  'https://jsonplaceholder.typicode.com/posts/1'
);
const commentPromise = makeXhrRequestWithPromise(
  'https://jsonplaceholder.typicode.com/comments/1'
);
const albumPromise = makeXhrRequestWithPromise(
  'https://jsonplaceholder.typicode.com/albums/1'
);
const photoPromise = makeXhrRequestWithPromise(
  'https://jsonplaceholder.typicode.com/photos/1'
);
const todoPromise = makeXhrRequestWithPromise(
  'https://jsonplaceholder.typicode.com/todos/1'
);
const userPromise = makeXhrRequestWithPromise(
  'https://jsonplaceholder.typicode.com/users/1'
);

function postCallback(post) {
  const div = document.createElement('DIV');
  div.innerHTML = 'Post title: ' + post.title;
  document.body.append(div);
}

function commentCallback(comment) {
  const div = document.createElement('DIV');
  div.innerHTML = 'Comment name: ' + comment.name;
  document.body.append(div);
}

function albumCallback(album) {
  const div = document.createElement('DIV');
  div.innerHTML = 'Album title: ' + album.title;
  document.body.append(div);
}

function photoCallback(photo) {
  const div = document.createElement('DIV');
  div.innerHTML = 'Photo thumbnail: <img src="' + photo.thumbnailUrl + '" />';
  document.body.append(div);
}

function todoCallback(todo) {
  const div = document.createElement('DIV');
  div.innerHTML = 'Todo title: ' + todo.title;
  document.body.append(div);
}

function userCallback(user) {
  const div = document.createElement('DIV');
  div.innerHTML = 'User name: ' + user.name;
  document.body.append(div);
}

// THIS WORKS BUT I LIKE BETTER THE SOLUTION BELOW.
// postPromise
//   .then(response => {
//     postCallback(response);
//     return commentPromise;
//   })
//   .then(response => {
//     commentCallback(response);
//     return albumPromise;
//   })
//   .then(response => {
//     albumCallback(response);
//     return photoPromise;
//   })
//   .then(response => {
//     photoCallback(response);
//     return todoPromise;
//   })
//   .then(response => {
//     todoCallback(response);
//     return userPromise;
//   })
//   .then(response => {
//     userCallback(response);
//   })
//   .catch(e => {
//     console.log(e);
//   });

postPromise
  .then(response => {
    postCallback(response);
  })
  .then(() => commentPromise)
  .then(response => {
    commentCallback(response);
  })
  .then(() => albumPromise)
  .then(response => {
    albumCallback(response);
  })
  .then(() => photoPromise)
  .then(response => {
    photoCallback(response);
  })
  .then(() => todoPromise)
  .then(response => {
    todoCallback(response);
  })
  .then(() => userPromise)
  .then(response => {
    userCallback(response);
  })
  .catch(e => {
    console.log(e);
  });
