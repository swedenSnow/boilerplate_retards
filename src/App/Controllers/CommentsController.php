<?php 

namespace App\Controllers;
use PDO;

class CommentsController
{
    private $db;

    public function __construct($pdo)
    {
        $this->db = $pdo;
    }

    public function GetAllComments()
    {        
        try 
        {
            $statement = $this->db->prepare("SELECT c.*, u.username FROM comments AS c LEFT JOIN users AS u ON c.createdBy=u.userID ORDER BY commentID DESC LIMIT 20");
            $statement->execute();

            return $statement->fetchAll();
        }
        catch (PDOException $e)
        {
            echo $e->getMessage();
        }
    }

    public function GetNumComments($limit)
    {        
        try 
        {
            $statement = $this->db->prepare("SELECT c.*, u.username FROM comments AS c LEFT JOIN users AS u ON c.createdBy=u.userID LIMIT :num");
            $statement->bindParam(":num", $limit, PDO::PARAM_INT);
            $statement->execute();
            $result = $statement->fetchAll();

            return $result;
        }
        catch (PDOException $e)
        {
            echo $e->getMessage();
        }
    }

    public function GetCommentID($id)
    {   
        try 
        {
            $statement = $this->db->prepare("SELECT c.*, u.username FROM comments AS c LEFT JOIN users AS u ON c.createdBy=u.userID WHERE commentID=:id");
            $statement->bindParam(":id", $id, PDO::PARAM_INT);
            $statement->execute();

            return $statement->fetchAll();
        }
        catch (PDOException $e)
        {
            echo $e->getMessage();
        }
    }

    public function PostComment($user_id, $body)
    {
        try 
        {
            $entry_id = $body["id"];
            $content = $body["content"];
            $created_at = date("Y-m-d H:i:s");
                
            $statement = $this->db->prepare("INSERT INTO comments (entryID, content, createdBy, createdAt) VALUES (:entryID, :content, :userID, :createdAt)");
            $statement->bindParam(":entryID", $entry_id);
            $statement->bindParam(":content", $content);
            $statement->bindParam(":userID", $user_id); 
            $statement->bindParam(":createdAt", $created_at); 
            $statement->execute();
    
            return ["id" => (int)$this->db->lastInsertId()];
        }
        catch (PDOException $e)
        {
            echo $e->getMessage();
        }
    }

    public function DeleteComment($id)
    {
        try 
        { 
            $statement = $this->db->prepare("DELETE FROM comments WHERE commentID=:id");
            $statement->bindparam(":id", $id);   
            $statement->execute();

            return $statement;
        }
        catch (PDOException $e)
        {
            echo $e->getMessage();
        }
    }

    public function GetCommentsForEntryID($id)
    {
        try 
        {
            $statement = $this->db->prepare("SELECT c.*, u.username FROM comments AS c LEFT JOIN users AS u ON c.createdBy=u.userID WHERE entryID=:id");
            $statement->bindParam(":id", $id, PDO::PARAM_INT);
            $statement->execute();
            $result = $statement->fetchAll();

            return $result;
        }
        catch (PDOException $e)
        {
            echo $e->getMessage();
        }
    }
}

?>