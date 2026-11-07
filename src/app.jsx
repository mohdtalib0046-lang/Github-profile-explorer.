import { useState } from "react";
import Searchbar from "./components/Searchbar";
import Profilecard from "./components/Profilecard";
import Repolist from "./components/Repolist";
import "./app.css";

function App() {
  const [username, setUsername] = useState("mohdtalib0046-lang");
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchUser = async (name) => {
    if (!name.trim()) return;

    setLoading(true);
    setError("");
    setProfile(null);
    setRepos([]);

    try {
      const response = await fetch(
        `https://api.github.com/users/${name}`
      );

      if (!response.ok) {
        throw new Error("GitHub user not found!");
      }

      const userData = await response.json();

      const repoResponse = await fetch(
        `https://api.github.com/users/${name}/repos?sort=updated&per_page=100`
      );

      if (!repoResponse.ok) {
        throw new Error("Unable to load repositories");
      }

      const repoData = await repoResponse.json();

      setProfile(userData);
      setRepos(repoData);
      setUsername(name);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>GitHub Profile Explorer</h1>
        <p>Explore GitHub profiles and repositories</p>
      </header>

      <main className="container">
        <Searchbar onSearch={searchUser} />

        {loading && <p className="message">Loading profile...</p>}

        {error && <p className="error">{error}</p>}

        {profile && (
          <>
            <Profilecard profile={profile} />
            <Repolist repos={repos} />
          </>
        )}

        {!profile && !loading && !error && (
          <div className="welcome">
            <h2>Discover GitHub Developers</h2>
            <p>Search any GitHub username to explore their profile.</p>
          </div>
        )}
      </main>

      <footer>
        <p>Built with React & GitHub API</p>
      </footer>
    </div>
  );
}

export default App;