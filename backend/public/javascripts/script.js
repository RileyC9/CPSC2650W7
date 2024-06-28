document.addEventListener("DOMContentLoaded",() => {
  let deleteButton = document.querySelectorAll(".delete-btn");
  deleteButton.forEach((button) => {
    button.addEventListener("click", async ()=> {
      let id = button.getAttribute("data-id");
      let res = await fetch(`/notes/${id}`,{ 
        method: "DELETE",
      });
      if (res.ok) {
        button.closest('li').remove();
      } else {
        console.error("failed to delete");
      }
    }
  )})

  let saveButton = document.querySelectorAll(".edit-btn");
  saveButton.forEach((button) => {
    button.addEventListener("click", async () => {
      let id = button.getAttribute("data-id");
      if (button.innerText === "Edit") {
        let note = button.closest('li').querySelector('div');
        note.setAttribute("contenteditable","true");
        button.textContent = "Send";
      } else if (button.innerText === "Send"){
        let newNote = button.closest('li').querySelector('div').innerText;
        button.textContent = "Edit";
        let res = await fetch(`/notes/${id}`, {
          method: "PUT",
          headers: {"Content-type": "application/json"},
          body: JSON.stringify({ text: newNote })
        })
        
      }
      
      
    })
  })
})