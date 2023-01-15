import { get, post } from './api.js';

const endpoints = {
    byGameId: (gameId) => `/data/comments?where=gameId%3D%22${gameId}%22`,
    post: '/data/comments'
}

export async function getByGameId(gameId) {
    return get(`/data/comments?where=gameId%3D%22${gameId}%22`);
}

export async function postComment(comment) {
    return post('/data/comments', comment)
}