<? 


$mySecret = "821f62662605a59982c97fa17c77b26d8c7af47dae24198197933e5a06b97316";
$githubHeader = $_SERVER['HTTP_X_HUB_SIGNATURE']; 
$rawPost = file_get_contents("php://input");
$secret = str_replace("sha1=", "", $githubHeader);
$hash = hash_hmac('sha1', $rawPost, $mySecret);
if ($hash != $secret){
    exit ("Permission denied!");
}
else{

 shell_exec( 'git pull origin master ' );
}





?>
