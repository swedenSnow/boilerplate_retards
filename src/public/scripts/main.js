//debugger;

class DOMFactory
{
    constructor()
    {
        this.editCommand = null;
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

        const formPost = document.getElementById("form-post");
        formPost.addEventListener("submit", (e) =>
        {
            e.preventDefault();
            const formData = new FormData(formPost);
            this.PostEntry(formData);
        });

        const formSearch = document.getElementById("form-search");
        formSearch.addEventListener("submit", (e) =>
        {
            e.preventDefault();
            const formData = new FormData(formSearch);
            this.Search(formData);
        });


        //Input
        this.inputRegisterUsername     = document.getElementById("register-username");
        this.inputRegisterUsername.addEventListener("blur", () => this.CheckUsernameAvailability());

        
        this.inputSearchText        = document.getElementById("input-search");

        this.inputPostTitle         = document.getElementById("post-title");
        this.inputPostContent       = document.getElementById("post-content");

        this.inputEditTitle         = document.getElementById("edit-title");
        this.inputEditContent       = document.getElementById("edit-content");

        //Buttons

        //Debug things...
        this.Debug();

        this.userID = 2;
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
        console.log(aData);   
        if (aData.error != undefined)
        {    
            console.log("ERROR: " + aData.error);
        }
        else
        {         
            console.log(aData.data);   
            this.userID = aData.data[0];
            this.userName = aData.data[1];

            console.log("Welcome " + this.userName + ". You are now logged in." );
        }
    }

    LogOut()
    {
        const url = '/logout';
    }

    async Register(aFormData)
    {
        const url = '/register';

        const postOptions = 
        {
            method: 'POST',
            body: aFormData
        }

        //console.log(aFormData);
        const data = await this.PostData(url, postOptions);

        //Debug Purpose
        console.log(data);

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
        await this.GetCommentsForID(aID);

        this.PresentEntryAsHTML(data);
        
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
        return;
        
        const url = '/api/entries/comments/' + aID;

        const data = await this.FetchData(url);

        this.PresentCommentsForSingleEntry(data);
    }

    async PostEntry(aFormData)
    {
        console.log(this.inputPostTitle.value);
        console.log(this.inputPostContent.value);

        const url = 'api/entries';
        
        const postOptions = 
        {
            method: 'POST',
            body: aFormData,
            credentials: 'include'
        }

        const data = await this.PostData(url, postOptions);

        //Debug Purpose
        console.log(data);

        this.inputPostTitle.value   = "";
        this.inputPostContent.value = "";
    }

    async UpdateEntry(aID)
    {
        const url = '/api/entries/' + aID;

        const postOptions = 
        {
            method: 'PATCH',
            credentials: 'include'
        }

        /*
        const postOptions = 
        {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: 'content=Fresh Content&title=My New Shiny Title'
         }
         */

        const data = await this.PostData(url, postOptions);

        //Debug Purpose
        //console.log(data);
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

        //Debug Purpose
        //console.log(data);
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

    async PostComment(aFormData)
    {
        const url = '/api/comments';

        const postOptions = 
        {
            method: 'POST',
            body: formData,
            credentials: 'include'
        }

        const data = await this.PostData(url, postOptions);

        //Debug Purpose
        //console.log(data);
    }

    async ShowPostsByUsername(aUserName)
    {
        console.log(aUserName);
        let data = await this.GetEntriesByUsername(aUserName);

        console.log(data);
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
        //const data = await response.json();
        const data = await response.json();

        //Debug Purpose
        //console.log(data);

        return data;
    }

    async FetchData(aURL)
    {
        const postOptions = 
        {
            method: 'GET'
        }

        const response = await fetch(aURL, postOptions);
        const data = await response.json();

        //Debug Purpose
        //console.log(data);

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

        console.log(aData.data.entryID);
        if (aData.data.createdBy == this.userID)
        {
            let edit = this.DOMFactory.CreateLinkWithText("EDIT", "javascript:void(0)", divOptions);
            edit.addEventListener("click", () => this.ShowEditEntry(aData.data.entryID));
        }

        console.log(aData);
    }

    PresentCommentsForSingleEntry(aData)
    {
        console.log("Write PresentCommentsForSingleEntry()");
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

        //Write this when GetEntry works
        console.log(aData);

        inputEditTitle.value = aData.data.title;
        inputEditContent.value = aData.data.content;


        if (this.editCommand != null)
        {
            butttonEdit.removeEventListener("submit", this.editCommand);
        }
        
        const formEdit = document.getElementById("form-edit");
        this.editCommand = (e) =>
        {
            e.preventDefault();
            const formData = new FormData(formEdit);
            this.UpdateEntry(aData.data.entryID);
        };

        formEdit.addEventListener("submit", this.editCommand);
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
                this.inputRegisterUsername.style.backgroundColor = "rgba(255, 0, 0, 0.1)";
            }
            else
            {
                icon.classList.toggle("fa-check");
                icon.classList.remove("fa-times");
                icon.classList.remove("fa-spinner");
                this.inputRegisterUsername.style.borderColor = "green";
                this.inputRegisterUsername.style.backgroundColor = "rgba(0, 255, 0, 0.1)";
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
}

let cms = new CMS();