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

    public function GetCommentsByID($id)
    {
    }

    public function PostComment($body)
    {
    }

    public function DeleteComment($id)
    {
    }
}

?>