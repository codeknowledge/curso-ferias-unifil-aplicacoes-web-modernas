System.config({
  "baseURL": "/",
  "defaultJSExtensions": true,
  "transpiler": "typescript",
  //add this if using typescript
  "typescriptOptions":{
    "module":"commonjs",
    "emitDecoratorMetadata": true
  },
  //add this if using traceur
  "traceurOptions": {
    "annotations" : true,
    "memberVariables" : true,
    "types" : true
  },
  "paths": {
    'Main': 'src/main', // The App Starter Point,
  },
  //this configures our app paths
  "packages": {
    "app": {
      "main": "Main",
      "defaultExtension": "ts" //or "ts" for typescript
    }
  },
  "meta": {
        'rx': {
            format: 'cjs'
        }
    }
});