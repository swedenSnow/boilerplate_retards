async function main() {
  const response = await fetch('/todos/1');
  const { data } = await response.json();
  console.log(data);
}

main();

class DOMFactory
{
    constructor()
    {
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
        aElementToAppendTo.appendChild(element);

        return textNode;
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

        const formLogin = document.getElementById('form-login');
        formLogin.addEventListener('submit', (e) =>
        {
            e.preventDefault();
            const formData = new FormData(formLogin);
            this.Login(formData);
        });
        
        const formRegister = document.getElementById('form-login');
        formLogin.addEventListener('submit', (e) =>
        {
            e.preventDefault();
            const formData = new FormData(formRegister);
            this.Register(formData);
        });

        //Content Divs
        this.divEntriesAll      = document.getElementById("entries-all");
        this.divEntriesSingle   = document.getElementById("entries-single");
        this.divEntriesAdd      = document.getElementById("entries-add");
        this.divEntriesEdit     = document.getElementById("entries-edit");
        this.divEntriesDelete   = document.getElementById("entries-delete");

        this.divUsersAll        = document.getElementById("users-all");

        this.divRegister        = document.getElementById("users-register");
        this.divLogin           = document.getElementById("users-login");

        this.Debug();
    }

    Debug()
    {
        this.divDebug = document.getElementById("debug");

        btnShowRegister = this.DOMFactory.CreateElementAndAppendTo("button", this.divDebug);
        this.DOMFactory.CreateTextAndAppendTo("Register Div", btnShowRegister);
        btnShowRegister.addEventListener("click", () => this.divRegister.classList.toggle("hidden"));

        btnShowLogin = this.DOMFactory.CreateElementAndAppendTo("button", this.divDebug);
        this.DOMFactory.CreateTextAndAppendTo("Register Div", btnShowLogin);
        btnShowLogin.addEventListener("click", () => this.divLogin.classList.toggle("hidden"));

        btnShowAllUsers = this.DOMFactory.CreateElementAndAppendTo("button", this.divDebug);
        this.DOMFactory.CreateTextAndAppendTo("All Users Div", btnShowAllUsers);
        btnShowAllUsers.addEventListener("click", () => this.divUsersAll.classList.toggle("hidden"));
        
        btnShowAllEntries = this.DOMFactory.CreateElementAndAppendTo("button", this.divDebug);
        this.DOMFactory.CreateTextAndAppendTo("All Entries Div", btnShowAllEntries);
        btnShowAllEntries.addEventListener("click", () => this.divEntriesAll.classList.toggle("hidden"));
    }

    Login(aFormData)
    {
        const url = '/login';

        const postOptions = 
        {
            method: 'POST',
            body: aFormData,
            credentials: 'include'
        }

        const data = this.PostData(url, postOptions);

        //Debug Purpose
        //console.log(data);
    }

    LogOut()
    {
        const url = '/logout';
    }

    Register(aFormData)
    {
        const url = '/register';

        const postOptions = 
        {
            method: 'POST',
            body: aFormData,
            credentials: 'include'
        }

        const data = this.PostData(url, postOptions);

        //Debug Purpose
        //console.log(data);
    }

    //Should return 20 entries 
    GetAllEntries()
    {
        const url = '/api/entries';

        const data = await this.FetchData(url);

        this.PresentEntriesAsHTML(data);
    }

    GetEntry(aID)
    {
        const url = '/api/entries/' + aID;

        const data = await this.FetchData(url);

        this.PresentEntryAsHTML(data);
    }

    PostEntry(aFormData)
    {
        const url = 'api/todos';
        
        const postOptions = 
        {
            method: 'POST',
            body: formData,
            credentials: 'include'
        }

        const data = this.PostData(url, postOptions);

        //Debug Purpose
        //console.log(data);
    }

    UpdateEntry(aID)
    {
        const url = '/api/entries/' + aID;

        const postOptions = 
        {
            method: 'PATCH',
            credentials: 'include'
        }

        const data = this.PostData(url, postOptions);

        //Debug Purpose
        //console.log(data);
    }

    DeleteEntry(aID)
    {
        const url = '/api/entries/' + aID;

        const postOptions = 
        {
            method: 'DELETE',
            credentials: 'include'
        }

        const data = this.PostData(url, postOptions);

        //Debug Purpose
        //console.log(data);
    }

    async GetAllUsers()
    {
        const url = 'api/users';

        const data = await this.FetchData(url);

        this.PresentUsersAsHTML(data);
    }

    PostComment(aFormData)
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

    async PostData(aURL, aPostoptions)
    {
        const response = await fetch(aURL, aPostoptions);
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

        for (let user of aData)
        {
            console.log(user);
        }

        //Debug Purpose
        //console.log(aData);
    }

    PresentEntriesAsHTML(aData)
    {
        let divAllEntriesContainer = document.getElementById("entries-all-container");

        this.ClearElement(divAllEntriesContainer);

        for (let entry of aData)
        {
            console.log(entry);
        }

        //Debug Purpose
        //console.log(aData);
    }

    PresentEntryAsHTML(aData)
    {
        let divTitle        = document.getElementById("entry-single-title");
        let divContent      = document.getElementById("entry-single-content");
        let divCreatedBy    = document.getElementById("entry-single-created-by");
        let divCreatedAt    = document.getElementById("entry-single-created-at");

        console.log(aData);
    }

    UpdateEntryEdit(aID)
    {
        const data = this.GetEntry(aID);

        let inputEditTitle      = document.getElementById("edit-title");
        let inputEditContent    = document.getElementById("edit-content");
        let butttonEdit         = document.getElementById("btn-edit");

        //Write this when GetEntry works

        //inputEditTitle.value = ;
        //inputEditContent.value = ;

        //butttonEdit.removeEventListener("submit", this.editCommand);
        
        //this.editCommand = () => { this.UpdateEntry() };

        //butttonEdit.addEventListener("submit", this.editCommand);
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
    }

    ClearElement()
    {
        while (aElement.firstChild) 
        {
            aElement.removeChild(aElement.firstChild);
        }
    }
}

let cms = new CMS();