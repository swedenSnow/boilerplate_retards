//debugger;

class DOMFactory
{
    constructor()
    {
        this.editCommand = null;
        this.cmdPostComment = null;
        this.cmdLike = null;
        this.entryLiked = undefined;
    }

    CreateElementAndAppendTo(aType, aElementToAppendTo)
    {
        let element = document.createElement(aType);
        aElementToAppendTo.appendChild(element);

        return element;
    }

    CreateTextAndAppendTo(aText, aElementToAppendTo)
    {
        let textNode = document.createTextNode(aText);
        aElementToAppendTo.appendChild(textNode);
    }

    CreateLinkWithText(aLinkText, aLinkHref, aElementToAppendTo)
    {
        
        let link = document.createElement("a");
        let linkText = document.createTextNode(aLinkText);
        link.appendChild(linkText);

        link.setAttribute("href", aLinkHref);
        
        aElementToAppendTo.appendChild(link);

        return link;
    }
}


class CMS
{
    constructor()
    {
        this.DOMFactory = new DOMFactory();

        //Content Divs
        this.divEntriesAll      = document.getElementById("entries-all");
        this.divEntriesSingle   = document.getElementById("entries-single");
        this.divEntriesAdd      = document.getElementById("entries-post");
        this.divEntriesEdit     = document.getElementById("entries-edit");
        this.divEntriesDelete   = document.getElementById("entries-delete");

        this.divSearchResults   = document.getElementById("entries-search-results");

        this.divUsersAll        = document.getElementById("users-all");

        this.divRegister        = document.getElementById("users-register");
        this.divLogin           = document.getElementById("users-login");

        this.iconLikes          = document.getElementById("entry-like");

        //EventListeners
        //Forms
        const formLogin = document.getElementById("form-login");
        formLogin.addEventListener("submit", (e) =>
        {
            e.preventDefault();
            const formData = new FormData(formLogin);
            this.Login(formData);
        });
        
        const formRegister = document.getElementById("form-register");
        formRegister.addEventListener("submit", (e) =>
        {
            e.preventDefault();
            const formData = new FormData(formRegister);
            this.Register(formData);
        });

        /*
        const formPost = document.getElementById("form-post");
        formPost.addEventListener("submit", (e) =>
        {
            e.preventDefault();
            const formData = new FormData(formPost);
            this.PostEntry(formData);
        });*/

        this.formSearch = document.getElementById("form-search");
        this.formSearch.addEventListener("submit", (e) =>
        {
            e.preventDefault();
            const formData = new FormData(this.formSearch);
            this.Search(formData);
        });

        let btnLogout = document.getElementById("logout-btn");

        btnLogout.addEventListener("click", () => this.LogOut());


        //Input
        this.inputRegisterUsername     = document.getElementById("register-username");
        this.inputRegisterUsername.addEventListener("blur", () => this.CheckUsernameAvailability());

        
        this.inputSearchText        = document.getElementById("input-search");

        this.inputPostTitle         = document.getElementById("post-title");
        this.inputPostContent       = document.getElementById("post-content");

        this.inputEditTitle         = document.getElementById("edit-title");
        this.inputEditContent       = document.getElementById("edit-content");

        this.inputCommentContent    = document.getElementById("comment-content");

        //Buttons

        this.iconSearch             = document.getElementById("search-btn");

        //Debug things...
        this.Debug();

        this.userID = 2;
        this.userName = "indiehjaerta";
    }

    Debug()
    {
        this.divDebug = document.getElementById("debug");

        let btnShowRegister = this.DOMFactory.CreateElementAndAppendTo("button", this.divDebug);
        this.DOMFactory.CreateTextAndAppendTo("Register Div", btnShowRegister);
        btnShowRegister.addEventListener("click", () => this.divRegister.classList.toggle("hidden"));

        let btnShowLogin = this.DOMFactory.CreateElementAndAppendTo("button", this.divDebug);
        this.DOMFactory.CreateTextAndAppendTo("Login Div", btnShowLogin);
        btnShowLogin.addEventListener("click", () => this.divLogin.classList.toggle("hidden"));

        let btnShowAllUsers = this.DOMFactory.CreateElementAndAppendTo("button", this.divDebug);
        this.DOMFactory.CreateTextAndAppendTo("All Users Div", btnShowAllUsers);
        btnShowAllUsers.addEventListener("click", () => this.ShowAllUsers());
        
        let btnShowAllEntries = this.DOMFactory.CreateElementAndAppendTo("button", this.divDebug);
        this.DOMFactory.CreateTextAndAppendTo("All Entries Div", btnShowAllEntries);
        btnShowAllEntries.addEventListener("click", () => this.ShowAllEntries());
        
        let btnShowPostEntry = this.DOMFactory.CreateElementAndAppendTo("button", this.divDebug);
        this.DOMFactory.CreateTextAndAppendTo("Post Entry", btnShowPostEntry);
        btnShowPostEntry.addEventListener("click", () => this.DivToggle("ShowAddEntry"));  
    }

