
import { useState } from "react";
import SearchBar from "./components/searchBar.jsx";
import ProfileCard from "./components/profileCard.jsx";
import RepoList from "./components/repoList.jsx";
import "./app.css";

function App() {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchUser = async (username) => {
    if (!username.trim()) {
      setError("Please enter a GitHub username.");
      return;
    }

    setLoading(true);
    setError("");
    setUser(null);
    setRepos([]);

    try {
      const response = await fetch(
        `https://api.github.com/users/${encodeURIComponent(username)}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("GitHub user not found!");
        }

        if (response.status === 403) {
          throw new Error("GitHub API rate limit exceeded. Try again later.");
        }

        throw new Error("Something went wrong. Please try again.");
      }

      const userData = await response.json();

      const repoResponse = await fetch(
        `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=100`
      );

      if (!repoResponse.ok) {
        throw new Error("Unable to load repositories.");
      }

      const repoData = await repoResponse.json();

      setUser(userData);
      setRepos(repoData);
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <nav className="navbar">
        <h2>GitHub Explorer</h2>
        <span>Discover Developers</span>
      </nav>

      <main className="container">
        <section className="hero">
          <h1>Explore GitHub Profiles</h1>
          <p>Find developers and discover their amazing projects.</p>

          <SearchBar onSearch={searchUser} loading={loading} />
        </section>

        {error && <p className="error">{error}</p>}

        {loading && <p className="loading">Searching GitHub...</p>}

        {user && (
          <>
            <section className="profile-section">
              <h2>Developer Profile</h2>
              <ProfileCard user={user} />
            </section>

            <section className="repositories-section">
              <h2>Public Repositories ({repos.length})</h2>
              <RepoList repos={repos} />
            </section>
          </>
        )}

        {!user && !loading && !error && (
          <div className="welcome">
            <h2>Start Exploring!</h2>
            <p>Enter any GitHub username above to get started.</p>
          </div>
        )}
      </main>

      <footer>
        <p>Made with ❤️ using React and GitHub API</p>
      </footer>
    </div>
  );
}

export default App;
