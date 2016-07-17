//Model
import { Project } from '../../model/Project';
//api
import { CKComponent } from '../../api/core/CKComponent';
import { LocalStorageCrud } from '../../util/LocalStorageCrud';
//service
import { ProjectModalService } from '../../service/ProjectModalService';

//Util
export class ProjectComponent extends CKComponent
{
    
    private get classes() : string {
        if(this.project.done) {
            return "header name finished";
        } else {
            return "header name";
        }
    }

    constructor(private project : Project)
    {
        super("src/view/project/ProjectComponent.html", "#project-list");
    }
    
    private toggleState(): void {
        let instance : ProjectComponent = this;
        this.toggleDoneDate();
        LocalStorageCrud.instance.save(this.project).then(() => {            
            instance.applyScopeChange();
        });
    }

    private toggleDoneDate(): void {        
        if (this.project.done)
            this.project.doneDate = null;
        else
            this.project.doneDate = new Date();

        this.project.done = !this.project.done;
    }

    private edit() : void {
        let instance : ProjectComponent = this;
        ProjectModalService.instance.openModal((project : Project) => {
            instance.project = project;
            LocalStorageCrud.instance.save(instance.project).then(() => {                
                instance.applyScopeChange();
            });
        }, () => {

        }, this.project, false);
    }

    private remove() : void {
        let instance : ProjectComponent = this;
        let clonedTodo : Project = this.project.clone();
        if(clonedTodo.dueDate)
            clonedTodo.dueDate = new Date(clonedTodo.dueDate.toUTCString());
        
        ProjectModalService.instance.openModal((project : Project) => {
            LocalStorageCrud.instance.delete(instance.project).then(() => {
                instance.destroy();
            });
        }, () => {

        }, clonedTodo, true);
    }

    private get finished() : string {
        return this.project.open ? "hidden" : "";
    }

    private get open() : string {
        return this.project.done ? "hidden" : "";
    }

    private get edited() : string {
        return this.project.updateDate ? "" : "hidden";
    }

    private get checked() : string {
        return this.project.done ? "checked" : "";
    }

    private get theresDueDate() : string {
        return this.project.dueDate ? "" : "hidden";
    }
}