function Repolist({ repos }) {
  return (
    <section className="repo-section">
      <h2>Public Repositories</h2>

      {repos.length === 0 ? (
        <p>No public repositories found.</p>
      ) : (
        <div className="repo-grid">
          {repos.map((repo) => (
            <article className="repo-card" key={repo.id}>
              <h3>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {repo.name}
                </a>
              </h3>

              <p>
                {repo.description || "No description available"}
              </p>

              <div className="repo-details">
                <span>⭐ {repo.stargazers_count}</span>
                <span>🍴 {repo.forks_count}</span>
                <span>{repo.language || "Other"}</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Repolist;