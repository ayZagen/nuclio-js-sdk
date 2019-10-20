import got, {Got} from 'got';
import {Method} from 'got/dist/utils/types';
import {Project, ProjectMetadata} from './interfaces/project';
import {NuclioFunction, NuclioFunctionMetadata} from './interfaces/function';

export class Nuclio {
  private readonly baseUrl: string;
  readonly namespace: string;
  private http: Got;

  /**
   * @param baseUrl Nuclio dashboard url
   * @param namespace Nuclio namespace. Defaults to 'nuclio'
   */
  constructor(baseUrl: string, namespace: string = 'nuclio'){
    this.baseUrl = baseUrl;
    this.namespace = namespace;
    this.http = got.extend({
      timeout         : 600000,
      responseType    : 'json',
      resolveBodyOnly : true,
      throwHttpErrors : true,
      prefixUrl       : this.baseUrl + '/api',
      headers         : {
        'content-type'                : 'application/json',
        'x-nuclio-function-namespace' : namespace
      },
      hooks: {
        beforeError: [
          (error: any) => {
            if (error.response && error.response.body && error.response.body.error){
              error.name = 'NuclioError';
              error.message = error.response.body.error;
              error.stackTrace = error.response.body.errorStackTrace;
            }
            return error;
          }
        ]
      }
    });
  }

  async getFunctions(projectName?: string): Promise<{ [key: string]: NuclioFunction }>{
    return this.http.get('functions', {
      headers: {
        'x-nuclio-project-name': projectName
      }
    }) as any;
  }

  async getFunctionByName(name: string): Promise<NuclioFunction>{
    return this.http.get('functions/' + name) as any;
  }

  async createFunction(functionDef: NuclioFunction): Promise<NuclioFunction>{
    return this.http.post('functions', {
      json: functionDef
    }) as any;
  }

  async updateFunction(name: string, functionDef: NuclioFunction){
    return this.http.put('functions/' + name, {
      json: functionDef
    });
  }

  async invokeFunction(name: string, method: Method, requestBody: any, path?: string, invokeVia?: string){
    return this.http('function_invocations', {
      method,
      json    : requestBody,
      headers : {
        'content-type'           : 'application/json',
        'x-nuclio-function-name' : name,
        'x-nuclio-path'          : path,
        'x-nuclio-invoke-via'    : invokeVia
      }
    });
  }

  async deleteFunction(name: string){
    return this.http.delete('functions', {
      json: {
        name,
        namespace: this.namespace
      }
    });
  }

  async getEvents(){
    return this.http.get('function_events');
  }
  async getEventByName(name: string){
    return this.http.get('function_events/'+ name);
  }
  async createEvent(eventDef: any){
    return this.http.post('function_events', {
      json: eventDef
    });
  }

  async getFunctionTemplates(){
    return this.http.get('function_templates');
  }

  async updateEvent(name: string, eventDef: any){
    return this.http.put('function_events', {
      json: eventDef
    });
  }
  async deleteEvent(name: string){
    return this.http.delete('function_events', {
      json: {
        name,
        namespace: this.namespace
      }
    });
  }

  async getProjects(): Promise<{ [key: string]: Project}>{
    return this.http.get('projects') as any;
  }
  async getProjectByName(name: string): Promise<Project>{
    return this.http.get('projects/'+ name) as any;
  }
  async createProject(projectDef: Project): Promise<Project>{
    return this.http.post('projects', {
      json: projectDef
    }) as any;
  }
  async updateProject(name: string, projectDef: Project){
    return this.http.put('projects', {
      json: projectDef
    });
  }
  async deleteProject(name: string){
    return this.http.delete('projects', {
      json: {
        name,
        namespace: this.namespace
      }
    });
  }
  async version(){
    return this.http.get('versions');
  }
  async getExternalIPAddresses(){
    return this.http.get('external_ip_addresses');
  }
}
