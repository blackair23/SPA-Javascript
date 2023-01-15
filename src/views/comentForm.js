import { postComment } from '../api/comments.js';
import { html, nothing } from '../lib.js';
import { getUserData } from '../util.js';


const commentsFormTemplate = (onSubmit) => html`
<article class="create-comment">
    <label>Add new comment:</label>
    <form @submit=${onSubmit} class="form">
        <textarea name="comment" placeholder="Comment......"></textarea>
        <input class="btn submit" type="submit" value="Add Comment">
    </form>
</article>
`

export async function commentFormView(ctx) {
    const userData = getUserData();

    if(userData){
        // ctx.render(commentsFormTemplate(onSubmit));
        return commentsFormTemplate(onSubmit);
    } else {
        console.log('nouser?')
    }

    async function onSubmit(event) {
        event.preventDefault();
        const gameId = ctx.params.id
        const formData = new FormData(event.target);
        let comment = formData.get('comment');
        console.log('what it get -> ',gameId, '<------>', comment)
    
        await postComment({gameId , comment});
        event.target.reset();
        ctx.page.redirect(`/details/${gameId}`);
        // console.log(data);
    }
    
    
}

