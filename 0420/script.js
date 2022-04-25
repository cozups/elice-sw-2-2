const topics = [
  { id: 1, title: "html", body: "html is ..." },
  { id: 2, title: "css", body: "css is ..." },
  { id: 3, title: "js", body: "js is ..." },
];
let nextId = 4;
let selectedId = null;
function navHandler(e) {
  // 1. 링크가 작동하지 않아야 한다.
  e.preventDefault();

  // 2. 아이디 값을 알아낸다.
  selectedId = Number(e.target.id);

  read();
}
function nav() {
  const tag = topics
    .map(
      e =>
        `<li>
          <a href="/read/${e.id}" id="${e.id}" onclick="navHandler(event);">
            ${e.title}
          </a>
        </li>`
    )
    .join("");
  document.querySelector("nav>ol").innerHTML = tag;
}
function welcome() {
  document.querySelector("article").innerHTML = `<h2>Welcome</h2>Hello, WEB`;
  selectedId = null;
  control();
}
function read() {
  // 3. 아이디와 일치하는 topics의 원소를 찾는다.
  const topic = topics.filter(e => e.id === selectedId)[0];

  // 4. 본문을 만든다.
  const content = `<h2>${topic.title}</h2>${topic.body}`;

  // 5. 본문을 출력한다.
  document.querySelector("article").innerHTML = content;

  control();
}
function createHandler(e) {
  e.preventDefault();

  const t = e.target.title.value;
  const b = e.target.body.value;
  const newTopic = { id: nextId, title: t, body: b };
  topics.push(newTopic);
  nav();
  selectedId = nextId;
  nextId++;
  read();
}
function create() {
  const content = `
    <form onsubmit="createHandler(event);">
      <p><input type="text" name="title" placeholder="제목"></p>
      <p><textarea name="body" placeholder="본문"></textarea></p>
      <p><input type="submit" value="create"></p>
    </form>
  `;
  // textarea는 열었으면 닫아야 함
  // onsubmit은 폼 태그에만 있음.
  document.querySelector("article").innerHTML = content;
}
function update() {}
function del() {}
function control() {
  let contextUI = "";
  if (selectedId !== null) {
    contextUI = `
      <li><a href="/update">Update</a></li>
      <li><a href="/delete">Delete</a></li> 
    `;
  }
  document.querySelector("#control").innerHTML = `
    <li><a href="/create" onclick="event.preventDefault(); create();">Create</a></li>
    ${contextUI} 
  `;
}

nav();
welcome();
control();
