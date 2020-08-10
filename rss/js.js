google.load("feeds", "1");

let countChannel = 0;
let currentRSS="";
let countMessage = 0;
let countAutor = 0;

document.getElementById("countChannel").textContent="Количество RSS каналов " + countChannel;

// Добавление RSS каналов
function addChannel() {
  if (document.getElementById("urlChannel").value==""){
    return;
}
let text = document.getElementById("urlChannel");
 let list = document.getElementById("list");
 let p = document.createElement("p");
 p.innerHTML = text.value;
 document.getElementById("list").appendChild(p);
 text.value = "";
 countChannel++;
 document.getElementById("countChannel").textContent="Количество RSS каналов " + countChannel;
}

//Добавление сообщений
function channels(rec) {
  let container = document.getElementById("feed");
  let div = document.createElement("div");
  let massege = document.createElement("p");
  let title = document.createElement("h3");
  let link = document.createElement("a");
  let aut = document.createElement("p");
  container.appendChild(div);
  div.appendChild(title);
  div.id = countMessage;
  div.classList = "feedLi";
  document.getElementById(countMessage).onclick = readText;

  div.appendChild(link);
  div.appendChild(massege);
  massege.id = countMessage + "p";
  div.appendChild(aut);
  title.textContent = rec.title;
  massege.innerHTML = rec.content;
  link.href = rec.link;
  link.textContent = rec.link;
  // aut.innerHTML = rec.author;
  countMessage++;
  document.getElementById("countContent").textContent="Количество сообщений " + countMessage;
}

// Чтение сообщения
function readText(){
  let num = (this.id);
  document.getElementById("content").textContent = document.getElementById(num+"p").textContent;
  letterCount(document.getElementById(num+"p").textContent);
}

// подсчет букв и диаграмма
function letterCount(news) {
  var allowed = /[a-z]/i;
  var results = Array.prototype.reduce.call(news, function (data, letter) {
    if (allowed.test(letter)) {
        letter = letter.toLowerCase();
        if (data[letter] === undefined) {
            data[letter] = 0;
        }
        data[letter] += 1;
    }
    return data;
}, {});

let dataPoints = [];
for (var letter in results) {
   dataPoints.push({label: letter, y: results[letter]});
}
console.log(dataPoints);
var chart = new CanvasJS.Chart("chartContainer" , {
  title: {
    text: "Буквы "
  },
  data: [{
    type: "pie",
    dataPoints: dataPoints
  }]
});
chart.render();  
}

//выбор канала
document.getElementById("list").onclick = function(event) {
  let target = event.target;
  currentRSS = target.innerHTML;
  document.getElementById("feed").innerHTML = "";
   google.setOnLoadCallback(initialize); 
}

//google feed
function initialize() {
  countMessage = 0;
  var feed = new google.feeds.Feed(currentRSS);
  feed.load(function(result) {
    if (!result.error) {
      for (var i = 0; i < result.feed.entries.length; i++) {
        var entry = result.feed.entries[i];
        channels(entry);
       

      }
    }
  });
}
google.setOnLoadCallback(initialize);


   



   