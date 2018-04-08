const { Router } = require('express');

const bangumiController = require('./controllers/bangumi');

const router = Router();

// router.get('/', (req, res, next) => {
//     try{
//         throw new Error('test');
//     }
//     catch(err){
//         next(err);
//     }
//     return;
// })

router.get('/bangumis/list', bangumiController.list);
router.get('/bangumi/:id', bangumiController.detail);

module.exports = router;