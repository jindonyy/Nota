import Image from 'next/image';
import './page.scss';

export default function Home() {
    return (
        <div className="home-page">
            <Image
                className="home-logo"
                priority
                width="100"
                height="100"
                src="/static/images/nota_profile.webp"
                alt="Nota AI logo"
            />
        </div>
    );
}
