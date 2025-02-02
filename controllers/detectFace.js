const handleGetFace = (req, res) => {
    const { input } = req.body;

    // Replace with your Clarifai API key
    const API_KEY = process.env.CLARIFAI_API_KEY;

    const raw = JSON.stringify({
        user_app_id: {
            user_id: "christiankett", // Replace with your Clarifai user ID
            app_id: "ck-face-detection-app" // Replace with your Clarifai app ID
        },
        inputs: [
            {
                data: {
                    image: {
                        url: input
                    }
                }
            }
        ]
    });

    fetch('https://api.clarifai.com/v2/models/face-detection/outputs', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Key ${API_KEY}`
        },
        body: raw
    })
        .then(response => response.json())
        .then(data => res.json(data)) // Send Clarifai's response back to the front end
        .catch(err => {
            console.error('Error communicating with Clarifai:', err);
            res.status(400).json('Unable to work with API');
        });
};

export default handleGetFace;