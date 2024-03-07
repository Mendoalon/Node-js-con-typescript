const currentTicketLbl = document.querySelector("span");
const createTicketBtn = document.querySelector("button");

async function getLastTicket() {
  const lasTicket = await fetch("/api/ticket/last").then((resp) => resp.json());
  currentTicketLbl.innerHTML = lasTicket;
}

async function createTicket() {
  const newTicket = await fetch("/api/ticket", {
    method: "POST",
  }).then((resp) => resp.json());

  currentTicketLbl.innerHTML = newTicket.number;
}

createTicketBtn.addEventListener("click", createTicket);

getLastTicket();
