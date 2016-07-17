//Model
import { Project } from '../../model/Project';
//api
import { CKComponent } from '../../api/core/CKComponent';
import { LocalStorageCrud } from '../../util/LocalStorageCrud';

import { ProjectComponent } from '../../view/project/ProjectComponent';
//service
import { ProjectModalService } from '../../service/ProjectModalService';

export class DashboardView extends CKComponent
{
    private projectComps : Array<ProjectComponent>;
    private projectsRef : Array<Project>;
    constructor()
    {
		super("src/view/dashboard/DashboardView.html", "#dashboard");
        let instance : DashboardView = this;
        instance.projectComps = new Array<ProjectComponent>();
        instance.projectsRef = new Array<Project>();
        instance.projectsRef.push(new Project("Default", "This is the default project"));

        this.initView().then(() => {
            ProjectModalService.instance.createService(instance);
            this.createView().then(() => {
                instance.createProjects();
            });
        });
    }

    private createProjects() : Promise<void>
    {
        let instance : DashboardView = this;
        return new Promise<void>((resolve, reject) =>
        {
            let promises : Array<Promise<ProjectComponent>> = new Array<Promise<ProjectComponent>>();

            instance.projectsRef.forEach(todoResp => {
                let project : Project = new Project(todoResp.name, todoResp.description);
                project.createdAt = todoResp.createdAt ? new Date(<any>todoResp.createdAt) : null;
                project.done = todoResp.done;
                project.doneDate = todoResp.doneDate ? new Date(<any>todoResp.doneDate) : null;
                project.id = todoResp.id;
                project.updateDate = todoResp.updateDate ? new Date(<any>todoResp.updateDate) : null;
                project.dueDate = todoResp.dueDate ? new Date(<any>todoResp.dueDate) : null;

                let todoComp : ProjectComponent = new ProjectComponent(project);
                promises.push(todoComp.createView());
            });

            Promise.all(promises).then((results) => {
                instance.projectComps = <any> results;
                resolve();
            }).catch(error => {
                reject(error);
            });
        });
    }

    initView(): Promise<any> {
		let instance: DashboardView = this;
        return new Promise<any>((resolve, reject) => {
            resolve();
        });
	}

    private addProject() : void
    {
        let instance : DashboardView = this;
        ProjectModalService.instance.openModal((project : Project) => {
            let todoComp : ProjectComponent = new ProjectComponent(project);
            todoComp.createView().then(() => {
                instance.projectComps.push(todoComp);
                LocalStorageCrud.instance.create(project);
            });
        });
    }
}