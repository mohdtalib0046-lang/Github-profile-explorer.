
function RepoList({ repos }) {
  if (!repos || repos.length === 0) {
    return <p className="no-repos">No repositories found.</p>;
  }

  return (
    <div className="repo-grid">
      {repos.map((repo) => (
        <div className="repo-card" key={repo.id}>
          <h3>
            <a href={repo.html_url} target="_blank" rel="noreferrer">
              {repo.name}
            </a>
          </h3>

          <p>{repo.description || "No description available."}</p>

          <div className="repo-info">
            <span>⭐ {repo.stargazers_count}</span>
            <span>🍴 {repo.forks_count}</span>
            <span>💻 {repo.language || "Unknown"}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RepoList;
