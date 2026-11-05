<?php
ini_set("session.gc_maxlifetime", 5400);
session_set_cookie_params(5400);
define("COMPANY_ID", 3);
define("TBREAD_ID", 1055);
define("EVENT_ID", 417);
define("SESSION_NAME", "corujaaulamagna");
session_name(SESSION_NAME);
session_start();
