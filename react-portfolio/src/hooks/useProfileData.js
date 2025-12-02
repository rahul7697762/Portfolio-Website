
import { useState, useEffect } from 'react';
import { getLeetCodeData } from '../services/leetcodeService';
import { getGitHubData } from '../services/githubService';

export const useProfileData = () => {
    const [leetcode, setLeetcode] = useState(null);
    const [github, setGithub] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                // Fetch LeetCode Data
                const leetCodeData = await getLeetCodeData("rahul_not_found");
                setLeetcode(leetCodeData);

                // Fetch GitHub Data
                const githubData = await getGitHubData("rahul7697762");
                setGithub(githubData);

            } catch (err) {
                setError(err.message || 'An error occurred while fetching profile data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { leetcode, github, loading, error };
};
