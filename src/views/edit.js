import { getGamesDetail, updateGame } from '../api/games.js';
import { html } from '../lib.js';

const editTemplate = (game, onSubmit) => html `
        <section id="edit-page" class="auth">
            <form @submit=${onSubmit} id="edit">
                <div class="container">

                    <h1>Edit Game</h1>
                    <label for="leg-title">Legendary title:</label>
                    <input type="text" id="title" name="title" .value=${game.title}>

                    <label for="category">Category:</label>
                    <input type="text" id="category" name="category" .value=${game.category}>

                    <label for="levels">MaxLevel:</label>
                    <input type="number" id="maxLevel" name="maxLevel" min="1" .value=${game.maxLevel}>

                    <label for="game-img">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" .value=${game.imageUrl}>

                    <label for="summary">Summary:</label>
                    <textarea name="summary" id="summary" .value=${game.summary}></textarea>
                    <input class="btn submit" type="submit" value="Edit Game">

                </div>
            </form>
        </section>
`;

export async function editView(ctx) {

    let game = await getGamesDetail(ctx.params.id);
    ctx.render(editTemplate(game, onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const editedGame = {
            title: formData.get('title'),
            category: formData.get('category'),
            maxLevel: formData.get('maxLevel'),
            imageUrl: formData.get('imageUrl'),
            summary: formData.get('summary'),
        }

        if(editedGame.title == '' || editedGame.category == '' || editedGame.maxLevel == '' || editedGame.imageUrl == '' || editedGame.summary == '') {
            return alert('All fields are reuired!');
        }

        await updateGame(ctx.params.id, editedGame);
        event.target.reset();
        ctx.page.redirect(`/details/${ctx.params.id}`);

    }

}