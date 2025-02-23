import { useEffect, useState } from "react";
import { WebContainer } from '@webcontainer/api';

export function useWebContainer() {
    const [webcontainer, setWebcontainer] = useState<WebContainer>();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function main() {
            try {
                const webcontainerInstance = await WebContainer.boot();
                setWebcontainer(webcontainerInstance);
            } catch (err) {
                console.error("Failed to boot WebContainer:", err);
                setError("Failed to initialize WebContainer");
            }
        }
        
        main();
    }, []);

    return webcontainer;
}