    async Login(aFormData)
    {
        const url = '/login';

        const postOptions = 
        {
            method: 'POST',
            body: aFormData,
            credentials: 'include'
        }

        const data = await this.PostData(url, postOptions);

        //Debug Purpose
        //console.log(data);

        this.HandleLoginResult(data);
    }

    HandleLoginResult(aData)
    {
        if (aData.error != undefined)
        {    
            console.log("ERROR: " + aData.error);
        }
        else
        {         
            this.userID = aData.data[0];
            this.userName = aData.data[1];

            let navUsername = document.getElementById("nav-username");
            navUsername.innerText = this.userName;

            this.iconSearch.classList.remove("hidden");
            this.inputSearchText.classList.remove("search-hidden");
            this.inputSearchText.classList.add("search-show");

            let loginContainer = document.getElementById("login-container");
            loginContainer.classList.add("hidden");
            
            let logoutContainer = document.getElementById("logout-container");
            logoutContainer.classList.remove("hidden");

            let title = document.getElementById("title");
            title.innerText = "Welcome " + this.userName;

            let message = document.getElementById("message");
            message.innerText = "You are now logged in";
            
            // message.innerText = "Welcome " + this.userName + ". You are now logged in.";
        }
    }

    async LogOut()
    {
        const url = '/logout';

        const data = await this.FetchData(url);

        let navUsername = document.getElementById("nav-username");
        navUsername.innerText = "Not logged in";

        this.iconSearch.classList.add("hidden");
        this.inputSearchText.classList.add("search-hidden");
        this.inputSearchText.classList.remove("search-show");

        let loginContainer = document.getElementById("login-container");
        loginContainer.classList.remove("hidden");
        
        let logoutContainer = document.getElementById("logout-container");
        logoutContainer.classList.add("hidden");
        
        let message = document.getElementById("message");
        message.innerText = "You are now logged out.";

        let title = document.getElementById("title");
        title.innerText = "Boilerplate Retards";
    }

    async Register(aFormData)
    {
        const url = '/register';

        const postOptions = 
        {
            method: 'POST',
            body: aFormData
        }

        const data = await this.PostData(url, postOptions);

        //this.HandleRegisterResult();
    }

    async Search(aFormData)
    {
        let searchText = this.inputSearchText.value;
        if (searchText != "")
        {
            const url = 'api/search';
        
            const postOptions = 
            {
                method: 'POST',
                body: aFormData
            }
    
            const data = await this.PostData(url, postOptions);
    
            this.PresentSearchResults(searchText, data);
    
            //Debug Purpose
            console.log(data);
    
            this.DivToggle("ShowSearchResults");
        }
    }

    async ShowAllEntries()
    {
        //Loading Div.

        this.GetAllEntries();

        this.DivToggle("ShowAllEntries");
    }

    async GetAllEntries()
    {
        const url = '/api/entries';

        const data = await this.FetchData(url);

        this.PresentEntriesAsHTML(data);
    }

    async ShowSingleEntry(aID)
    {
        //Loading Div.

        let data = await this.GetEntry(aID);
        let commentData = await this.GetCommentsForID(aID);
        let likesData = await this.GetLikesData(aID);

        this.PresentEntryAsHTML(data);
        this.PresentCommentsAsHTML(aID, commentData);
        this.UpdateLikes(aID, likesData);
        
        this.DivToggle("ShowSingleEntry");
    }

    async ShowEditEntry(aID)
    {
        //Loading Div.

        console.log("ID: " + aID);
        let data = await this.GetEntry(aID);
        console.log(data);

        await this.UpdateEntryEdit(data);

        this.DivToggle("ShowEditEntry");
    }

