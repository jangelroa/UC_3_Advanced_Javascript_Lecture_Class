function makeXhrRequestWithPromise(url) {
  const myPromise = new Promise((resolve,reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        setTimeout(function() {
          const response = JSON.parse(xhr.responseText);
          resolve(response);
        }, Math.random() * 1000);
      }
      if (this.readyState == 4 && this.status !== 200) {
          const response = JSON.parse(xhr.responseText);
          reject(xhr);
      }
    };
    xhr.open('GET', url, true);
    xhr.send();
  });
  return myPromise;
}

const postPromise = makeXhrRequestWithPromise('https://jsonplaceholder.typicode.com/posts/1');
const commentPromise = makeXhrRequestWithPromise('https://jsonplaceholder.typicode.com/comments/1');
const albumPromise = makeXhrRequestWithPromise('https://jsonplaceholder.typicode.com/albums/1');
const photoPromise = makeXhrRequestWithPromise('https://jsonplaceholder.typicode.com/photos/1');
const todoPromise = makeXhrRequestWithPromise('https://jsonplaceholder.typicode.com/todos/1');
const userPromise = makeXhrRequestWithPromise('https://jsonplaceholder.typicode.com/users/1');

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

const promise1 = postPromise
  .then(response => {
    postCallback(response);
  })
  .then(() => commentPromise)
  .then(response => {
    commentCallback(response);
  })
  .catch(e => {
    console.log('error', e);
  });

const promise2 = albumPromise
  .then(response => {
    albumCallback(response);
  })
  .then(() => photoPromise)
  .then(response => {
    photoCallback(response);
  })
  .catch(e => {
    console.log('error', e);
  });

const promise3 = userPromise
  .then(response => {
    userCallback(response);
  })
  .then(() => todoPromise)
  .then(response => {
    todoCallback(response);
  })
  .catch(e => {
    console.log('error', e);
  });

var everything = Promise.all([
  promise1,
  promise2,
  promise3
]).then(() => {
  const div = document.createElement('DIV');
  div.innerHTML = 'Everything is shown!';
  document.body.append(div);
})
.catch(e => {
  console.log('error', e);
});
