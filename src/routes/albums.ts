import * as express from 'express';
import * as AlbumsController from '../controllers/AlbumsController';

const router = express.Router();

router.get('/', (req, res) => {
  new AlbumsController(req).index().then((tags) => (res.send(tags))).catch((e) => {
    res.status(404).send('Fehler');
  });
});

router.get('/:id', (req, res) => {
  new AlbumsController(req).get().then((tag) => (res.send(tag))).catch((e) => {
    res.status(404).send('Fehler');
  });
});

router.put('/:id', (req, res) => {
  new AlbumsController(req).update().then((tag) => (res.send(tag))).catch((e) => {
    res.status(404).send('Fehler');
  });
});

router.delete('/:id', (req, res) => {
  new AlbumsController(req).destroy().then((tag) => (res.send(tag))).catch((e) => {
    res.status(404).send('Fehler');
  });
});

router.post('/', (req, res) => {
  new AlbumsController(req).create().then((tag) => {
    res.send(tag);
  }).catch((err) => {
    res.send(err);
  });
});

export default router;
