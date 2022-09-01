import Link from 'next/link';
import styles from './styles.module.scss';
import { SignInButton } from '../../components/SignInButton';

export function Header() {
    return(
        <>
            <header className={styles.headerContainer}>
                <div className={styles.headerContent}>
                    <Link href="/">
                        <h1>ProConfer</h1>                        
                    </Link>
                    <nav>
                        <Link href="/">
                            <a>Home</a>
                        </Link>
                        <Link href="/board">
                            <a>Dashboard</a>
                        </Link>
                    </nav>

                   <SignInButton/>
                </div>
            </header>
        </>
    )
}