const items = [
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    category: "Shopping",
    amount: 50,
    date: "2018-12-31",
    notes: "Bought less expensive phone"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    category: "Shopping",
    amount: 20,
    date: "2018-12-31",
    notes: "Bought less expensive phone"
  }
];

export function getItems() {
  return items;
}

export function getItem(id) {
  return items.find(m => m._id === id);
}

export function saveItem(item) {
  let iteminDb = items.find(m => m._id === item._id) || {};
  iteminDb.category = item.category;
  iteminDb.amount = item.amount;
  iteminDb.date = item.date;
  iteminDb.notes = item.notes;

  if (!iteminDb._id) {
    iteminDb._id = Date.now().toString();
    items.push(iteminDb);
  }

  return iteminDb;
}

export function deleteItem(id) {
  let iteminDb = items.find(m => m._id === id);
  items.splice(items.indexOf(iteminDb), 1);
  return iteminDb;
}
