

$(document).ready(function () {

  function escape(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function createTweetElement(tweet) {
    return `<article class="tweet">
        <header class="tweetHeader">
          <div class="avatar"><img src=${tweet.user.avatars.small}></div>
          <div class="userName">${tweet.user.name}</div>
          <p class="userHandle">${tweet.user.handle}</p>
        </header>
          <p class="tweetText">${escape(tweet.content.text)}</p>
          <footer>
          <h5 class="footer">${tweet.created_at}</h5>
        </footer>
        </article>`;
  }

  function renderTweets(tweets) {
    $("section.tweets").empty()
    for (let tweet of tweets) {
      let tweetHtml = createTweetElement(tweet);
      $("section.tweets").prepend(tweetHtml);
    }
  }

  $("button.button").click((event) => {
    event.preventDefault();
    let form = $(".submitForm");
    let formSerial = form.serialize();
    $.ajax('/tweets', { method: 'POST', data: formSerial }).then(loadTweets)
  });

  $(".composeTweet").click(function () {
    $(".new-tweet").toggle("slow", function () {
      $("#countstroke").select();
    })
  });

  function loadTweets() {
    $.ajax('/tweets', { method: 'GET' })
      .done(function (data) {
        renderTweets(data)
      })
  }

  loadTweets()
});
