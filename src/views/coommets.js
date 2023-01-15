import { getByGameId } from '../api/comments.js';
import { html } from '../lib.js';


const commentsTemplate = (comments) => html `
    <div class="details-comments">
        <h2>Comments:</h2>
        
        ${comments.length == 0 ? html`<p class="no-comment">No comments.</p>` :  commentslist(comments)}
    </div>
`
const commentslist = (comments) => html`
    <ul>
        ${comments.map(commentCard)}
    </ul>
`;

const commentCard = (comment) => html`
<li class="comment">
    <p>${comment.comment}</p>
</li>`

export async function commentsView(gameId) {
    const comments = await getByGameId(gameId);

    return commentsTemplate(comments)
}