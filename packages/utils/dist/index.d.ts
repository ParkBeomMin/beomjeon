declare function isEmpty(value: unknown): boolean;

declare function isCellularConnection(): boolean;

declare function adjustBottomFixed(selector: string): void;

declare function onClickOutside(targetEl: HTMLElement | HTMLElement[] | string | string[], callback: () => void): void;

export { adjustBottomFixed, isCellularConnection, isEmpty, onClickOutside };
