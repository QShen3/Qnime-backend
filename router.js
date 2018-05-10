const { Router } = require('express');

const bangumiController = require('./controllers/bangumi');
const staffController = require('./controllers/staff');
const actorController = require('./controllers/actor');

const router = Router();

router.get('/bangumis/list', bangumiController.list);
router.get('/bangumi/:id', bangumiController.detail);

router.get('/staffs/list', staffController.list);
router.get('/staff/:id', staffController.detail);
router.get('/staffs/bangumi', staffController.bangumi);

router.get('/actors/list', actorController.list);
router.get('/actor/:id', actorController.detail);
router.get('/actors/bangumi', actorController.bangumi);

module.exports = router;