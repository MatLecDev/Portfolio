import { useEffect, useRef, useState, RefObject } from 'react';

function useInView<T extends HTMLElement>(
    threshold = 0.2
): [RefObject<T | null>, boolean] {
    const ref = useRef<T>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting); // <-- réagit dans les deux sens, plus de unobserve
            },
            { threshold }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [threshold]);

    return [ref, isInView];
}

export default useInView;