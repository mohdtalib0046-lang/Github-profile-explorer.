function Profilecard({ profile }) {
  return (
    <section className="profile-card">
      <img
        src={profile.avatar_url}
        alt={profile.login}
        className="avatar"
      />

      <div className="profile-info">
        <h2>{profile.name || profile.login}</h2>

        <p className="username">@{profile.login}</p>

        <p>{profile.bio || "No bio available"}</p>

        <p>📍 {profile.location || "Location not available"}</p>

        <div className="stats">
          <div>
            <strong>{profile.public_repos}</strong>
            <span>Repositories</span>
          </div>

          <div>
            <strong>{profile.followers}</strong>
            <span>Followers</span>
          </div>

          <div>
            <strong>{profile.following}</strong>
            <span>Following</span>
          </div>
        </div>

        <a
          href={profile.html_url}
          target="_blank"
          rel="noreferrer"
          className="github-link"
        >
          View GitHub Profile
        </a>
      </div>
    </section>
  );
}

export default Profilecard;