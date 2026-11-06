import pool from '../utils/db.js';
import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
    let params = [];
    let szurok = [];

    const {nap, vanHely} = req.query;

    if(nap){
        params.push(nap);
        szurok.push(`GROUP BY szakkorok.id HAVING szakkorok.nap = ? ORDER BY szakkorok.nap ASC, szakkorok.nev ASC`)
    }

    let sql = `SELECT szakkorok.id, szakkorok.nev, szakkorok.tanar, szakkorok.nap, szakkorok.max_letszam, COUNT(jelentkezesek.diak_id) AS diakokszama, (szakkorok.max_letszam - COUNT(jelentkezesek.diak_id)) AS szabadhely FROM szakkorok LEFT JOIN jelentkezesek ON szakkorok.id = jelentkezesek.szakkor_id LEFT JOIN diakok ON diakok.id = jelentkezesek.diak_id`;

    if (szurok.length > 0) {
        sql += ` WHERE ${szurok.join(' AND ')} GROUP BY szakkorok.id HAVING(szakkorok.max_letszam - COUNT(jelentkezesek.diak_id)) > 0 ORDER BY szakkorok.nap ASC, szakkorok.nev ASC`;
    }
    if(szurok.length < 0){
        sql += ` GROUP BY szakkorok.id HAVING(szakkorok.max_letszam - COUNT(jelentkezesek.diak_id)) > 0 ORDER BY szakkorok.nap ASC, szakkorok.nev ASC`;
    }

    try {   
        const [results] = await pool.query(sql, params);
        res.json({ szakkorok: results });
    } catch (error) {
        console.error(error);
        res.status(500).json({ hiba: 'Hiba történt az adatbázis lekérdezése során' });
    }
});

export default router;