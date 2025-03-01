import { auth } from "@/auth";
import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { desc } from "drizzle-orm";


const Home = async () => {
  // test session
  // const result = await db.select().from(users);
  // console.log(JSON.stringify(result, null, 2));
  const session = await auth();

  const latestBooks = (await db.select().from(books).limit(13).orderBy(desc(books.createdAt))) as Book[];
  return (
    <>
      {/* <BookOverview {...sampleBooks[0]} /> */}
      <BookOverview {...latestBooks[0]} userId={session?.user?.id as string } />
      <BookList 
        title="Sách Mới Nhất"
        books = {latestBooks.slice(1)}
        containerClassName="mt-28"
      />
    </>
  );
};

export default Home;