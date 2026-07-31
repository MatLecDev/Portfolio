import { useState, FormEvent} from 'react';
import emailjs from '@emailjs/browser';
import '../styles/contactForm.css';
import useInView from "../hooks/useInView";

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function ContactForm() {
    const [sectionRef, isInView] = useInView<HTMLDivElement>(0.2);
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<Status>('idle');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setStatus('sending');

        try {
            await emailjs.send(
                process.env.REACT_APP_EMAILJS_SERVICE_ID as string,
                process.env.REACT_APP_EMAILJS_TEMPLATE_ID as string,
                {
                    from_email: email,
                    subject: subject,
                    message: message,
                },
                process.env.REACT_APP_EMAILJS_PUBLIC_KEY as string
            );

            setStatus('success');
            setEmail('');
            setSubject('');
            setMessage('');
        } catch (error) {
            console.error('Erreur EmailJS :', error);
            setStatus('error');
        }
    };

    return (
        <section ref={sectionRef} className={`contactSection ${isInView ? 'contactSection--visible' : ''}`} id="contact">
            <form className="contactForm" onSubmit={handleSubmit}>
                <h2>Me contacter</h2>

                <div className="formField">
                    <label htmlFor="email">Votre email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="vous@exemple.com"
                    />
                </div>

                <div className="formField">
                    <label htmlFor="subject">Objet</label>
                    <input
                        id="subject"
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                        placeholder="Sujet de votre message"
                    />
                </div>

                <div className="formField">
                    <label htmlFor="message">Votre message</label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        rows={6}
                        placeholder="Parlez-moi de votre projet..."
                    />
                </div>

                <button type="submit" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Envoi en cours...' : 'Envoyer'}
                </button>

                {status === 'success' && (
                    <p className="formMessage formMessage--success">
                        Message envoyé avec succès !
                    </p>
                )}
                {status === 'error' && (
                    <p className="formMessage formMessage--error">
                        Une erreur est survenue, réessaie plus tard.
                    </p>
                )}
            </form>
        </section>
    );
};