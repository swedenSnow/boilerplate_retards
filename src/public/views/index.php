<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Retards</title>
  <link href="https://fonts.googleapis.com/css?family=Abril+Fatface|Cinzel|Raleway" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
  <script src="scripts/main.js" defer></script>
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.12/css/all.css" integrity="sha384-G0fIWCsCzJIMAVNQPfjH08cyYaUtMwjJwqiRKxxE/rx96Uroj1BtIQ6MLJuheaO9" crossorigin="anonymous">


</head>
<body>
    <nav class="nav top">
        <ul>
            
            <li id="nav-notloggedin" class="usrname-container">
                Not logged in
            </li>
            <li id="nav-username" class="usrname-container hidden">
                <button class="loggedin-username" id="loggedin-username"></button>
            </li>
            <li class="search-container">
                <form id="form-search" method="POST" class="">
                    <input id="input-search" type="text" name="search-text" class="search-hidden">
                    <button class="search-btn hidden" id="search-btn"><i class="fas fa-search" style="color: white;"></i></button>
                </form>
            </li>
            <li class="login-container" id="login-container">
                <button class="login-btn" id="login-btn">Login</button>
            </li>
            <li class="logout-container hidden" id="logout-container">
                <button class="logout-btn" id="logout-btn">Logout</button>
            </li>
        </ul>
    </nav>
    <div class="login-modal-container" id="login-modal-container">
        <div class="wrapper-modal">
            <div class="login-modal-content" id="login-modal-content">
                <span class="close-login">&times;</span>
                    <div id="users-login">
                        <div id="login-message" class="hidden">
                    </div>
                    <div>
                        <br>
                        <br>
                        <form id="form-login" method="POST">
                            <strong class="login-head">Log in</strong>
                            <br>
                            <label for="login-username"><strong>Username:</strong></label>
                            <div class="register-username-container">
                                <input id="login-username" type="text" name="username" pattern=".{6,}" required title="Usernames have a minimum length of 6 characters">
                                <i id="login-username-icon" class="fa fa-user"></i>
                            </div>
                            <br>   
                            <label for="login-password"><strong>Password:</strong></label>
                            <div class="register-password-container">   
                                <input id="login-password" type="password" name="password" required>
                            </div>
                            <br>                        
                            <button class="btn-login" id="btn-login" form="form-login" type="button">Login</button>
                            <br>  
                        </form>
                    </div>
                    <div id="users-register">
                        <div id="register-message" class="hidden">
                    </div>
                    <div>
                        <form id="form-register" method="POST">
                            <strong class="login-head">Register</strong>
                            <br>
                            <label for="register-username"><strong>Username:</strong></label>
                            <div class="register-username-container">
                                 <input id="register-username" type="text" name="username" pattern=".{6,}" required title="Username must be at least 6 characters.">
                                <i id="register-username-icon" class="fa fa-user"></i>
                                <br>
                             </div>
                            <br>
                            <label for="register-password"><strong>Password:</strong></label>
                            <div class="register-password-container">        
                                <input id="register-password" type="password" name="password" required>
                            </div>
                            <br>
                            <button class="btn-register" id="btn-register" form="form-register" type="button">Register</button>
                        </form>
                     </div>
                </div>
            </div>
        </div>
    </div>
    </div>

    <div class="login-modal-container-2" id="login-modal-container-2">
        <div class="wrapper-modal-2">
            <div class="login-modal-content-2" id="login-modal-content-2">
                <span class="close-notloggedin">&times;</span>
                <div class="user-menu">
                    <ul>
                        <br>
                        <br>
                        <strong class="login-head">Menu</strong>
                        <br>
                        <br>
                        <br>
                        <li><a href="javascript:void(0)" class="close-links" id="user-myentries">My entries →</a></li>
                        <br>
                        <br>
                        <br>
                        <li><a href="javascript:void(0)" class="close-links" id="user-allentries">All entries →</a></li>
                        <br>
                        <br>
                        <br>
                        <li><a href="javascript:void(0)" class="close-links" id="user-postentry">Post entry →</a></li>
                        <br>
                        <br>
                        <li></li>
                        <br>
                        <br>
                        <br>
                        <li><button class="user-logout" id="user-logout">Log out</button></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
                    
    <header class="hero">
        <h1 id="title" class="title">Boilerplate Retards</h1>
    </header>
    
    <main>

        <div id="entries-message" class="hidden">

        </div>
    
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
            <div id="entry-single-options"></div>
            <div id="entry-likes">
                <i id="entry-like" class="far fa-thumbs-up"></i>
            </div>
        </div>

        <div id="entry-comments">
        </div>

        <div id="entry-add-comment">
            <strong>Add comment</strong>
            <form id="form-addcomment" method="POST">
                <label for="comment-content"><strong>Content:</strong></label>
                <textarea id="comment-content" name="content"></textarea>            
                <button id="btn-addcomment" form="form-addcomment">Post Comment</button>
            </form>
        </div>

    </div>

    <div id="entries-post" class="hidden">
        <div id="post-message" class="hidden">
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
        <div id="edit-message" class="hidden">
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
        <div id="entries-delete-button">
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



</main>

<div id="debug">
</div>

</body>
</html>