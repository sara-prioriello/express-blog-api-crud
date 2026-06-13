const posts = require('../data/posts');


//index
function index(req, res) {
    let filteredposts = posts;

    if (req.query.tag) {
        const tag = req.query.tag.toLowerCase();

        filteredposts = posts.filter(post =>
            post.tags.some(t => t.toLowerCase() === tag)
        );
    }

    res.json(filteredposts);
}

function show(req, res) {
    //creazione dell'id
    const id = parseInt(req.params.id);

    //ricerca del post con l'id specificato
    const post = posts.find(p => p.id === id);

    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ message: 'Post non trovato' });
    }
}

function store(req, res) {
    res.send('Creazione di un nuovo post');
}

function update(req, res) {
    res.send(`Aggiornamento del post con id ${req.params.id}`);
}

function modify(req, res) {
    res.send(`Modifica del post con id ${req.params.id}`);
}

function destroy(req, res) {
    // res.send(`Eliminazione del post con id ${req.params.id}`);
    //recuperiamo id
    const id = parseInt(req.params.id);

    //cerchiamo il post con l'id specificato
    const postIndex = posts.findIndex(p => p.id === id);

    if (postIndex !== -1) {
        //rimuoviamo il post dall'array
        posts.splice(postIndex, 1);
        res.json({ message: 'Post eliminato con successo' });
    } else {
        res.status(404).json({ message: 'Post non trovato' });
    }
    console.log(posts);
    //restituiamo lo stato corretto
    res.sendStatus(204);
}

module.exports = {
    index,
    show,
    store,
    update,
    modify,
    destroy
};