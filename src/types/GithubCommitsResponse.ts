export interface Commit {
  url: string; // URI format
  sha: string;
  node_id: string;
  html_url: string; // URI format
  comments_url: string; // URI format

  commit: {
    url: string; // URI format
    author: User | null;
    committer: User | null;
    message: string;
    comment_count: number;
    tree: {
      sha: string;
      url: string; // URI format
    };
    verification: {
      verified: boolean;
      reason: string;
      payload: string | null;
      signature: string | null;
    };
  };

  parents: Array<{
    sha: string;
    url: string; // URI format
    html_url: string; // URI format
  }>;

  stats: {
    additions: number;
    deletions: number;
    total: number;
  };

  files: Array<DiffEntry>;
}

interface User {
  name: string | null;
  email: string | null;
  login: string;
  id: number;
  node_id: string;
  avatar_url: string; // URI format
  gravatar_id: string | null;
  url: string; // URI format
  html_url: string; // URI format
  followers_url: string; // URI format
  following_url: string;
  gists_url: string; // URI format
  starred_url: string; // URI format
  subscriptions_url: string; // URI format
  organizations_url: string; // URI format
  repos_url: string; // URI format
  events_url: string;
  received_events_url: string; // URI format
  type: string;
  site_admin: boolean;
  starred_at: string | null;
}

interface DiffEntry {
  sha: string;
  filename: string;
  status:
    | "added"
    | "removed"
    | "modified"
    | "renamed"
    | "copied"
    | "changed"
    | "unchanged";
  additions: number;
  deletions: number;
  changes: number;
  blob_url: string; // URI format
  raw_url: string; // URI format
  contents_url: string; // URI format
  patch: string;
  previous_filename: string | null;
}