    async GetEntry(aID)
    {
        const url = '/api/entries/' + aID;

        const data = await this.FetchData(url);

        return data;
    }

    async GetCommentsForID(aID)
    {        
        const url = '/api/entries/comments/' + aID;

        const data = await this.FetchData(url);

        return data;
    }

    async GetLikesData(aID)
    {
        const url = 'api/likes/' + aID;

        const data = await this.FetchData(url);

        console.log(data);

        return data;
    }

    async PostEntry(aFormData)
    {
        const url = 'api/entries';
        
        const postOptions = 
        {
            method: 'POST',
            body: aFormData,
            credentials: 'include'
        }

        const data = await this.PostData(url, postOptions);
        console.log(data);

        this.inputPostTitle.value   = "";
        this.inputPostContent.value = "";
    }

    async UpdateEntry(aID, aFormData)
    {
        const url = '/api/entries/' + aID;

        
        const postOptions = 
        {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: 'title=' + aFormData.get("title") + '&content=' + aFormData.get("content")
         }

        const data = await this.PostData(url, postOptions);

         console.log(data);
    }

    async DeleteEntry(aID)
    {
        const url = '/api/entries/' + aID;

        const postOptions = 
        {
            method: 'DELETE',
            credentials: 'include'
        }

        const data = await this.PostData(url, postOptions);
    }

    async ShowAllUsers()
    {
        await this.GetAllUsers();

        this.DivToggle("ShowAllUsers");
    }

    async GetAllUsers()
    {
        const url = 'api/users';

        const data = await this.FetchData(url);

        this.PresentUsersAsHTML(data);
    }

    async PostComment(aID, aFormData)
    {
        aFormData.append("id", aID);

        const url = '/api/comments';

        const postOptions = 
        {
            method: 'POST',
            body: aFormData,
            credentials: 'include'
        }

        const data = await this.PostData(url, postOptions);

        //Refreshing this instead of using returndata because it was faster to code.
        this.ShowSingleEntry(aID);

        this.inputCommentContent.value = "";
    }

    async ShowPostsByUsername(aUserName)
    {
        let data = await this.GetEntriesByUsername(aUserName);

        this.PresentEntriesAsHTML(data);

        this.DivToggle("ShowAllEntries");
    }

    async GetEntriesByUsername(aUserName)
    {
        const url = '/api/' + aUserName + '/entries';

        const data = await this.FetchData(url);

        return data;
    }

    async PostData(aURL, aPostoptions)
    {
        const response = await fetch(aURL, aPostoptions);
        
        const data = await response.json();

        return data;
    }

    async PostDataDebug(aURL, aPostoptions)
    {
        const response = await fetch(aURL, aPostoptions);
        const data = await response.text();
        console.log(data);
        return data;
    }

    async FetchData(aURL)
    {
        const postOptions = 
        {
            method: 'GET',
            credentials: 'include'
        }

        const response = await fetch(aURL, postOptions);
        const data = await response.json();

        return data;
    }

    PresentUsersAsHTML(aData)
    {
        let divUsersContainer = document.getElementById("users-all-container");

        this.ClearElement(divUsersContainer);

        for (let user of aData.data)
        {
            let divUser = this.DOMFactory.CreateElementAndAppendTo("div", divUsersContainer);

            let divUserName = this.DOMFactory.CreateElementAndAppendTo("div", divUser);
            divUserName.innerText = user.username;

            let divUserCreated = this.DOMFactory.CreateElementAndAppendTo("div", divUser);
            divUserCreated.innerText = "Created at: " + user.createdAt;

            let divUserPostLink = this.DOMFactory.CreateElementAndAppendTo("div", divUser);
            let linkUser = this.DOMFactory.CreateLinkWithText("Show posts", "javascript:void(0)", divUserPostLink);
            linkUser.addEventListener("click", () => this.ShowPostsByUsername(user.username));
        }
    }

    PresentEntriesAsHTML(aData)
    {
        let divAllEntriesContainer = document.getElementById("entries-all-container");

        this.ClearElement(divAllEntriesContainer);

        for (let entry of aData.data)
        {
            let divEntry = this.DOMFactory.CreateElementAndAppendTo("div", divAllEntriesContainer);

            let divEntryTitle = this.DOMFactory.CreateElementAndAppendTo("div", divEntry);
            let linkTitle = this.DOMFactory.CreateLinkWithText(entry.title, "javascript:void(0)", divEntryTitle);
            linkTitle.addEventListener("click", () => this.ShowSingleEntry(entry.entryID));
        }

        console.log("Showing " + aData.data.length + " posts.");
    }

