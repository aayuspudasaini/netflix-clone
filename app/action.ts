"use server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addToWatchList(formData: FormData) {
    const movieId = formData.get('movieId');
    const pathname = formData.get('pathname') as string
    const data = await db.watchList.create({
        data: {
            userId: "abc",
            movieId: Number(movieId)
        }
    });
    revalidatePath(pathname)
}

export async function removeFromWatchList(formData: FormData) {
    const watchListId = formData.get('watchListId') as string;
    const pathname = formData.get('pathname') as string
    const data = await db.watchList.delete({
        where: {
            id: watchListId
        }
    });
    revalidatePath(pathname);
}

