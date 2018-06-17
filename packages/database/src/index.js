export const Database = connection => ({
  createVisualization: data => {
    const { id, title, slug, owner, description, files } = data;
    data = { id, title, slug, owner, description, files };
    
    return new Promise((resolve, reject) => {
      connection.get('documents', id).create(data);
      resolve({ id });
    });
  }
});
