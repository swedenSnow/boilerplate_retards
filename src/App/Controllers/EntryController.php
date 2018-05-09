<?php 

namespace App\Controllers;

class EntryController
{
    private $db;

    public function __construct($pdo)
    {
        $this->db = $pdo;
    }

    public function GetAllEntries()
    {        
        try 
        {
            $statement = $this->db->prepare("SELECT e.*, u.username FROM entries AS e LEFT JOIN users AS u ON e.createdBy=u.userID ORDER BY entryID LIMIT 20");
            $statement->execute();

            return $statement->fetchAll();
        }
        catch (PDOException $e)
        {
            echo $e->getMessage();
        }
    }

    public function GetEntryByID($id)
    {   
        try 
        {
            $statement = $this->db->prepare("SELECT e.*, u.username FROM entries AS e LEFT JOIN users AS u ON e.createdBy=u.userID WHERE entryID=:id");
            $statement->execute([
              ":id" => $id
            ]);
        $result = $statement->fetch();

            return $result;
        }
        catch (PDOException $e)
        {
            echo $e->getMessage();
        }
    }

    public function AddEntry($body)
    { 
        $user_id = $body['user_id'];
        $title = $body['title'];
        $content = $body['content'];
        $created_at = date("Y-m-d H:i:s");
            
        $statement = $this->database->prepare("INSERT INTO entries (title, content, createdBy, createdAt) VALUES (:title, :content, :userID, :createdAt)");
        $statement->bindParam(':title', $title);
        $statement->bindParam(':content', $content);
        $statement->bindParam(':userID', $user_id); 
        $statement->bindParam(':createdAt', $created_at); 
        $statement->execute();
    }

    public function DeleteEntry($id)
    {
        try 
        {
            $statement = $this->database->prepare("DELETE FROM entries WHERE entryID=:id");
            $statement->bindparam(":id", $id);   
            $statement->execute();

            return $statement;
        }
        catch (PDOException $e)
        {
            echo $e->getMessage();
        }
    }

    public function UpdateEntry($id, $body)
    {
        try 
        {
            $title = $body['title'];
            $content = $body['content'];

            $statement = $this->database->prepare("UPDATE entries 
            SET title=:title, content=:content 
            WHERE entryID=:id"
            );
            $statement->bindparam(":id", $id);   
            $statement->bindparam(":title", $title);   
            $statement->bindparam(":content", $content);   
            $statement->execute();

            return $statement;
        }
        catch (PDOException $e)
        {
            echo $e->getMessage();
        }
    }

    public function Search($search_text)
    {
        try 
        {
            $search_value = "%" .$search_text. "%";
            $statement = $this->database->prepare("SELECT * FROM entries WHERE (title LIKE :search_value OR content LIKE :search_value)");
            $statement->bindparam(":search_value", $search_value);   
            $statement->execute();
            $result = $statement->fetchAll();

            return 'Not implemented';
        }
        catch (PDOException $e)
        {
            echo $e->getMessage();
        }
    }

    public function GetEntriesByUsername($username)
    {
        try 
        {
            $statement = $this->db->prepare("SELECT e.*, u.userID FROM entries AS e INNER JOIN users AS u ON e.createdBy = u.userID WHERE username=:username");
            
            $statement->bindparam(":username", $username);  
            $statement->execute(); 
            $result = $statement->fetchAll();

            return $result;
        }
        catch (PDOException $e)
        {
            echo $e->getMessage();
        }
    }

    public function GetEntriesByUserID($id)
    {
        try 
        {
            $statement = $this->db->prepare("SELECT e.*, u.userID FROM entries AS e INNER JOIN users AS u ON e.createdBy = u.userID WHERE createdBy=:id");
            $statement->bindparam(":id", $id);   
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