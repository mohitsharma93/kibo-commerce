export function elementIsVisibleInViewport(element: Element, disconnectAfter: number | null = null): Promise<boolean> {
    if (!element) return Promise.resolve(false);
    return new Promise((resolve) => {
        const isVisible = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
        isVisible.observe(element);
        if (disconnectAfter) {
            setTimeout(() => {
                isVisible.disconnect();
            }, disconnectAfter);
        }
    });
}