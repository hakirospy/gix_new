<? 
echo $_POST['payload'];

if($_SERVER["HTTP_X_GITLAB_TOKEN"] == "821f62662605a59982c97fa17c77b26d8c7af47dae24198197933e5a06b97316"){

 shell_exec( 'git pull origin master ' );



} 



?>
