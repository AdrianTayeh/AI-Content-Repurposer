// Types for API generation data
export interface Generation {
  id: string;
  originalContent: string;
  createdAt: string; // ISO string from API
  outputs: {
    summary: string[];
    tweetThread: string[];
    linkedinPost: string;
    newsletter: {
      title?: string;
      intro?: string;
      body?: string;
      cta?: string;
    };
    hashtags: string[];
  };
}
