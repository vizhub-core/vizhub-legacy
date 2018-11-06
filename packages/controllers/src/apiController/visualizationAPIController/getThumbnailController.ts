//import { GetThumbnail } from 'datavis-tech-use-cases';
//
export const thumbnail = 'iVBORw0KGgoAAAANSUhEUgAAAOYAAACQCAYAAAAcERdnAAAACXBIWXMAAAsSAAALEgHS3X78AAADY0lEQVR42u3aTSu9aRzA8f9WeVhIoRRFxMrGK7AiGytvgLfAC1BiaWFjZWVBykNKkhXJVkqEEPIUiVIeftN91a0zzUymc6Zmpj6fkus+93XOQn37XefOrwD+c375E4AwAWHC/zjMr6+v+Pz8TD/ZuvA6v5/Jrj8+PtJ1/ju/X7in8HWgiDB/iuenyApf/6s1UMTEzKbf2dlZnJycxN3dXVxfX8fx8XFcXFx8T8nM6elpbG1txe3tbWxubsbr6+v3dM33ZO99eXkRJ5QSZn5cnZycjMbGxri/v4+dnZ2ora2NxcXF323Oruvq6mJvby8qKytjf3//Dx/Y3d0da2trkQcPFBHm+/t7WszPz0dNTU2K6eDgIMrLy9Pvq6urGB8fj+Xl5dje3o6Ojo40SZuamtJUzSbo6OhoLC0tpc/p6elJ+4QJJYSZxzM3NxcVFRUxPT2dQisrK4vDw8Po7++PgYGBaGlpiampqejs7Iyjo6N0nR1ns+vZ2dlobW2N8/PzmJiY+J6k+TQGipyYCwsLUV9fn9bZcbaqqip9p+zq6oqRkZE0JVdWVqK9vT2t29ra0pRsbm5O302zCbq7uxurq6tpkgoT/oHvmGNjY1FdXZ1iXF9fTxMzO77OzMxEX19fOp5mUzWblBsbG9HQ0JCOscPDwzE0NBSDg4PpYU9vb28K2FEWSggzn2zZ09ibm5t4fn6Ox8fHtH54eEibLi8v01TM7mXT9OnpKT2ZfXt7S/ezJ7p54NmefAp7KgtFhvlTPD8dRwvfX7hXlFDixCz8b5+/u/6z1wo/S5xQYpiAMAFhgjABYYIwAWGCMAFhAsIEYQLCBGECwgRhAsIEhAnCBIQJwgSECcIEhAkIE4QJCBOECQgThAkIExAmCBMQJggTECYIExAmIEwQJiBMECYgTBAmIExAmCBMQJggTECYIExAmIAwQZiAMEGYgDBBmIAwAWGCMAFhgjABYYIwAWECwgRhAsIEYQLCBGECwgSECcIEhAnCBIQJwgSECcIEhAkIE4QJCBOECQgThAkIExAmCBMQJggTECYIExAmIEwQJiBMECYgTBAmIExAmCBMQJggTECYIExAmIAwQZiAMEGYgDBBmIAwAWGCMAFhgjABYYIwAWECwgRhAsIEYQLCBGEC/6bfAHP7D6FYwIa4AAAAAElFTkSuQmCC';

export const getThumbnailController = (expressApp, gateways) => {
  //const getThumbnail = new GetThumbnail(gateways);
  expressApp.get('/api/visualization/thumbnail/:id.png', async (req, res) => {
    try {
      //const requestModel = { id: req.params.id };
      //const responseModel = await getThumbnail.execute(requestModel);

      var img = new Buffer(thumbnail, 'base64');

      res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': img.length
      });

      res.end(img); 
    } catch (error) {
      res.json({ error })
    }
  });
}
