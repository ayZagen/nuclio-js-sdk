export interface NuclioFunctionMetadata {
  name: string;
  namespace: string;
  labels?: { [label: string]: string };
  annotations?: { [label: string]: string };
}
interface NuclioFunctionStatus {
  state: string,
  httpPort?: number;
  logs: {
    level: string;
    message: string;
    name: string;
    time: number;
    imageName?: string;
    httpPort?: number;
    result?: {
      Image: string;
      UpdatedFunctionConfig: NuclioFunction
    }
  }[]
}

export type Runtime = 'golang' | 'python' | 'pypy' | 'nodejs' | 'dotnetcore' | 'shell';

interface Directive {
  kind?: string;
  value?: string;
}
interface Build {
  path?: string;
  functionSourceCode?: string;
  functionConfigPath?: string;
  tempDir?: string;
  registry?: string;
  image?: string;
  noBaseImagesPull?: boolean;
  noCache?: boolean;
  noCleanup?: boolean;
  baseImage?: string;
  commands?: string[];
  directives?: { [key: string]: Directive };
  scriptPaths?: string[];
  addedPaths?: { [key: string]: string};
  dependencies?: string[];
  onbuildImage?: string;
  offline?: boolean;
  runtimeAttributes?: { [key: string]: any; };
  codeEntryType?: string;
  codeEntryAttributes?: { [key: string]: any; };
  timestamp?: number;
  mode?: 'neverBuild' | 'alwaysBuild';
}

interface DataBinding {
  name?: string;
  class: string;
  kind: string;
  url: string;
  path?: string;
  query?: string;
  secret?: string;
  attributes?: { [key: string]: any}
}

interface Partition {
  id: string;
  checkpoint: any;
}
interface Trigger {
  class: string;
  kind: string;
  disabled?: boolean;
  maxWorkers?: number;
  url?: string;
  paths?: string[];
  username?: string;
  password?: string;
  secret?: string;
  partitions?: Partition[];
  annotations?: { [key: string]: any}
  workerAvailabilityTimeoutMilliseconds?: number;
  workerAllocatorName?: string;
  total_tasks?: number;
  max_task_allocation?: number;
  attributes?: { [key: string]: any}
}

interface Volume {
  volume?: any;
  volumeMount?: any;
}

interface Platform {
  attributes?: {
    [key: string]: any;
  };
}
interface LoggerSink {
  level?: string;
  sink?: string
}
interface NuclioFunctionSpec {
  description?: string;
  disabled?: boolean;
  publish?: boolean;
  handler?: string;
  runtime?: Runtime;
  env?: any; //todo: k8s env
  resources?: any; //todo: k8s resources
  image?: string;
  imageHash?: string;
  replicas?: number;
  minReplicas?: number;
  maxReplicas?: number;
  targetCPU?: number;
  dataBindings?: { [key: string]: DataBinding };
  triggers?: { [key: string]: Trigger };
  volumes?: Volume[];
  version?: number;
  alias?: string;
  build?: Build;
  runRegistry?: string;
  runtimeAttributes?: { [key: string]: any; };
  loggerSinks?: LoggerSink[];
  dealerURI?: string;
  platform?: Platform;
  readinessTimeoutSeconds?: number;
  avatar?: string;
  serviceType?: any; // todo: k8 service type
  imagePullPolicy?: any; // todo: k8 pull policy
  serviceAccount?: string;
  eventTimeout?: string;
}

export interface NuclioFunction{
  metadata: NuclioFunctionMetadata;
  spec: NuclioFunctionSpec;
  status?: NuclioFunctionStatus;
}
