
//tweet button lockup on conditions
$(document).ready(function () {
  $('button.button').prop('disabled', true);
  $('#countstroke').keyup(function () {
    if ($(this).val().length === 0 || $(this).val().length > 140) {
      $('button.button').prop('disabled', true);
    } else {
      $('button.button').prop('disabled', false);
    }
  });

  //app security feature
  function escape(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  //tweet generation
  function createTweetElement(tweet) {
    return `<article class="tweet">
        <header class="tweetHeader">
          <div class="avatar"><img src=${tweet.user.avatars.small}></div>
          <div class="userName">${tweet.user.name}</div>
          <p class="userHandle">${tweet.user.handle}</p>
        </header>
          <p class="tweetText">${escape(tweet.content.text)}</p>
          <footer>
          <h5 class="footer">${jQuery.timeago(tweet.created_at)}</h5>
        </footer>
        </article>`;
  }

  //renders tweets to page
  function renderTweets(tweets) {
    $("section.tweets").empty()
    for (let tweet of tweets) {
      let tweetHtml = createTweetElement(tweet);
      $("section.tweets").prepend(tweetHtml);
    }
  }

  //submit tweet functionality
  $("button.button").click((event) => {
    event.preventDefault();
    let form = $(".submitForm");
    let formSerial = form.serialize();
    $.ajax('/tweets', { method: 'POST', data: formSerial }).then(loadTweets)
  });

  //nav bar compose tweet toggle button
  $(".composeTweet").click(function () {
    $(".new-tweet").toggle("slow", function () {
      $("#countstroke").focus();
    })
  });

  //login button toggle
  $(".showLogin").click(function () {
    $(".login").toggle("slow", function () {
      $(".emailTextArea").focus();
    })
  });

  //ajax get request to database
  function loadTweets() {
    $.ajax('/tweets', { method: 'GET' })
      .done(function (data) {
        renderTweets(data)
      })
  }

  loadTweets()
});
