# nuclio-js-sdk
[Nuclio Dashboard Http API](https://github.com/nuclio/nuclio/tree/master/cmd/dashboard) implementation in javascript.

## 1. Installation

`npm i github:ayZagen/nuclio-js-sdk` or with yarn `yarn add github:ayZagen/nuclio-js-sdk`

## 2. Example Usage 

```js

const { Nuclio } = require('nuclio-js-sdk')

const api = new Nuclio('http://nucliodashboard-url')

const project = await api.createProject({
    metadata: {
        name: 'test-project',
        namespace: api.namespace
    },
    spec:{
        description: 'test project'
    }
})

const func = await api.createFunction( {
    metadata: {
        name      : 'hello-world',
        namespace : 'nuclio',
        labels    : {
            'nuclio.io/project-name': project.metadata.name
        }
    },
    spec: {
        runtime : 'golang',
        build   : {
            path             : 'https://raw.githubusercontent.com/nuclio/nuclio/master/hack/examples/golang/helloworld/helloworld.go',
            noBaseImagesPull : true
        },
        runRegistry: 'localhost:5000'
    }
});

await api.deleteFunction(func.metadata.name)
```

## 3. TODO
- [ ] Test
