<?php
ini_set("session.gc_maxlifetime", 5400);
session_set_cookie_params(5400);
define("COMPANY_ID", 3);
define("TBREAD_ID", 1051);
define("EVENT_ID", 412);
define("SESSION_NAME", "corujamentoria_masterclass");
session_name(SESSION_NAME);
session_start();
