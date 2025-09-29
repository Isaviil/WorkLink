'use client';
import './foot.scss';

export default function FooterPage(){

    return (
        <footer className='footer-container'>
            <p>© 2025 Isaac V </p>        
            <p>Next.js · Supabase · Prisma</p>

            <div className="footer-container-icons">
                <div className="footer-container-icons-github">
                    <a href='https://github.com/isaviil' target="_blank">
                        <i className="bi bi-github"></i>
                    </a>
                </div>

                <div className="footer-container-icons-gmail">
                    <a href="mailto:isavil.94s@gmail.com">
                         <i className="bi bi-envelope"></i>
                    </a>
                </div>
                
            </div>

            <p>Proyecto hecho a base de té.</p>
            <p>Si llegaste hasta aquí, gracias por tomarte tu tiempo!</p>
        </footer>
    )
}