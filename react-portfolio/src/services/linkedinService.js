
// Note: In a real production app, OAuth token exchange should happen on a backend server 
// to keep the Client Secret secure. This is a client-side demonstration.

export const getLinkedInData = async (accessToken) => {
    if (!accessToken) {
        throw new Error("Access token is required for LinkedIn API");
    }

    try {
        // Fetch Profile Data
        const profileResponse = await fetch('https://api.linkedin.com/v2/me', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'cache-control': 'no-cache',
                'X-Restli-Protocol-Version': '2.0.0'
            }
        });

        if (!profileResponse.ok) {
            throw new Error(`LinkedIn Profile API Error: ${profileResponse.statusText}`);
        }

        const profileData = await profileResponse.json();

        // Fetch Email Data
        const emailResponse = await fetch('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'cache-control': 'no-cache',
                'X-Restli-Protocol-Version': '2.0.0'
            }
        });

        if (!emailResponse.ok) {
            throw new Error(`LinkedIn Email API Error: ${emailResponse.statusText}`);
        }

        const emailData = await emailResponse.json();

        // Extract relevant fields
        const email = emailData.elements?.[0]?.['handle~']?.emailAddress;

        // LinkedIn v2/me API structure for profile picture is complex (MultiImage)
        // We'll try to extract the largest display image if available
        let profilePicture = null;
        if (profileData.profilePicture && profileData.profilePicture['displayImage~']) {
            const elements = profileData.profilePicture['displayImage~'].elements;
            if (elements && elements.length > 0) {
                // Get the last one (usually the largest)
                profilePicture = elements[elements.length - 1].identifiers[0].identifier;
            }
        }

        return {
            firstName: profileData.localizedFirstName,
            lastName: profileData.localizedLastName,
            profilePicture: profilePicture,
            email: email,
        };

    } catch (error) {
        console.error("Failed to fetch LinkedIn data:", error);
        throw error;
    }
};

// Helper to construct the authorization URL
export const getLinkedInAuthUrl = (clientId, redirectUri, state = 'random_state_string') => {
    const scope = encodeURIComponent('r_liteprofile r_emailaddress');
    return `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}&scope=${scope}`;
};
