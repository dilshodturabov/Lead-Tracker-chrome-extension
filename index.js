let myLeads = [];
const inputEl = document.getElementById('input-el');
const ulEl = document.getElementById('ul-el');
const inputBtn = document.getElementById('input-btn');
const deleteBtn = document.getElementById('delete-btn');
const tabBtn = document.getElementById('tab-btn');
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}


tabBtn.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", myLeads);
        render(myLeads);
    })
})

inputBtn.addEventListener('click', function() {
    myLeads.push(inputEl.value);
    inputEl.value = '';
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
})

function render(leads) {
    let listItem = '';
    for (let i = 0; i < leads.length; i++) {
        listItem += `
                    <li>
                        <a href="${leads[i]}" target='_blank'> 
                            ${leads[i]}
                        </a>
                    </li>
        `;
    }

    ulEl.innerHTML = listItem;
}

deleteBtn.addEventListener('dblclick', () => {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
})