export const visualizationController = (expressApp, gateway) => {

  expressApp.get('/api/visualization/create', (req, res) => {
    const owner = req.user ? req.user.id : undefined;
    gateway.createVisualization({ owner })
      .then(({id}) => res.json({ id }))
      .catch(error => res.json({ error }));
  });

  expressApp.get('/api/visualization/get/:id', (req, res) => {
    const id = req.params.id;
    gateway.getVisualization({ id })
      .then(visualization => res.json({ visualization }))
      .catch(error => res.json({ error }));
  });

  expressApp.post('/api/visualization/save/:id', (req, res) => {
    const user = req.user;
    const html = req.body.html;
    const id = req.params.id;
    gateway.saveVisualization({ id, html })
      .then(response => res.json(response))
      .catch(error => res.json({ error }));
  });

}
