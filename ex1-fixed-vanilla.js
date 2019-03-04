function initUI() {
    workEntryForm =  document.querySelector("[rel*=js-work-entry-form]");
    workEntrySelectProject = document.querySelectorAll("[rel*=js-select-project]")[0];
    workEntryDescription = document.querySelector("[rel*=js-work-description]");
    workEntryTime = document.querySelector("[rel*=js-work-time]");
    workEntrySubmit = document.querySelector("[rel*=js-submit-work-entry]");
    projectList = document.querySelector("[rel*=js-project-list]");

    debugger;
    var handleClick = function(){
        var projectId = workEntrySelectProject.value;
        var description = workEntryDescription.value;
        var minutes =  workEntryTime.value;

        if(!validateWorkEntry(description, minutes)){
            alert("Oops, bad entry. Try again.");
            workEntryDescription.focus();
            return;
        }

        addWorkToProject(Number(projectId), description, Number(minutes));
        workEntryDescription.focus();
    }

    workEntrySubmit.addEventListener("click", handleClick);
}



function validateWorkEntry(description, minutes){
    if (description.length < 5) return false;
    if (
        /^\s*$/.test(minutes) ||
        Number.isNaN(Number(minutes)) ||
        minutes < 0 ||
        minutes > 600){
            return false;
        }
    return true;
}

function addProject(description){
    var projectId = Math.round(Math.random()*1E4);
    var projectEntryData = {
        id: projectId,
        description: description,
        work: [],
        time: 0
    };
    projects.push(projectEntryData);
    addProjectToList(projectEntryData);
    addProjectSelection(projectEntryData);
    
}

function addWorkToProject(projectId, description, minutes){
    var projectId = Math.round(Math.random()*1E4);
    var projectEntryData = {
        id: projectId,
        description: description,
        work: [],
        time: 0
    };
    projects.push(projectEntryData);

    addProjectToList(projectEntrydata);
    addPrejectSelection(projectEntryData);
}

function addProjectToList(projectEntryData){
    var project = document.createElement('div');
    project.insertAdjacentHTML('beforeend', projectTemplate);
    project.querySelector(".project-entry").setAttribute("data-project-id", projectEntryData.id);
    project.querySelector("[rel*=js-project-description]").insertAdjacentText("beforeend", projectEntryData.description);
    projectList.append(project);

}

function addProjectSelection(projectEntryData){
    var option = document.createElement('option');
    option.setAttribute("value", projectEntryData.id);
    option.text = projectEntryData.description;
    workEntrySelectProject.appendChild(option);
}

var workEntryForm, workEntryDescription, workEntrySelectProject, workEntryTime, projectList;

var projectTemplate = "<div class='project-entry'><h3 class='project-description' rel='js-project-description'></h3><ul class='work-entries' rel='js-work-entries'></ul><span class='work-time' rel='js-work-time'></span></div>";
var workEntryTemplate = "<li class='work-entry'><span class='work-time' rel='js-work-time'></span><span class='work-description' rel='js-work-description'></span></li>";

var projects = [];

initUI();

// hard coding some initial data
debugger;
addProject("client features");
addProject("overhead");
addProject("backlog");