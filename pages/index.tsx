
import Image from "next/image";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";
import useCurrentUser from "hooks/useCurrentUser";


export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }

}


export default function Home() {
  const { data: user } = useCurrentUser();
  return (

    <div className="relative h-full w-full bg-[url('/images/hero3.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <h1 className="text-4xl font-bold underline text-white">MovieKali</h1>
          <p className="text-white">Logged in as : {user?.email}</p>
          <button className="h-10 w-full bg-white"
            onClick={() => signOut()}>Log Out</button>
        </nav>
      </div>
    </div>
  );
}

