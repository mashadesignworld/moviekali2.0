import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from 'pages/lib/prismadb';
import serverAuth from 'pages/lib/serverAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    try {
        await serverAuth(req);

        const { movieId } = req.query;

        if (typeof movieId !== 'string' || !movieId) {
            console.log('Invalid ID:', movieId);
            return res.status(400).json({ error: 'Invalid ID' });
        }

        const movie = await prismadb.movie.findUnique({
            where: {
                id: movieId
            }
        });

        if (!movie) {
            console.log('Movie not found:', movieId);
            return res.status(404).json({ error: 'Movie not found' });
        }

        return res.status(200).json({ title: movie.title, videoUrl: movie.videoUrl, genre: movie.genre, duration: movie.duration, description: movie.description });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

