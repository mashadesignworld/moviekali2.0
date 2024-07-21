import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '../lib/prismadb';
import serverAuth from 'pages/lib/serverAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { currentUser } = await serverAuth(req);

        if (req.method === 'GET') {
            const favoriteMovies = await prismadb.movie.findMany({
                where: {
                    id: {
                        in: currentUser?.favoriteIds,
                    }
                }
            });

            return res.status(200).json(favoriteMovies);
        } else if (req.method === 'POST') {
            const { movieId } = req.body;
            console.log("POST request received with payload:", req.body);

            if (!movieId) {
                return res.status(400).json({ error: 'movieId is required' });
            }

            const updatedFavoriteIds = [...currentUser.favoriteIds, movieId];

            await prismadb.user.update({
                where: { id: currentUser.id },
                data: { favoriteIds: updatedFavoriteIds },
            });

            return res.status(200).json({ favoriteIds: updatedFavoriteIds });
        } else if (req.method === 'DELETE') {
            const { movieId } = req.body;
            console.log("DELETE request received with payload:", req.body);

            if (!movieId) {
                return res.status(400).json({ error: 'movieId is required' });
            }

            const updatedFavoriteIds = currentUser.favoriteIds.filter((id: string) => id !== movieId);

            await prismadb.user.update({
                where: { id: currentUser.id },
                data: { favoriteIds: updatedFavoriteIds },
            });

            return res.status(200).json({ favoriteIds: updatedFavoriteIds });
        } else {
            return res.status(405).end();
        }
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}
