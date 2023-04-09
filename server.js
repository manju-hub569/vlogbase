const cluster = require('cluster');
const cpu = require('os');

const len = cpu.cpus().length;

if(cluster.isMaster) {
    console.log(process.pid);
    for(var i =0; i < len; i++) {
        cluster.fork();
    }
}  
else {
    require('./index');
}