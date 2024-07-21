import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'pages/lib/prismadb';
import serverAuth from 'pages/lib/serverAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end(); // Method Not Allowed
    }
    try {
        await serverAuth(req);

        if (!prisma) {
            console.error("Prisma client is not defined");
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (!prisma.movie) {
            console.error("Movie model is not defined in Prisma client");
            return res.status(500).json({ error: "Internal Server Error" });
        }

        const movieCount = await prisma.movie.count();
        const randomIndex = Math.floor(Math.random() * movieCount);

        const randomMovies = await prisma.movie.findMany({
            take: 1,
            skip: randomIndex
        });

        return res.status(200).json(randomMovies[0]);
    } catch (error) {
        console.error("API Error:", error);
        return res.status(400).json({ error: "Bad Request" });
    }
}
