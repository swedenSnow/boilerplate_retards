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
            $statement->execute([":id" => $entry_id]);

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
            $statement->bindParam(":entryID", $entry_id); 
            $statement->bindParam(":userID", $user_id); 
            $statement->execute();

            if ($statement->rowCount() > 0)
            {
                return true;
            }

            return false;
        }
        catch (PDOException $e)
        {
            echo $e->getMessage();
        }
    }

    public function Like($user_id, $entry_id)
    {        
        try 
        {
            $statement = $this->db->prepare("INSERT INTO likes(entryID, userID) VALUES(:entryID, :userID)");
            $statement->bindparam(":entryID", $entry_id);   
            $statement->bindparam(":userID", $user_id);   
            $statement->execute();

            return $statement->rowCount();
            
        }
        catch (PDOException $e)
        {
            echo $e->getMessage();
        }
    }

    public function UnLike($user_id, $entry_id)
    {        
        try 
        {
            $statement = $this->db->prepare("DELETE FROM likes WHERE entryID=:entryID AND userID=:userID");
            $statement->bindparam(":entryID", $entry_id);   
            $statement->bindparam(":userID", $user_id);   
            $statement->execute();

            return $statement->rowCount();
        }
        catch (PDOException $e)
        {
            echo $e->getMessage();
        }
    }
}

?>