document.addEventListener("click", async (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;

    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }

  if (event.target.dataset.type === "edit") {
    const listItem = event.target.closest("li");
    const id = event.target.dataset.id;
    const oldTitle = listItem.childNodes[0].textContent.trim();
    const newTitle = prompt("Введите новое название ", oldTitle);
    console.log(newTitle);
    if (newTitle !== null) {
      try {
        await update(id, newTitle);
        listItem.childNodes[0].textContent = newTitle;
        console.log("Название заметки успешно изменено!");
      } catch (error) {
        console.error("Ошибка при изменении названия заметки:", error);
      }
    } else {
      console.log("Редактирование отменено");
    }
  }
});

async function update(newNote) {
  await fetch(`/${newNote.id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newNote),
  });
}

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}
