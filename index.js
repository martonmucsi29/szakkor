import 'dotenv/config';
import express from 'express';
import szakkorroute from './routes/szakkorokRoute.js';


const app = express();
app.use(express.json());
const PORT = Number(process.env.PORT ?? 3000);

let vegpontok = [
    { vegpont: `http://localhost:${process.env.PORT ?? 3000}/szakkorok`, leiras: 'Szakkorok' }
]
/*
app.get('/szakkorok', async (req, res) => {
    const {nap, vanHely} = req.query;
    
    if(!nap){
        let sql = 'SELECT szakkorok.id, szakkorok.nev, szakkorok.tanar, szakkorok.nap, szakkorok.max_letszam, COUNT(jelentkezesek.diak_id) AS diakokszama, (szakkorok.max_letszam - COUNT(jelentkezesek.diak_id)) AS szabadhely FROM szakkorok LEFT JOIN jelentkezesek ON szakkorok.id = jelentkezesek.szakkor_id LEFT JOIN diakok ON diakok.id = jelentkezesek.diak_id GROUP BY szakkorok.id HAVING(szakkorok.max_letszam - COUNT(jelentkezesek.diak_id)) > 0 ORDER BY szakkorok.nap ASC, szakkorok.nev ASC;';
        let eredmeny = await pool.query(sql);
        res.json(eredmeny);
    }
    if(!vanHely){
        let sql = `SELECT szakkorok.id, szakkorok.nev, szakkorok.tanar, szakkorok.nap, szakkorok.max_letszam, COUNT(jelentkezesek.diak_id) AS diakokszama, (szakkorok.max_letszam - COUNT(jelentkezesek.diak_id)) AS szabadhely FROM szakkorok LEFT JOIN jelentkezesek ON szakkorok.id = jelentkezesek.szakkor_id LEFT JOIN diakok ON diakok.id = jelentkezesek.diak_id GROUP BY szakkorok.id HAVING szakkorok.nap = "${nap}" ORDER BY szakkorok.nap ASC, szakkorok.nev ASC;`;
        let eredmeny = await pool.query(sql)
        res.json(eredmeny);
    }
    if(!nap || !vanHely){
        let sql = 'SELECT szakkorok.id, szakkorok.nev, szakkorok.tanar, szakkorok.nap, szakkorok.max_letszam, COUNT(jelentkezesek.diak_id) AS diakokszama, (szakkorok.max_letszam - COUNT(jelentkezesek.diak_id)) AS szabadhely FROM szakkorok LEFT JOIN jelentkezesek ON szakkorok.id = jelentkezesek.szakkor_id LEFT JOIN diakok ON diakok.id = jelentkezesek.diak_id GROUP BY szakkorok.nev ORDER BY szakkorok.nap ASC, szakkorok.nev ASC;';
        let eredmeny = await pool.query(sql);
        res.json(eredmeny);
    } 
});

app.get('/szakkorok/:id', async (req, res) => {
    const id = req.params.id;

    const sqlsz = `SELECT * FROM szakkorok WHERE id = ?;
    SELECT diakok.id, diakok.nev, diakok.osztaly, jelentkezesek.datum FROM szakkorok LEFT JOIN jelentkezesek ON jelentkezesek.szakkor_id = szakkorok.id LEFT JOIN diakok ON jelentkezesek.diak_id = diakok.id WHERE szakkorok.id = ?;`;
    let sz_eredmeny = await pool.query(sqlsz, id);
    res.json(sz_eredmeny);
});
*/

app.use('/szakkorok', szakkorroute);

app.use('/', (req, res) => {
    res.status(404).json(vegpontok);
});

app.use((err, res, req) => {
    console.error(err);
    res.status(500).json({ hiba: 'Belső szerverhiba' });
});

app.listen(PORT, () => {
    console.log(`Szerver fut: http://localhost:${PORT}`);
});