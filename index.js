function randomItem (list) 
{
  return list[Math.floor(Math.random() * list.length)];
};


var ws = {};

ws.data = {};

if (typeof localStorage.movieList === 'undefined') {
  document.getElementById("list").innerHTML.split(",").forEach(function(i){ ws.data[i] = {movie:i, done: false }});
} else {
  ws.data = JSON.parse(localStorage.movieList);
}

function spinItem() {
    document.getElementById("result").innerHTML = ws.data[randomItem(Object.keys(ws.data))]["movie"];
}


var oEl = document.getElementById("container");;

function renderTask(id, task){
  var o = '';

  o+= '<tr data="'+id+'"><td class="js-edit">Movie: </td><td>'+task.movie+'</td><td>';
  if(task.done){
    o+='Watched';
  } else {
    o+= 'To Watch';
  }
  o+='</td></tr>';

  return o;
}

function renderList(tasks){
  var o = '',header = '', footer = '';

  header = '<button>Add</button><input id="newTask" type="text"/><table><thead><tr><th></th><th>Movie</th><th>Done</th></tr></thead><tbody>';
  footer = '</tbody></table>';

  for (var v in tasks) {
    o += renderTask(v, tasks[v]);
  }

  return header + o + footer;
}

function editTask(el){
  /* get el replace with row inc input for editor */
  var o = '', id = el.attributes.data.value;
  o +='<tr data="'+id+'"><td>Save</td><td></td><td><input type="option" checked="';
  if(ws.data[id].done){ o+='checked'; }
  o+= '"></td></tr>';
  return o;
}

function saveList() {
  localStorage.movieList = JSON.stringify(ws.data);
}

function getList() {
  oEl.innerHTML = renderList(ws.data);
  var p = document.getElementsByTagName("tr");
  var zen = 0;
  for (var b in p) { 
    if(parseInt(b) == b) {
      p[b].addEventListener("click",function(e){
        var o = e.currentTarget, id = e.currentTarget.attributes.data.value;
    
        ws.data[id].done = !ws.data[id].done;
        getList();
      }); 
      zen++;
    }
  }

  document.getElementById("newTask").addEventListener("change",function(e){
    ws.data["task-"+zen] = {"movie":document.getElementById("newTask").value,done: false};
    saveList();
    getList();
  });
  if(document.getElementById("editTask") == null) {
  document.getElementById("newTask").focus(); } else {
  document.getElementById("editTask").focus(); 
  }
}

function delItems() {
  ws.data = {};  

  getList();
}

function bindAction(el,a) {
  if(el.hasOwnProperty() == false) {  

    el.addEventListener(a,function(e){
      console.log(e);
    });
  }
}

getList();
document.getElementById("newTask").focus();
