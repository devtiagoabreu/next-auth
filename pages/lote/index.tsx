import { getSession, signIn } from "next-auth/react";

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

function Lote() {
    return (
        

    )
}

export default Lote;