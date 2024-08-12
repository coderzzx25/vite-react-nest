export interface IAccountLoginBody {
  userAccount: string;
  userPassword: string;
}

export interface IAccountLoginResponseData {
  userInfo: {
    userAccount: string;
    userName: string;
    userAvatar: string;
    roleId: string;
  };
  accessToken: string;
  refreshToken: string;
}

interface Plan {
  name: string;
  space: number;
  collaborators: number;
  private_repos: number;
}

export interface IGithubUserInfo {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: any;
  blog: string;
  location: any;
  email: any;
  hireable: any;
  bio: string;
  twitter_username: any;
  notification_email: any;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  private_gists: number;
  total_private_repos: number;
  owned_private_repos: number;
  disk_usage: number;
  collaborators: number;
  two_factor_authentication: boolean;
  plan: Plan;
}
