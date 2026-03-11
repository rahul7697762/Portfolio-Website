
import { useState, useEffect } from 'react';
import { getLeetCodeData } from '../services/leetcodeService';
import { getGitHubData } from '../services/githubService';

export const useProfileData = () => {
    const [leetcode, setLeetcode] = useState(null);
    const [github, setGithub] = useState(null);
    const [loading, setLoading] = useState(true);
    const [leetcodeError, setLeetcodeError] = useState(null);
    const [githubError, setGithubError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setLeetcodeError(null);
        setGithubError(null);

        // Run both fetches in parallel — one failure won't block the other
        const [leetcodeResult, githubResult] = await Promise.allSettled([
            getLeetCodeData('rahul_not_found'),
            getGitHubData('rahul7697762'),
        ]);

        if (leetcodeResult.status === 'fulfilled') {
            setLeetcode(leetcodeResult.value);
        } else {
            console.warn('LeetCode API failed:', leetcodeResult.reason?.message);
            setLeetcodeError(leetcodeResult.reason?.message || 'LeetCode unavailable');
        }

        if (githubResult.status === 'fulfilled') {
            setGithub(githubResult.value);
        } else {
            console.warn('GitHub API failed:', githubResult.reason?.message);
            setGithubError(githubResult.reason?.message || 'GitHub unavailable');
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Backward-compatible: surface a combined error only if BOTH failed
    const error = (leetcodeError && githubError)
        ? 'Both APIs are temporarily unavailable. Please try again later.'
        : null;

    return { leetcode, github, loading, error, leetcodeError, githubError, retry: fetchData };
};
