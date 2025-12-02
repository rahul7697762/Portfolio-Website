
export const getGitHubData = async (username = "rahul7697762") => {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);

        if (!response.ok) {
            throw new Error(`GitHub API Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch GitHub data:", error);
        throw error;
    }
};
