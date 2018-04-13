const { Router } = require('express');

const bangumiController = require('./controllers/bangumi');
const staffController = require('./controllers/staff');

const router = Router();

router.get('/bangumis/list', bangumiController.list);
router.get('/bangumi/:id', bangumiController.detail);

router.get('/staffs/list', staffController.list);
router.get('/staff/:id', staffController.detail);

module.exports = router;