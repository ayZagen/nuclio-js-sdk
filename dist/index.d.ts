import { Method } from 'got/dist/utils/types';
import { Project } from './interfaces/project';
import { NuclioFunction } from './interfaces/function';
export declare class Nuclio {
    private readonly baseUrl;
    readonly namespace: string;
    private http;
    /**
     * @param baseUrl Nuclio dashboard url
     * @param namespace Nuclio namespace. Defaults to 'nuclio'
     */
    constructor(baseUrl: string, namespace?: string);
    getFunctions(projectName?: string): Promise<{
        [key: string]: NuclioFunction;
    }>;
    getFunctionByName(name: string): Promise<NuclioFunction>;
    createFunction(functionDef: NuclioFunction): Promise<NuclioFunction>;
    updateFunction(name: string, functionDef: NuclioFunction): Promise<any>;
    invokeFunction(name: string, method: Method, requestBody: any, path?: string, invokeVia?: string): Promise<any>;
    deleteFunction(name: string): Promise<any>;
    getEvents(): Promise<any>;
    getEventByName(name: string): Promise<any>;
    createEvent(eventDef: any): Promise<any>;
    getFunctionTemplates(): Promise<any>;
    updateEvent(name: string, eventDef: any): Promise<any>;
    deleteEvent(name: string): Promise<any>;
    getProjects(): Promise<{
        [key: string]: Project;
    }>;
    getProjectByName(name: string): Promise<Project>;
    createProject(projectDef: Project): Promise<Project>;
    updateProject(name: string, projectDef: Project): Promise<any>;
    deleteProject(name: string): Promise<any>;
    version(): Promise<any>;
    getExternalIPAddresses(): Promise<any>;
}
