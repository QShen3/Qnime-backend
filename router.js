const { Router } = require('express');

const bangumi = require('./controllers/bangumi');

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

router.get('/bangumis/list', bangumi.list);
router.get('/bangumi/:id', bangumi.detail);

module.exports = router;