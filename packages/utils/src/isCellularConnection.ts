export function isCellularConnection(): boolean {
    try {
        return navigator && 
            'connection' in navigator && 
            (navigator as any).connection && 
            (navigator as any).connection.type === 'cellular';
    } catch (e) {
        return false;
    }
}
