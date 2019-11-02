const fs = require('fs');
let adj;

const INF = 10000000000;

function dijkstra(start, end = 'None'){
    let n = adj.length;
    let visited = new Array(n);
    let distance = new Array(n);
    let paths = new Array(n);
    distance.fill(INF, 0);
    paths.fill(-1, 0);
    visited.fill(false, 0);
    distance[start] = 0;
    for (let i = 0; i < n; i++){
        let v = -1;
        for(let j = 0; j < n; j++){
            if(!visited[j] && (v == -1 || distance[j] < distance[v])){
                v = j;
            }
        }
        if(distance[v] == INF){
            break;
        }
        visited[v] = true;
        for(let edje of adj[v]){
            let to = edje.to;
            let len = edje.len;

            if(distance[v] + len < distance[to]) {
                distance[to] = distance[v] + len;
                paths[to] = v;
            }
        }
    }
    if(end != 'None'){
        let road = [];
        while(end != -1){
            road.push(end);
            end = paths[end];
        }
        road.reverse();
        for (let stepStone of road){
            console.log(`${stepStone} ->`);
        }
    }
    return distance;
}


function shortestPath(fromNode, toNode = 'None'){
    fs.readFile('./graph.txt', 'UTF-8', (err, buffer) =>{
        let data = buffer.split('\n');
        let numberOfNodes = data[0];
        let graphData = data.slice(1, data.length);
        adj = new Array(parseInt(numberOfNodes));
        for(let i = 0; i < numberOfNodes; i++){
            adj[i] = [];
        }
        for( let line of graphData){
            let [from, to, value] = line.split(' ');
            adj[from].push({
                to: parseInt(to),
                len: parseInt(value)
            });
        }
        for(let i = 0; i < numberOfNodes; i++){
            console.log(`Shortest path to ${i} is ${dijkstra(fromNode, toNode)[i]}`);
        }
    });
}

shortestPath(0);

