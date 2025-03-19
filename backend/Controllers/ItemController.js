const items = []; // Temporary storage for demo

exports.getItems = (req, res) => {
  res.json(items);
};

exports.getItem = (req, res) => {
  const item = items.find(i => i.id === req.params.id);
  if (!item) return res.status(404).json({ message: 'Item not found' });
  res.json(item);
};

exports.createItem = (req, res) => {
  const newItem = { id: Date.now().toString(), ...req.body };
  items.push(newItem);
  res.status(201).json(newItem);
};

exports.updateItem = (req, res) => {
  const index = items.findIndex(i => i.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Item not found' });
  items[index] = { ...items[index], ...req.body };
  res.json(items[index]);
};

exports.deleteItem = (req, res) => {
  const index = items.findIndex(i => i.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Item not found' });
  items.splice(index, 1);
  res.json({ message: 'Item deleted successfully' });
};