    PresentEntryAsHTML(aData)
    {
        let divTitle        = document.getElementById("entry-single-title");
        let divContent      = document.getElementById("entry-single-content");
        let divCreatedBy    = document.getElementById("entry-single-created-by");
        let divCreatedAt    = document.getElementById("entry-single-created-at");
        let divOptions      = document.getElementById("entry-single-options");

        divTitle.innerText = aData.data.title;
        divContent.innerText = aData.data.content;
        divCreatedBy.innerText = aData.data.username;
        divCreatedAt.innerText = aData.data.createdAt;

        this.ClearElement(divOptions);

        if (aData.data.createdBy == this.userID)
        {
            let linkEdit = this.DOMFactory.CreateLinkWithText("EDIT", "javascript:void(0)", divOptions);
            linkEdit.addEventListener("click", () => this.ShowEditEntry(aData.data.entryID));

            let linkDelete = this.DOMFactory.CreateLinkWithText("DELETE", "javascript:void(0)", divOptions);
            linkDelete.addEventListener("click", () => this.ShowDeleteEntry(aData.data.entryID));
        }
    }

    PresentCommentsAsHTML(aID, aData)
    {
        let divComments = document.getElementById("entry-comments");

        this.ClearElement(divComments);

        if (aData.data != null)
        {
            for (let comment of aData.data)
            {    
                let divComment = this.DOMFactory.CreateElementAndAppendTo("div", divComments);
    
                let divUserName = this.DOMFactory.CreateElementAndAppendTo("div", divComment);

                let divUserLink = this.DOMFactory.CreateElementAndAppendTo("div", divUserName);
                let linkUser = this.DOMFactory.CreateLinkWithText(comment.username, "javascript:void(0)", divUserLink);
                linkUser.addEventListener("click", () => this.ShowPostsByUsername(comment.username));
    
                let divUserCreated = this.DOMFactory.CreateElementAndAppendTo("div", divComment);
                divUserCreated.innerText = "Created at: " + comment.createdAt;
    
                let divCommentContent = this.DOMFactory.CreateElementAndAppendTo("div", divComment);
                divCommentContent.innerText = comment.content;
            }
        }
        else
        {
            let divComment = this.DOMFactory.CreateElementAndAppendTo("div", divComments);
            divComment.innerText = "No comments. Why dont you post one?"
        }

        const formAddComment = document.getElementById("form-addcomment");

        if (this.cmdPostComment != null)
        {
            formAddComment.removeEventListener("submit", this.cmdPostComment);
        }
        
        this.cmdPostComment = (e) =>
        {
            e.preventDefault();
            const formData = new FormData(formAddComment);
            this.PostComment(aID, formData);
        };

        formAddComment.addEventListener("submit", this.cmdPostComment);
    }

    PresentSearchResults(aSearchText, aData)
    {
        let divSearchResults = document.getElementById("entries-search-results-container");
        let divSearchResultsText = document.getElementById("entries-search-results-text");

        this.ClearElement(divSearchResults);

        divSearchResultsText.innerText = "Search word: " + aSearchText + " returned " + aData.data.length + " results.";

        for (let result of aData.data)
        {
            let divResult = this.DOMFactory.CreateElementAndAppendTo("div", divSearchResults);

            let divEntryTitle = this.DOMFactory.CreateElementAndAppendTo("div", divResult);
            let linkTitle = this.DOMFactory.CreateLinkWithText(result.title, "javascript:void(0)", divEntryTitle);
            linkTitle.addEventListener("click", () => this.ShowSingleEntry(result.entryID));
        }
    }

