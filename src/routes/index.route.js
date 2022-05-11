import {Router} from "express";

const router = Router();

router.get('/', (_req, res) =>{
    res.json({msg: 'Initing'});
})

export default router;



