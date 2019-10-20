const { Nuclio } = require('./dist')
const api = new Nuclio('http://localhost:8070')

(async ()=>{

    const resp = await api.createProject({
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
                'nuclio.io/project-name': 'function-project'
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
    console.log(func)
})()