    UpdateEntryEdit(aData)
    {

        let inputEditTitle      = document.getElementById("edit-title");
        let inputEditContent    = document.getElementById("edit-content");
        let butttonEdit         = document.getElementById("btn-edit");

        inputEditTitle.value = aData.data.title;
        inputEditContent.value = aData.data.content;

        const formEdit = document.getElementById("form-edit");

        if (this.cmdEdit != null)
        {
            formEdit.removeEventListener("submit", this.cmdEdit);
        }
        
        this.cmdEdit = (e) =>
        {
            e.preventDefault();
            const formData = new FormData(formEdit);
            this.UpdateEntry(aData.data.entryID, formData);
        };

        formEdit.addEventListener("submit", this.cmdEdit);
    }

    
    UpdateLikes(aID, aLikesData)
    {
        console.log(this.userID);
        if (aLikesData.data != null)
        {
            let like = aLikesData.data.find(o => Number(o.userID) === this.userID);
            console.log(this.userID);

            if (like != undefined)
            {
                this.iconLikes.classList.toggle("fas", true);
                this.iconLikes.classList.toggle("far", false);

                this.entryLiked = true;

                if (this.cmdLike != null)
                {
                    this.iconLikes.removeEventListener("click", this.cmdLike);
                }
                
                this.cmdLike = () => this.UpdateLikeState(aID, false);

                this.iconLikes.addEventListener("click", this.cmdLike);

                console.log("LOL");
                
            }
            else
            {
                this.iconLikes.classList.toggle("fas", false);
                this.iconLikes.classList.toggle("far", true);

                this.entryLiked = false;

                if (this.cmdLike != null)
                {
                    this.iconLikes.removeEventListener("click", this.cmdLike);
                }
                
                this.cmdLike = () => this.UpdateLikeState(aID, true);

                this.iconLikes.addEventListener("click", this.cmdLike);
            }

            console.log("Likes: " + aLikesData.data.length);
        }
    }

    DivToggle(aString)
    {
        this.divEntriesAll.classList.toggle("hidden", aString != "ShowAllEntries");
        this.divEntriesSingle.classList.toggle("hidden", aString != "ShowSingleEntry");
        this.divEntriesAdd.classList.toggle("hidden", aString != "ShowAddEntry");
        this.divEntriesEdit.classList.toggle("hidden", aString != "ShowEditEntry");
        this.divEntriesDelete.classList.toggle("hidden", aString != "ShowDeleteEntry");

        this.divUsersAll.classList.toggle("hidden", aString != "ShowAllUsers");

        this.divRegister.classList.toggle("hidden", aString != "ShowRegister");
        this.divLogin.classList.toggle("hidden", aString != "ShowLogin");

        this.divSearchResults.classList.toggle("hidden", aString != "ShowSearchResults");
    }

    ClearElement(aElement)
    {
        while (aElement.firstChild) 
        {
            aElement.removeChild(aElement.firstChild);
        }
    }

    async CheckUsernameAvailability()
    {
        console.log(this.inputRegisterUsername.value);

        let username = this.inputRegisterUsername.value;
        
        if (username.length > 0)
        {
            let icon = document.getElementById("register-username-icon");
            icon.classList.remove("fa-user");
            icon.classList.toggle("fa-spinner");
          
            const data = await this.GetUserNameAvailability(username);

            console.log(data);

            if (data.data == true)
            {
                icon.classList.toggle("fa-times");
                icon.classList.remove("fa-check");
                icon.classList.remove("fa-spinner");
                this.inputRegisterUsername.style.borderColor = "red";
                this.inputRegisterUsername.style.backgroundColor = "rgba(250, 103, 103, 0.74)";
            }
            else
            {
                icon.classList.toggle("fa-check");
                icon.classList.remove("fa-times");
                icon.classList.remove("fa-spinner");
                this.inputRegisterUsername.style.borderColor = "green";
                this.inputRegisterUsername.style.backgroundColor = "rgba(127, 230, 127, 0.8)";
            }
        }
    }

    async GetUserNameAvailability(aUserName)
    {
        console.log("Checking username: " + aUserName);

        const url = 'register/' + aUserName;

        const data = await this.FetchData(url);

        return data;
    }

    async UpdateLikeState(aID, aLikeState)
    {
        const url = 'api/likes/' + aID + "?like=" + aLikeState;

        const data = await this.FetchData(url);

        console.log(data);
    }
}

// Get the modal
const modal = document.getElementById('login-modal-container');
// button that opens the modal
const btn = document.getElementById("login-btn");
// <span> element that closes the modal
const span = document.getElementsByClassName("close-login")[0];

//Close after submit
const loginButton = document.getElementById("btn-login");
const registerButton = document.getElementById("btn-register");

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "flex";
}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}
//close after submit
loginButton.onclick = function() {
    modal.style.display = "none";

}

registerButton.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
let cms = new CMS();