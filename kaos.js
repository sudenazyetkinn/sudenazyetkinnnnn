let zIndexCounter = 1;

let activeItem = null;
let mode = null;

let startX = 0;
let startY = 0;
let startScale = 1;
let startRotate = 0;


document.querySelectorAll(".item").forEach(item => {
  item.dataset.scale = 1;
  item.dataset.rotate = 0;

  item.addEventListener("mousedown", e => {
    if (e.target.classList.contains("scale-handle")) return;
    if (e.target.classList.contains("rotate-handle")) return;

    selectItem(item);

    activeItem = item;
    mode = "move";

    startX = e.clientX - item.offsetLeft;
    startY = e.clientY - item.offsetTop;
  });
});


document.querySelectorAll(".scale-handle").forEach(handle => {
  handle.addEventListener("mousedown", e => {
    e.stopPropagation();

    activeItem = handle.parentElement;
    mode = "scale";

    startX = e.clientX;
    startScale = Number(activeItem.dataset.scale);
  });
});


document.querySelectorAll(".rotate-handle").forEach(handle => {
  handle.addEventListener("mousedown", e => {
    e.stopPropagation();

    activeItem = handle.parentElement;
    mode = "rotate";

    startX = e.clientX;
    startRotate = Number(activeItem.dataset.rotate);
  });
});


document.addEventListener("mousemove", e => {
  if (!activeItem) return;

  if (mode === "move") {
    activeItem.style.left = e.clientX - startX + "px";
    activeItem.style.top = e.clientY - startY + "px";
  }

  if (mode === "scale") {
    const diff = e.clientX - startX;
    activeItem.dataset.scale = Math.max(0.2, startScale + diff / 200);
    applyTransform(activeItem);
  }

  if (mode === "rotate") {
    const diff = e.clientX - startX;
    activeItem.dataset.rotate = startRotate + diff;
    applyTransform(activeItem);
  }
});


document.addEventListener("mouseup", () => {
  activeItem = null;
  mode = null;
});


document.getElementById("kaos-alani").addEventListener("mousedown", e => {
  if (e.target.id === "kaos-alani") {
    clearSelection();
  }
});

function selectItem(item) {
  document.querySelectorAll(".item").forEach(i =>
    i.classList.remove("active")
  );

  item.classList.add("active");

 
  item.style.zIndex = zIndexCounter++;
}


function clearSelection() {
  document.querySelectorAll(".item").forEach(i =>
    i.classList.remove("active")
  );
}

function applyTransform(item) {
  item.style.transform = `
    scale(${item.dataset.scale})
    rotate(${item.dataset.rotate}deg)
  `;
}
