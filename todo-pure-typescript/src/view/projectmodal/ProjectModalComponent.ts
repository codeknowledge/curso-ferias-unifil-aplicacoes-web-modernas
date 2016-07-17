//Model
import { Project } from '../../model/Project';
//api
import { CKComponent } from '../../api/core/CKComponent';
//service
import { ProjectModalService } from '../../service/ProjectModalService';

export class ProjectModalComponent extends CKComponent
{
    private project : Project;
    private _modalId : string = "projectRegisterModal";
    private editing : boolean = false;
    private removing : boolean = false;

    constructor()
    {
        super("src/view/projectmodal/ProjectModalComponent.html", "#projectModalComponent");
    }

    private get reflectColor() : string
    {
        return this.removing ? "red" : 
            this.creating ? "green" : "blue";
    }

    private get reflectIcon() : string
    {
        return this.editing ? "check" : "plus";
    }

    private get creating() : boolean
    {
        return !this.editing && !this.removing;
    }

    public get modalId() : string
    {
        return this._modalId;
    }

    private testHidden(value : boolean) : string
    {
        return value ? "" : "hidden";
    }

    private get whenCreating() : string
    {
        return this.testHidden(this.creating);
    }

    private get whenEditing() : string
    {
        return this.testHidden(this.editing);
    }

    private get whenRemoving() : string
    {
        return this.testHidden(this.removing);
    }

    private get whenNotRemoving() : string
    {
        return this.testHidden(!this.removing);
    }

    private get projectFinished() : string
    {
        return this.project.open ? "hidden" : "";
    }

    public startEditing(project ?: Project) : void
    {
        if(project)
        {
            this.editing = true;
            this.removing = false;
        }

        this.project = project ? project : new Project("", "");
        this.configureModal();
    }

    public startRemoving(project : Project)
    {
        this.project = project;
        this.removing = true;
        this.editing = false;
        this.configureModal();
    }

    private configureModal() : void
    {
        let instance : ProjectModalComponent = this;

        if(this.htmlModel)
        {
            jQuery("#" + this.modalId).modal("show");
            instance.applyScopeChange();
        }
        else
        {
            this.createView().then(() => {
                jQuery("#" + this.modalId).modal({
                    onVisible : () => {
                        instance.applyScopeChange();
                    }, onHidden : () => {
                        instance.clean();
                    }
                }).modal("show");
            });
        }
    }

    private setProjectName(event : Event)
    {
        this.project.name = event.currentTarget['value'];
    }

    private setProjectDescription(event : Event)
    {
        this.project.description = event.currentTarget['value'];
    }

    private setDueDate(event : Event)
    {
        this.project.dueDate = event.currentTarget['value'] ? new Date(event.currentTarget['value']) : null;
    }

    private setProject()
    {
        // the project needs to be created here
        if(this.creating)
            this.project.createdAt = new Date();
        
        ProjectModalService.instance.setProject(this.project);
    }

    private clean()
    {
        this.editing = false;
        this.removing = false;
        this.destroy();
        this.htmlModel = null;
        jQuery(".modal").remove();
    }

    private remove()
    {
        ProjectModalService.instance.setProject(this.project);
    }
}