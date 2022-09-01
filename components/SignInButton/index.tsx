import { useSession, signIn, signOut } from "next-auth/react";
import styles from './styles.module.scss';
import { FaGithub } from 'react-icons/fa';
import { FaGoogle} from 'react-icons/fa';
import { FiX } from 'react-icons/fi';


export function SignInButton(){
  
  const { data: session } = useSession();

  return session ? (
    <button
    type="button"
    className={styles.signInButton}
    onClick={ () => signOut() }
    >
      <img src={session.user.image} alt="Foto do usuario" />
      Olá {session.user.name}
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button
    type="button"
    className={styles.signInButton}
    onClick={ () => signIn('google') }
    >
      <FaGoogle color="#FFB800"/>
      Entrar com Google
    </button>
  )
}