/*
verificar a session storage, caso esteja preenchida, 
chamar a api para preencher a sessão do php 
e devolver o usuário para a live
*/
const session = sessionStorage.getItem('user');

if (session) {
    // preencher a sessão no php

    // redirecionar para a live
}


