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
            $statement->bindParam(':num', $limit, PDO::PARAM_INT);
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
            $statement->bindParam(':id', $id, PDO::PARAM_INT);
            $statement->execute();

            return $statement->fetchAll();
        }
        catch (PDOException $e)
        {
            echo $e->getMessage();
        }
    }

    public function PostComment($body)
    {
        try 
        {
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
            $statement->bindParam(':id', $id, PDO::PARAM_INT);
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