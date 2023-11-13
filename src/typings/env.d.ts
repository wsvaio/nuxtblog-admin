interface AnyObject {
	[k: string]: any
}

interface ViewTransition {
  ready: Promise<void>;
}

interface Document {
  startViewTransition?: (callback: () => Promise<void> | void) => ViewTransition;
}

interface ImportMetaEnv {
	readonly VITE_PROJECT_NAME: string;
	readonly VITE_DOCUMENT_TITLE: string;
	readonly VITE_BASE: string;
	readonly VITE_BASE_API: string;
}
