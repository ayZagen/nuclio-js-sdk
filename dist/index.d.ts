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
    updateFunction(name: string, functionDef: NuclioFunction): Promise<import("got/dist").Response>;
    invokeFunction(name: string, method: Method, requestBody: any, path?: string, invokeVia?: string): Promise<import("got/dist").Response>;
    deleteFunction(name: string): Promise<import("got/dist").Response>;
    getEvents(): Promise<import("got/dist").Response>;
    getEventByName(name: string): Promise<import("got/dist").Response>;
    createEvent(eventDef: any): Promise<import("got/dist").Response>;
    getFunctionTemplates(): Promise<import("got/dist").Response>;
    updateEvent(name: string, eventDef: any): Promise<import("got/dist").Response>;
    deleteEvent(name: string): Promise<import("got/dist").Response>;
    getProjects(): Promise<{
        [key: string]: Project;
    }>;
    getProjectByName(name: string): Promise<Project>;
    createProject(projectDef: Project): Promise<Project>;
    updateProject(name: string, projectDef: Project): Promise<import("got/dist").Response>;
    deleteProject(name: string): Promise<import("got/dist").Response>;
    version(): Promise<import("got/dist").Response>;
    getExternalIPAddresses(): Promise<import("got/dist").Response>;
}
