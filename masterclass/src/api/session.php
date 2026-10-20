<?php
ini_set("session.gc_maxlifetime", 5400);
session_set_cookie_params(5400);
define("COMPANY_ID", 3);
define("TBREAD_ID", 1054);
define("EVENT_ID", 414);
define("SESSION_NAME", "corujamentoria_revisao2026");
session_name(SESSION_NAME);
session_start();
