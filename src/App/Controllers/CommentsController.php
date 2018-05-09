<?php 

namespace App\Controllers;

class CommentController
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
            $statement = $this->db->prepare("SELECT * FROM comments ORDER BY commentID DESC LIMIT 20");
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
            $statement = $this->db->prepare("SELECT * FROM comments LIMIT :num");
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

    public function GetCommentsByID($id)
    {   
        try 
        {
            $statement = $this->db->prepare("SELECT * FROM comments ORDER BY commentID DESC WHERE createdBy:id");
            $statement->bindParam(':id', $id, PDO::PARAM_INT);
            $statement->execute();

            return $statement->fetchAll();
        }
        catch (PDOException $e)
        {
            echo $e->getMessage();
        }
    }

    public function GetNumCommentsByID($id, $limit)
    {
        try 
        {
            $statement = $this->db->prepare("SELECT * FROM comments ORDER BY commentID DESC WHERE createdBy:id LIMIT :num");
            $statement->bindParam(':id', $id, PDO::PARAM_INT);
            $statement->bindParam(':num', $limit, PDO::PARAM_INT);
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
}

?>