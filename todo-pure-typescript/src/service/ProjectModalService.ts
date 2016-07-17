import { DashboardView } from '../view/dashboard/DashboardView';
import { Project } from '../model/Project';
import { ProjectModalComponent } from '../view/projectmodal/ProjectModalComponent';

export class ProjectModalService {
    private static _instance: ProjectModalService = null;
    private dashboardView: DashboardView;
    private onConfirm: (project: Project) => void;
    private onDecline: () => void;
    private project: Project;
    private projectModalComponent: ProjectModalComponent;

    public static get instance(): ProjectModalService {
        if (ProjectModalService._instance === null) {
            ProjectModalService._instance = new ProjectModalService();
        }

        return ProjectModalService._instance;
    }

    constructor() {
        this.projectModalComponent = new ProjectModalComponent();
    }

    public createService(dashboardView: DashboardView): ProjectModalService {
        this.dashboardView = dashboardView;
        return this;
    }

    public openModal(onConfirm: (project: Project) => void, onDecline?: () => void, project?: Project, removing ?: boolean): void {
        this.onConfirm = onConfirm;
        this.onDecline = onDecline;
        this.project = project;
        if(!removing) {
            this.projectModalComponent.startEditing(project);
        } else {
            this.projectModalComponent.startRemoving(project);
        }
    }

    public setProject(project: Project): void {
        if (this.onConfirm) {
            this.onConfirm(project);
        }
    }

    public removeProject(project: Project): void {
        if (this.onConfirm) {
            this.onConfirm(project);
        }
    }
}