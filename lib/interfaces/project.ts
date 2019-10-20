export interface ProjectMetadata {
  name: string;
  namespace: string;
}
export interface Project {
  metadata: ProjectMetadata;
  spec?: {
    description?: string
  }
}
