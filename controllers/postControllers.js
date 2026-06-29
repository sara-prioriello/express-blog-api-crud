const posts = require('../data/posts');
const connection = require('../data/db');

//index
function index(req, res) {
    let filteredposts = posts;

    /*if (req.query.tag) {
        const tag = req.query.tag.toLowerCase();

        filteredposts = posts.filter(post =>
            post.tags.some(t => t.toLowerCase() === tag)
        );
    }

    res.json(filteredposts);*/

    /*if (req.query.tag) {
        const tag = req.query.tag.toLowerCase();
        //solo i post che hanno il tag uguale a dolci, ad esempio, devono essere restituiti
        filteredposts = posts.filter(post =>
            post.tags.some(t => t.toLowerCase() === tag)
        );
    }

    res.json(filteredposts);*/
    connection.query('SELECT * FROM posts', (err, results) => {
        if (err) {
            console.error('Errore durante la query:', err);
            res.status(500).json({ error: 'Errore del server' });
        } else {
            res.json(results);
        }
    });

}

function show(req, res) {
    //creazione dell'id
    const id = parseInt(req.params.id);

    /* //ricerca del post con l'id specificato
     const post = posts.find(p => p.id === id);
 
     if (post) {
         res.json(post);
     } else {
         res.status(404).json({ message: 'Post non trovato' });
     }*/

    /* const sql = 'SELECT * FROM posts WHERE id = ?';
     connection.query(sql, [id], (err, results) => {
         if (err) return res.status(500).json({ error: 'Database query failed' });
         if (results.length === 0) return res.status(404).json({ error: 'Post not found' });
         res.json(results[0]);
     });*/
    const sql = 'SELECT * FROM posts INNER JOIN post-tag ON posts.id = post-tag.post_id inner JOIN tags ON post-tag.tag_id = tags.id WHERE posts.id = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (results.length === 0) return res.status(404).json({ error: 'Post not found' });
        res.json(results[0]);
    });
}

function store(req, res) {
    console.log("Store chiamato");
    //res.send('Creazione di un nuovo post');
    //creiamo un nuovo id per il nuovo post
    const newId = posts[posts.length - 1].id + 1;
    //creiamo un nuovo oggetto post con i dati ricevuti
    const newPost = {
        id: newId,
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags
    };
    //afggiorniamo l'array dei post con il nuovo post
    posts.push(newPost);
    console.log(posts);
    //restituiamo lo status e il post creato
    res.status(201).json(newPost);
}

function update(req, res) {
    //res.send(`Aggiornamento del post con id ${req.params.id}`);
    // recuperiamo l'id dall' URL e trasformiamolo in numero
    const id = parseInt(req.params.id)

    // cerchiamo il post tramite id
    const post = posts.find(post => post.id === id);

    // Piccolo controllo
    if (!post) {
        res.status(404);

        return res.json({
            status: 404,
            error: "Not Found",
            message: "Post non trovato"
        })
    }

    // Aggiorniamo il post con i dati ricevuti
    post.title = req.body.title;
    post.content = req.body.content;
    post.image = req.body.image;
    post.tags = req.body.tags;

    // Restituiamo lo status corretto e il post aggiornato
    res.json(post);

}

function modify(req, res) {
    res.send(`Modifica del post con id ${req.params.id}`);
}

function destroy(req, res) {
    /* // recuperiamo l'id dall' URL e trasformiamolo in numero
     const id = parseInt(req.params.id)
 
     // cerchiamo il post tramite id
     const post = posts.find(post => post.id === id);
 
     // Piccolo controllo
     if (!post) {
         res.status(404);
 
         return res.json({
             status: 404,
             error: "Not Found",
             message: "Post non trovato"
         })
     }
 
     // Rimuoviamo la pizza dal menu
     posts.splice(posts.indexOf(post), 1);
 
     // Restituiamo lo status corretto
     res.sendStatus(204) */

    // recuperiamo l'id dall' URL 
    const { id } = req.params;

    //Eliminiamo la pizza dal menu                       
    connection.query('DELETE FROM posts WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to delete post' });
        res.sendStatus(204)
    });
}

module.exports = {
    index,
    show,
    store,
    update,
    modify,
    destroy
};