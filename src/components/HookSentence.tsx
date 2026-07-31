import "../styles/hookSentence.css"
import {useMemo} from "react";
import StarBackground from "./StarBackground";

export default function HookSentence() {
    const sentence = "Aux confins de mon savoir, toujours à la recherche de connaissances nouvelles, je code vos idées les plus brillantes."
    const gradientWords = ['savoir', 'connaissances', 'code', 'brillantes'];
    const words = useMemo(() => sentence.split(' '), [sentence]);
    return (
        <>
            <StarBackground starCount={150} />
            <section className="hook">
                <h1 className="hook-sentence">
                    {words.map((word, index) => {
                        const cleanWord = word.replace(/[.,]/g, '');
                        const isGradient = gradientWords.includes(cleanWord.toLowerCase());

                        return (
                            <span
                                key={index}
                                className={`hook-word ${isGradient ? 'hook-word--gradient' : ''}`}
                                style={{ animationDelay: `${index * 0.08}s` }}
                            >
                                {word}&nbsp;
                            </span>
                        )
                    })}
                </h1>
            </section>
        </>
    )
}