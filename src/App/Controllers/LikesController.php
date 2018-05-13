<?php 

namespace App\Controllers;
use PDO;

class LikesController
{
    private $db;

    public function __construct($pdo)
    {
        $this->db = $pdo;
    }

    public function GetLikesForEntryID($entry_id) 
    {        
        try 
        {   
            //"SELECT COUNT(*) as num_likes FROM likes WHERE entryID=:id"
            $statement = $this->db->prepare("SELECT * FROM likes WHERE entryID=:id");
            $statement->execute([':id' => $entry_id]);

            return $statement->fetchAll();
        }
        catch (PDOException $e)
        {
            echo $e->getMessage();
        }
    }

    public function UserIDLikesEntryID($user_id, $entry_id)
    {        
        try 
        {
            $statement = $this->db->prepare("SELECT * FROM likes WHERE entryID=:entryID AND userID=:userID");
            $statement->bindParam(':entryID', $entry_id); 
            $statement->bindParam(':userID', $user_id); 
            $statement->execute();

            return $statement;
        }
        catch (PDOException $e)
        {
            echo $e->getMessage();
        }
    }
}

?>