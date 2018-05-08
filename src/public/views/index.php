<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Frontend</title>

  <link rel="stylesheet" href="css/style.css">
  <script src="scripts/main.js"></script>

</head>
<body>

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
                <label for="register-username"><strong>Username:</strong></label>
                <input id="register-username" type="text" name="username">
                <label for="register-password"><strong>Username:</strong></label>
                <input id="register-password" type="password" name="password">
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
                <label for="register-username"><strong>Username:</strong></label>
                <input id="register-username" type="text" name="username">
                <label for="register-password"><strong>Username:</strong></label>
                <input id="register-password" type="password" name="password">
                <button id="btn-register" form="form-register">Login</button>
            </form>
        </div>

    </div>

</main>

<div id="debug">
</div>

</body>
</html>