
function ProfileCard({ user }) {
  if (!user) return null;

  return (
    <div className="profile-card">
      <img
        src={user.avatar_url}
        alt={user.login}
        className="avatar"
      />

      <h2>{user.name || user.login}</h2>
      <p className="username">@{user.login}</p>

      <p className="bio">
        {user.bio || "No bio available"}
      </p>

      <div className="profile-stats">
        <div>
          <h3>{user.followers}</h3>
          <p>Followers</p>
        </div>

        <div>
          <h3>{user.following}</h3>
          <p>Following</p>
        </div>

        <div>
          <h3>{user.public_repos}</h3>
          <p>Repositories</p>
        </div>
      </div>

      <a
        href={user.html_url}
        target="_blank"
        rel="noreferrer"
        className="github-link"
      >
        View GitHub Profile
      </a>
    </div>
  );
}

export default ProfileCard;
