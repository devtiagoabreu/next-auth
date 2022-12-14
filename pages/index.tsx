import type { NextPage } from "next";
import { useSession, signOut, getSession } from "next-auth/react";
import styles from '../styles/Home.module.css';

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false
      }
    }
  }
  return {
    props: {
      session,
    },
  };
} 

const Home: NextPage = () => {
  const { data: session } = useSession();
  
  return (
    <div className={styles.container}>
      <h1>{`Seja bem-vindo ${session?.user?.name}`}</h1>
      <button onClick={() => signOut()}>Sair</button>
    </div>
  );
};

export default Home;
