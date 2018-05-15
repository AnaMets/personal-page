class ProjectList {
    constructor (projectsUrl, renderContainer) {
        fetch(projectsUrl)
            .then(result => result.json() )
            .then(projects => {
                this.projects = projects;
                this.renderProjects(renderContainer, projects);
                this.addEventListeners();
            })
    }
    getProjectById(id) {
        return this.projects.find(el => el.id === id);
    }
    renderProjects(container, projects) {
        let projectListDomString = ''
        projects.forEach(project => {
            projectListDomString += 
                `<div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                  <div class="card project">
                    <img class="card-img-top" src="img/projects/${project.image}" 
                        alt="${project.title}">
                    <div class="card-body">
                      <h4 class="card-title">${project.title}</h4>
                      <p class="card-text">${project.description}</p>
                      <button class="btn btn-info" data-toggle="modal"
                        data-target="#projectInfoModal" data-id="${project.id}">Info
                      </button>
                     </div>
                  </div>
                </div>`;
        });
        container.html(projectListDomString);
    }
    addEventListeners() {
        $('#projectInfoModal').on('show.bs.modal', event => {
            const button = $(event.relatedTarget); // Button that triggered the modal
            const id  = String(button.data('id')); // Extract info from data-* attributes
            const urlGit  = String(button.data('urlGit'));
            const project = this.getProjectById(id);
            const modal = $('#projectInfoModal');
            modal.find('.modal-body .card-img-top')
                .attr('src', 'img/projects/'+project.image)
                .attr('alt', project.title);
            modal.find('.modal-body .card-title').text(project.title);
            modal.find('.modal-body .card-text').text(project.description);
            modal.find('.modal-body .card-url')
                .attr('href', project.urlGit);
        });
    }
}