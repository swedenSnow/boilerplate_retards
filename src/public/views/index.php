<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Frontend</title>

  <link rel="stylesheet" href="css/style.css">
  <script src="scripts/main.js" defer></script>
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.12/css/all.css" integrity="sha384-G0fIWCsCzJIMAVNQPfjH08cyYaUtMwjJwqiRKxxE/rx96Uroj1BtIQ6MLJuheaO9" crossorigin="anonymous">

</head>
<body>

<header>
    Boilerplate retards API
</header>

<nav>

    <form id="form-search" method="POST">
        <input id="input-search" type="text" name="search-text">
        <button id="btn-search" type="submit" form="form-search">Search</button>
    </form>
</nav>
<main>

    <div id="entries-all" class="hidden">
        <div>
            <strong>All entries</strong>
        </div>
        <div id="entries-all-container">
        </div>
    </div>

    <div id="entries-single" class="hidden">
        <div>
            <strong>Single Entry</strong>
        </div>
    
        <div id="entries-single-container">
            <div id="entry-single-title"></div>
            <div id="entry-single-content"></div>
            <div id="entry-single-created-by"></div>
            <div id="entry-single-created-at"></div>
            <div id="entry-likes">
                <i class="far fa-thumbs-up"></i>
            </div>
        </div>

        <div id="entry-comments">
            <div id="entry-comment-username"></div>
            <div id="entry-comment-content"></div>
            <div id="entry-comment-created-at"></div>
        </div>

    </div>

    <div id="entries-post" class="hidden">
        <div id="register-message" class="hidden">
        </div>
        <div>
            <strong>Post Entry</strong>
            <form id="form-post" method="POST">
                <label for="post-title"><strong>Title:</strong></label>
                <input id="post-title" type="text" name="title">
                <label for="post-content"><strong>Content:</strong></label>
                <textarea id="post-content" name="content"></textarea>            
                <button id="btn-post" form="form-post">Post Entry</button>
            </form>
        </div>
    </div>

    <div id="entries-edit" class="hidden">
        <div id="register-message" class="hidden">
        </div>
        <div>
            <strong>Edit Entry</strong>
            <form id="form-edit" method="POST">
                <label for="edit-title"><strong>Title:</strong></label>
                <input id="edit-title" type="text" name="title">
                <label for="edit-content"><strong>Content:</strong></label>
                <textarea id="edit-content" name="content"></textarea>     
                <button id="btn-edit" form="form-edit">Edit</button>
            </form>
        </div>
    </div>

    <div id="entries-delete" class="hidden">
        <div>
            <strong>Delete Entry</strong>
        </div>
        <div id="entries-delete-confirmation">
        </div>
    </div>

    <div id="entries-search-results" class="hidden">
        <div>
            <strong>Search Results</strong>
        </div>
        <div id="entries-search-results-text">
        </div>
        <div id="entries-search-results-container">
        </div>
    </div>

    <div id="users-all" class="hidden">
        <div>
            <strong>All Users</strong>
        </div>
        <div id="users-all-container">
        </div>
    </div>

    <div id="users-register" class="hidden">

        <div id="register-message" class="hidden">
        </div>
        <div>
            <strong>Register</strong>
            <form id="form-register" method="POST">
                <div class="register-username-container">
                    <label for="register-username"><strong>Username:</strong></label>
                    <input id="register-username" type="text" name="username" pattern=".{6,}" required title="Username must be at least 6 characters.">
                    <i id="register-username-icon" class="fa fa-user"></i>
                </div>
                <div class="register-password-container">        
                    <label for="register-password"><strong>Password:</strong></label>
                    <input id="register-password" type="password" name="password" required>
                </div>
                <button id="btn-register" form="form-register">Register</button>
            </form>
        </div>
    </div>

    <div id="users-login" class="hidden">

        <div id="login-message" class="hidden">
        </div>

        <div>
            <strong>Login</strong>
            <form id="form-login" method="POST">
                <label for="login-username"><strong>Username:</strong></label>
                <input id="login-username" type="text" name="username" pattern=".{6,}" required title="Usernames have a minimum length of 6 characters">
                <label for="login-password"><strong>Password:</strong></label>
                <input id="login-password" type="password" name="password" required>
                <button id="btn-login" form="form-login">Login</button>
            </form>
        </div>

    </div>

</main>

<div id="debug">
</div>

</body>
</html>