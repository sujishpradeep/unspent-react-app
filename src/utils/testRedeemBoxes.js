const boxes = [
  { _id: "1", name: "Invest in mutual funds " },
  { _id: "2", name: "Saving for Jamie's b'day" },
  { _id: "3", name: "" }
];

export function getBoxes() {
  return boxes;
}

export function getBox(id) {
  return boxes.find(m => m._id === id);
}

export function saveBox(box) {
  let boxinDb = boxes.find(m => m._id === box._id) || {};
  boxinDb.category = box.category;
  boxinDb.amount = box.amount;
  boxinDb.date = box.date;
  boxinDb.notes = box.notes;

  if (!boxinDb._id) {
    boxinDb._id = Date.now().toString();
    boxes.push(boxinDb);
  }

  return boxinDb;
}

export function deleteBox(id) {
  let boxinDb = boxes.find(m => m._id === id);
  boxes.splice(boxes.indexOf(boxinDb), 1);
  return boxinDb;
}
