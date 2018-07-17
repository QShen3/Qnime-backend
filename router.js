const { Router } = require('express');

const bangumiController = require('./controllers/bangumi');
const staffController = require('./controllers/staff');
const actorController = require('./controllers/actor');
const episodeController = require('./controllers/episode');

const router = Router();

router.get('/bangumi/list', bangumiController.list);
router.get('/bangumi/detail', bangumiController.detail);

router.get('/staff/list', staffController.list);
router.get('/staff/detail', staffController.detail);
router.get('/staff/bangumi', staffController.bangumi);

router.get('/actor/list', actorController.list);
router.get('/actor/detail', actorController.detail);
router.get('/actor/bangumi', actorController.bangumi);

router.get('/episode/:id', episodeController.detail);

module.exports = router;