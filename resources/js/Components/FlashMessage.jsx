import { useState, useEffect } from "react";

function FlashMessage({ message }) {
    const [fadingOut, setFadingOut] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setFadingOut(true);
        }, 3000);
    }, []);

    return (
        <article
            className={`fixed top-48 right-12 border-2 border-green-400 bg-green-200 px-7 py-4 transition duration-200 ease-in-out ${fadingOut ? "opacity-0" : "opacity-100"}`}
        >
            <p>{message}</p>
        </article>
    );
}

export default FlashMessage;