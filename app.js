require('pmx').init({
    http : true
});

const express = require('express');
const app = express();
const exec = require('child_process').exec;

app.use(express.static(__dirname+'/dist'));

exec('gulp build', (error, stdout, stderr) => {

    if (error) {
        console.log('stdout',stdout);
        console.log('stderr',stderr);
    }
    app.listen(3002,()=>{
        console.log('Http server started at 3002')
    });
});



