const player = document.getElementById("player-iframe");
const playerMap = document.getElementById("player-map-iframe");
const chat = document.getElementById("chat-iframe");
const liveContainer = document.getElementById('live');
const noLiveContainer = document.getElementById('no-live');

liveContainer.style.display = 'none';
noLiveContainer.style.display = 'flex';

const userData = JSON.parse(sessionStorage.getItem('user'));

window.addEventListener('DOMContentLoaded', (e) => {
    presenceConfirmation(userData);
    loadLiveContent(userData);
});

const loadLiveContent = (userData) => {
    try {
        fetch('./src/api/live.php', {
            method: 'GET',
        }).then(async (response) => {
            if (response.ok) {
                let _json = await response.json();
                if (_json.status === 'success') {
                    if (_json.data.vivo == 1) {
                        //dados do usuário
                        let userDatas = {
                            name: userData.name,
                            email: userData.email,
                            hash: userData.hash
                        };
                        userDatas = JSON.stringify(userDatas);
                        userDatas = btoa(userDatas);

                        //player e chat devem ser exibidos;
                        liveContainer.style.display = 'flex';
                        noLiveContainer.style.display = 'none';
                        //configuração do player
                        playerMap.src = "https://player.verto.ia.br/corujamasterclass?data=".concat(userDatas);
                        player.src = "https://player.tbr.srv.br/?type=webrtc&source=corujamasterclass";
                        //condiguração do chat
                        const todayDate = new Date();
                        const cY = todayDate.getFullYear();
                        let cM = todayDate.getMonth() + 1;
                        let cD = todayDate.getDate();
                        const dateNow = `${cY}-${cM}-${cD}`;
                        const chatCssUrl = '//eventos.tbr.com.br/masterclass/chat.css';
                        const param = btoa(chatCssUrl);
                        const idChat = `${_json.data.pagina}-${dateNow}`;
                        const userName = encodeURIComponent(userData.name);
                        chat.src = `https://chat.tbrplay.com.br/${idChat}?user.name=${userName}&css=${param}`;
                    }
                } else {
                    document.getElementById('live').style.display = 'none';
                    document.getElementById('no-live').style.display = 'flex';
                }
            } else {
                document.getElementById('live').style.display = 'none';
                document.getElementById('no-live').style.display = 'flex';
            }
        });
    } catch (error) {
        console.error(error);
        document.getElementById('live').style.display = 'none';
        document.getElementById('no-live').style.display = 'flex';
    }
}

const presenceConfirmation = async (user) => {
    const todayLogin = new Date();
    const dthLogin = `${todayLogin.getFullYear()}/${todayLogin.getMonth() + 1}/${todayLogin.getDate()} ${todayLogin.getHours()}:${todayLogin.getMinutes()}:${todayLogin.getSeconds()}`;
    const urlAPI = 'https://acessos.tbr.com.br/oldapi.php';

    const dataForm = {
        codigo: user.tbread_id,
        evento: user.event_id,
        url: window.location.href,
        hash: user.hash,
        inscrito: user.name,
        email: user.email,
        login: dthLogin
    };

    try {
        const response = await fetch(urlAPI, {
            method: 'POST',
            body: JSON.stringify(dataForm),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.text();
        console.log('Presença confirmada: ', result);
    } catch (error) {
        console.error('Erro ao confirmar presença: ',error.message);
    }
}

const presenceClose = (user) => {
    if (!navigator.sendBeacon) {
        console.warn('Beacon API não suportada neste navegador. Presença pode não ser registrada corretamente.');
        return;
    }

    const todayLogout = new Date();
    const dthLogout = `${todayLogout.getFullYear()}/${todayLogout.getMonth() + 1}/${todayLogout.getDate()} ${todayLogout.getHours()}:${todayLogout.getMinutes()}:${todayLogout.getSeconds()}`;

    const urlAPI = 'https://acessos.tbr.com.br/oldapi.php'
    const dataForm = {
        hash: user.hash,
        logout: dthLogout
    }

    const blob = new Blob([JSON.stringify(dataForm)], { type: 'application/json' });
    navigator.sendBeacon(urlAPI, blob);
}

window.addEventListener('beforeunload', () => {
    presenceClose(userData);
});