(() => {
    const player = document.getElementById("player-iframe");
    const chat = document.getElementById("chat-iframe");

    fetch('./src/api/live.php', {
        method: 'GET',
    }).then(async (response) => {
        if (response.ok) {
            let response_json = await response.json();
            if (response_json.status === 'success') {
                player.src = response_json.live.player_url;
                chat.src = response_json.live.chat_url;
                document.getElementById('live').style.display = 'flex';
                document.getElementById('no-live').style.display = 'none';
            } else {
                document.getElementById('live').style.display = 'none';
                document.getElementById('no-live').style.display = 'flex';
            }
        } else {
            document.getElementById('live').style.display = 'none';
            document.getElementById('no-live').style.display = 'flex';
        }
    });

})();