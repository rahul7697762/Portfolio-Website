
const LEETCODE_API_ENDPOINT = '/api/leetcode'; // Using proxy to avoid CORS

const LEETCODE_QUERY = `
query getUserProfile($username: String!) {
  matchedUser(username: $username) {
    username
    profile {
      realName
      userAvatar
      ranking
    }
    submitStats {
      totalSubmissionNum {
        difficulty
        count
      }
    }
  }
}
`;

export const getLeetCodeData = async (username = "rahul7697762") => {
    try {
        const response = await fetch(LEETCODE_API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: LEETCODE_QUERY,
                variables: { username },
            }),
        });

        if (!response.ok) {
            throw new Error(`LeetCode API Error: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.errors) {
            throw new Error(data.errors[0].message);
        }

        return data.data.matchedUser;
    } catch (error) {
        console.error("Failed to fetch LeetCode data:", error);
        throw error;
    }
};
