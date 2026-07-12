document.getElementById('submit-btn').addEventListener('click', async () => {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a CSV file first!');
        return;
    }

    console.log("Attempting to upload file: " + file.name);

    const formData = new FormData();
    formData.append('file', file);

    try {
        // Pointing to port 8001 to align with your active Uvicorn server configuration
        const response = await fetch('http://127.0.0.1:8001/api/upload', {
            method: 'POST',
            body: formData
        });

        console.log("Response status received: " + response.status);

        if (!response.ok) {
            throw new Error(`Server responded with status ${response.status}`);
        }

        const data = await response.json();
        console.log("Data successfully parsed from backend:", data);

        // Turn raw arrays into Vis.js DataSet format cleanly
        const visData = {
            nodes: new vis.DataSet(data.nodes),
            edges: new vis.DataSet(data.edges)
        };

        // FIXED: Target the inner 'network-canvas' element instead of the entire panel container 
        // to prevent your panel header titles from getting overwritten!
        const container = document.getElementById('network-canvas');
        
        const options = {
            height: '100%', // Enforces full dynamic height inside the container frame
            width: '100%',  // Enforces full dynamic width inside the container frame
            nodes: {
                shape: 'dot',
                size: 20,
                font: { color: '#ffffff', size: 14 },
                borderWidth: 2
            },
            edges: {
                color: '#475569',
                width: 2,
                arrows: { to: { enabled: true, scaleFactor: 0.5 } }
            },
            physics: {
                enabled: true,
                barnesHut: { gravitationalConstant: -2000, centralGravity: 0.3, springLength: 95 }
            }
        };

        // Render to the web panel canvas
        new vis.Network(container, visData, options);
        console.log("Graph network visualization rendered successfully!");

        // ==========================================
        // LIVE EXECUTIVE NARRATIVE BRIEFING INJECTION
        // ==========================================
        
        // FIXED: Changed innerText to innerHTML so it renders your bold tags and line breaks!
        document.getElementById('summary-text').innerHTML = data.summary;
        document.getElementById('executive-summary').style.display = "block";

    } catch (error) {
        console.error("CRITICAL FRONTEND ERROR:", error);
        alert("Could not process graph. Make sure backend data format matches!");
    }
});