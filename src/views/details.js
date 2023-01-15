import { getByGameId } from '../api/comments.js';
import { deleteGame, getGamesDetail } from '../api/games.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';
import { commentFormView } from './comentForm.js';
import { commentsView } from './coommets.js';

const detailsTemplate = (game, isOwner, commentSection, commentFormSection, onDelete) => html `
        <section id="game-details">
            <h1>Game Details</h1>
            <div class="info-section">

                <div class="game-header">
                    <img class="game-img" src=${game.imageUrl} />
                    <h1>${game.title}</h1>
                    <span class="levels">MaxLevel: ${game.maxLevel}</span>
                    <p class="type"> ${game.category}</p>
                </div>

                <p class="text">
                    ${game.summary}
                </p>

                <!-- Bonus ( for Guests and Users ) -->
                ${commentSection}

                <!-- Edit/Delete buttons ( Only for creator of this game )  -->
                ${isOwner ? html`
                <div class="buttons">
                    <a href="/edit/${game._id}" class="button">Edit</a>
                    <a @click=${onDelete} class="button">Delete</a>
                </div>` : ''}
            </div>

            <!-- Bonus -->
            <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
            ${isOwner ? '' : commentFormSection }

        </section>
`;

export async function detailsView(ctx) {
    // let game = await getGamesDetail(ctx.params.id);

    const [game, commentSection] = await Promise.all([
        getGamesDetail(ctx.params.id),
        commentsView(ctx.params.id),
    ]);

    const commentFormSection = await commentFormView(ctx, ctx.params.id);

    const userData = getUserData();
    let isOwner = userData?.id == game._ownerId;

    ctx.render(detailsTemplate(game, isOwner, commentSection, commentFormSection, onDelete));

    async function onDelete(){
        const choice = confirm('Are you sure you want to delete this game?');

        if (choice){
            await deleteGame(ctx.params.id);
            ctx.page.redirect('/'); 
        }
    }
}
